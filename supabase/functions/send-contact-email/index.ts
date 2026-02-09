import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Allowed origins for CORS
const allowedOrigins = [
  'https://advogandoparaenfermagem.blog.br',
  'https://www.advogandoparaenfermagem.blog.br',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:8080',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && allowedOrigins.includes(origin);
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

// Input validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
  phone: z.string().trim().min(10, "Telefone inválido").max(20, "Telefone muito longo"),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(5000, "Mensagem muito longa"),
  newsletter: z.boolean(),
});

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Reject requests from unauthorized origins
  if (!corsHeaders["Access-Control-Allow-Origin"]) {
    return new Response(
      JSON.stringify({ error: "Origem não autorizada" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const rawBody = await req.json();
    
    // Validate input
    const validationResult = contactSchema.safeParse(rawBody);
    if (!validationResult.success) {
      console.log("Validation failed for contact form submission");
      return new Response(
        JSON.stringify({ 
          error: "Dados inválidos", 
          details: validationResult.error.flatten().fieldErrors 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, phone, message, newsletter } = validationResult.data;
    
    // Escape HTML entities for safe email rendering
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeMessage = escapeHtml(message);

    console.log("Processing contact form submission");

    // Send notification email to the lawyer
    const notificationEmail = await resend.emails.send({
      from: "Advogando para Enfermagem <contato@advogandoparaenfermagem.blog.br>",
      to: ["mateus@advogandoparaenfermagem.blog.br", "matheusmagoi26@gmail.com"],
      subject: `Nova solicitação de ${safeName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #062A44; border-bottom: 2px solid #17A88C; padding-bottom: 10px;">Nova Solicitação de Orientação Jurídica</h1>
          
          <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #0E415F; margin-top: 0;">Dados do Contato</h2>
            <p><strong>Nome:</strong> ${safeName}</p>
            <p><strong>E-mail:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
            <p><strong>Telefone/WhatsApp:</strong> <a href="https://wa.me/55${phone.replace(/\D/g, '')}">${safePhone}</a></p>
            <p><strong>Newsletter:</strong> ${newsletter ? "Sim, deseja receber" : "Não deseja receber"}</p>
          </div>
          
          <div style="background-color: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h2 style="color: #0E415F; margin-top: 0;">Mensagem</h2>
            <p style="white-space: pre-wrap; color: #475158;">${safeMessage}</p>
          </div>
          
          <p style="color: #718096; font-size: 12px; margin-top: 20px;">
            Esta mensagem foi enviada através do formulário de contato do site Advogando para Enfermagem.
          </p>
        </div>
      `,
    });

    console.log("Notification email sent successfully");

    // Send confirmation email to the user
    const confirmationEmail = await resend.emails.send({
      from: "Advogando para Enfermagem <contato@advogandoparaenfermagem.blog.br>",
      to: [email],
      subject: "Recebemos sua solicitação - Advogando para Enfermagem",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #062A44;">Olá, ${safeName}!</h1>
          
          <p style="color: #475158; font-size: 16px; line-height: 1.6;">
            Recebemos sua solicitação de orientação jurídica e agradecemos por entrar em contato conosco.
          </p>
          
          <p style="color: #475158; font-size: 16px; line-height: 1.6;">
            Nossa equipe analisará sua situação com atenção e entraremos em contato em até <strong>24 horas úteis</strong>.
          </p>
          
          <div style="background-color: #17A88C; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-size: 14px;">Precisa de atendimento urgente?</p>
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: bold;">
              <a href="https://wa.me/5565981579393" style="color: white; text-decoration: none;">
                WhatsApp: (65) 98157-9393
              </a>
            </p>
          </div>
          
          <p style="color: #475158; font-size: 16px; line-height: 1.6;">
            Atenciosamente,<br>
            <strong>Dr. Mateus Gonçalves</strong><br>
            Advogado Especializado em Direitos da Enfermagem
          </p>
          
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          
          <p style="color: #718096; font-size: 12px;">
            Advogando para Enfermagem<br>
            Av. Historiador Rubens de Mendonça, 2000 - Sala 1107<br>
            Bosque da Saúde, Cuiabá - MT, 78048-425
          </p>
        </div>
      `,
    });

    console.log("Confirmation email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Emails enviados com sucesso" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error.message);
    return new Response(
      JSON.stringify({ error: "Erro ao processar solicitação" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
