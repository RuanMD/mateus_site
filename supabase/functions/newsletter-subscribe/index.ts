import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const RATE_LIMIT = 3; // 3 subscriptions per hour per IP
const RATE_WINDOW_MS = 3600 * 1000; // 1 hour in milliseconds

// Allowed origins for CORS
const allowedOrigins = [
  'https://advogandoparaenfermagem.blog.br',
  'https://www.advogandoparaenfermagem.blog.br',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:8080',
];

// Input validation schema
const subscribeSchema = z.object({
  email: z.string().trim().email("Email inválido").max(255, "Email muito longo"),
});

function getCorsHeaders(origin: string | null): Record<string, string> {
  const isAllowed = origin && allowedOrigins.includes(origin);
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

function isAuthorizedRequest(req: Request, origin: string | null): boolean {
  // Allow if origin is authorized
  if (origin && allowedOrigins.includes(origin)) {
    return true;
  }
  
  // Allow server-to-server calls with valid auth/apikey header (no origin)
  if (!origin) {
    const authHeader = req.headers.get('authorization');
    const apikeyHeader = req.headers.get('apikey');
    if ((authHeader && authHeader.startsWith('Bearer ')) || apikeyHeader) {
      return true;
    }
  }
  
  return false;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Reject non-POST methods
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método não permitido" }),
      { status: 405, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  // Reject requests from unauthorized origins/sources
  if (!isAuthorizedRequest(req, origin)) {
    return new Response(
      JSON.stringify({ error: "Origem não autorizada" }),
      { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Create Supabase client with service role for rate limit checks
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit
    const windowStart = new Date(Date.now() - RATE_WINDOW_MS).toISOString();
    const { count, error: countError } = await supabase
      .from('newsletter_rate_limits')
      .select('*', { count: 'exact', head: true })
      .eq('ip_address', clientIp)
      .gte('created_at', windowStart);

    if (countError) {
      console.error("Rate limit check error:", countError);
    }

    if (count !== null && count >= RATE_LIMIT) {
      console.log(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ 
          error: "Muitas tentativas", 
          message: "Você atingiu o limite de inscrições. Aguarde antes de tentar novamente." 
        }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse and validate input
    const rawBody = await req.json();
    const validationResult = subscribeSchema.safeParse(rawBody);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({ 
          error: "E-mail inválido",
          message: "Por favor, insira um e-mail válido."
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { email } = validationResult.data;
    const normalizedEmail = email.toLowerCase();

    // Insert subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: normalizedEmail });

    if (insertError) {
      // Handle duplicate email
      if (insertError.code === '23505') {
        return new Response(
          JSON.stringify({ 
            error: "E-mail já cadastrado",
            message: "Este e-mail já está inscrito na nossa newsletter."
          }),
          { status: 409, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      throw insertError;
    }

    // Log rate limit entry (fire and forget, don't fail if this errors)
    try {
      await supabase
        .from('newsletter_rate_limits')
        .insert({ ip_address: clientIp });
    } catch (rateErr: unknown) {
      console.error("Rate limit log error:", rateErr);
    }

    // Send welcome email
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        // Send welcome email to subscriber
        await resend.emails.send({
          from: "Advogando para Enfermagem <contato@advogandoparaenfermagem.blog.br>",
          to: [normalizedEmail],
          subject: "Bem-vindo(a) à Newsletter do Advogando para Enfermagem! 🩺⚖️",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #062A44; margin-bottom: 10px;">Bem-vindo(a) à nossa Newsletter!</h1>
                <p style="color: #17A88C; font-size: 18px; margin: 0;">Advogando para Enfermagem</p>
              </div>
              
              <p style="color: #475158; font-size: 16px; line-height: 1.6;">
                Olá! 👋
              </p>
              
              <p style="color: #475158; font-size: 16px; line-height: 1.6;">
                Obrigado por se inscrever na nossa newsletter! A partir de agora, você receberá em primeira mão:
              </p>
              
              <ul style="color: #475158; font-size: 16px; line-height: 1.8;">
                <li>📚 Artigos exclusivos sobre direitos da Enfermagem</li>
                <li>⚖️ Atualizações sobre aposentadoria especial e piso salarial</li>
                <li>💡 Dicas jurídicas práticas para profissionais de saúde</li>
                <li>📢 Novidades sobre legislação trabalhista e previdenciária</li>
              </ul>
              
              <p style="color: #475158; font-size: 16px; line-height: 1.6;">
                Enquanto isso, visite nosso blog para conferir os artigos mais recentes:
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="https://advogandoparaenfermagem.blog.br/blog" 
                   style="background-color: #17A88C; color: white; padding: 15px 30px; 
                          text-decoration: none; border-radius: 8px; font-weight: bold;
                          display: inline-block;">
                  Acessar o Blog
                </a>
              </div>
              
              <p style="color: #475158; font-size: 16px; line-height: 1.6;">
                Tem alguma dúvida jurídica? Fale diretamente comigo pelo WhatsApp!
              </p>
              
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://wa.me/5565981579393?text=Olá,%20Dr.%20Mateus!%20Vim%20através%20do%20site%20e%20gostaria%20de%20receber%20orientação%20jurídica%20sobre%20direitos%20da%20Enfermagem." 
                   style="background-color: #25D366; color: white; padding: 12px 25px; 
                          text-decoration: none; border-radius: 8px; font-weight: bold;
                          display: inline-block;">
                  💬 Falar no WhatsApp
                </a>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
              
              <p style="color: #999; font-size: 12px; text-align: center;">
                Dr. Mateus Gonçalves - Advogado Exclusivo para Profissionais da Enfermagem<br>
                <a href="https://advogandoparaenfermagem.blog.br" style="color: #17A88C;">advogandoparaenfermagem.blog.br</a>
              </p>
            </div>
          `,
        });
        
        console.log(`Welcome email sent to: ${normalizedEmail.substring(0, 3)}***`);

        // Send notification to Mateus about new subscriber
        await resend.emails.send({
          from: "Advogando para Enfermagem <contato@advogandoparaenfermagem.blog.br>",
          to: ["mateus@advogandoparaenfermagem.blog.br"],
          subject: "📬 Nova inscrição na Newsletter!",
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1 style="color: #062A44; border-bottom: 2px solid #17A88C; padding-bottom: 10px;">Nova Inscrição na Newsletter</h1>
              
              <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-size: 16px;"><strong>E-mail:</strong> ${normalizedEmail}</p>
                <p style="margin: 10px 0 0 0; font-size: 14px; color: #718096;">Data: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}</p>
              </div>
              
              <p style="color: #718096; font-size: 12px; margin-top: 20px;">
                Notificação automática do site Advogando para Enfermagem.
              </p>
            </div>
          `,
        });
        
        console.log(`Notification email sent to Mateus about new subscriber`);
      } catch (emailErr: unknown) {
        // Don't fail the subscription if email fails
        console.error("Failed to send welcome email:", emailErr);
      }
    }

    console.log(`Newsletter subscription successful for email: ${normalizedEmail.substring(0, 3)}***`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Inscrição realizada com sucesso!" 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Newsletter subscribe error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Erro ao processar inscrição",
        message: "Ocorreu um erro. Tente novamente mais tarde."
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
