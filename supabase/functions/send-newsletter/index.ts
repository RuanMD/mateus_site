import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

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
  // Allow internal calls (no origin) or allowed external origins
  const isAllowed = !origin || allowedOrigins.includes(origin);
  
  return {
    "Access-Control-Allow-Origin": isAllowed ? (origin || "*") : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { post_id, title, slug, excerpt, featured_image_url } = await req.json();

    console.log("Received newsletter request for post:", title);

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Fetch all active newsletter subscribers
    const { data: subscribers, error: subscribersError } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("is_active", true);

    if (subscribersError) {
      console.error("Error fetching subscribers:", subscribersError);
      throw new Error("Failed to fetch subscribers");
    }

    if (!subscribers || subscribers.length === 0) {
      console.log("No active subscribers found");
      return new Response(
        JSON.stringify({ success: true, message: "No subscribers to notify" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Sending newsletter to ${subscribers.length} subscribers`);

    const siteUrl = "https://advogandoparaenfermagem.blog.br";
    const postUrl = `${siteUrl}/blog/${slug}`;
    const imageUrl = featured_image_url 
      ? (featured_image_url.startsWith("http") ? featured_image_url : `${siteUrl}${featured_image_url}`)
      : `${siteUrl}/images/hero-nurses.webp`;

    // Send emails to all subscribers
    const emailPromises = subscribers.map((subscriber) =>
      resend.emails.send({
        from: "Advogando para Enfermagem <onboarding@resend.dev>",
        to: [subscriber.email],
        subject: `📰 Novo Artigo: ${title}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #F7FAFC;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #062A44; margin: 0; font-size: 24px;">Advogando para Enfermagem</h1>
              <p style="color: #17A88C; margin: 5px 0 0 0; font-size: 14px;">Advogado exclusivo para profissionais da Enfermagem</p>
            </div>
            
            <div style="background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <img src="${imageUrl}" alt="${title}" style="width: 100%; height: 200px; object-fit: cover;" />
              
              <div style="padding: 24px;">
                <h2 style="color: #062A44; margin: 0 0 16px 0; font-size: 20px; line-height: 1.4;">
                  ${title}
                </h2>
                
                <p style="color: #475158; font-size: 15px; line-height: 1.6; margin: 0 0 24px 0;">
                  ${excerpt}
                </p>
                
                <a href="${postUrl}" style="display: inline-block; background-color: #17A88C; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">
                  Ler artigo completo →
                </a>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #718096; font-size: 12px; margin: 0 0 10px 0;">
                Você está recebendo este email porque se inscreveu na nossa newsletter.
              </p>
              <p style="color: #718096; font-size: 12px; margin: 0;">
                <a href="${siteUrl}" style="color: #17A88C;">Advogando para Enfermagem</a> • 
                Dr. Mateus Gonçalves • OAB/MT
              </p>
            </div>
          </div>
        `,
      })
    );

    const results = await Promise.allSettled(emailPromises);
    
    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`Newsletter sent: ${successful} successful, ${failed} failed`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Newsletter enviada para ${successful} inscritos`,
        stats: { successful, failed, total: subscribers.length }
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-newsletter function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
