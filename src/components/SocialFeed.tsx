import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import tiktokLogo from "@/assets/tiktok-logo-small.webp";
import youtubeLogo from "@/assets/youtube-logo.png";
import { useState, useRef, useEffect } from "react";

// Lazy Instagram embed that only loads when visible
function LazyInstagramEmbed({ postUrl, index }: { postUrl: string; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      {isVisible ? (
        <iframe
          src={`${postUrl}embed/`}
          className="w-full h-[480px] sm:h-[420px] lg:h-[380px]"
          frameBorder="0"
          scrolling="no"
          allowTransparency
          allow="encrypted-media"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-[480px] sm:h-[420px] lg:h-[380px] bg-muted/50 flex items-center justify-center">
          <Instagram className="h-8 w-8 text-muted-foreground/50 animate-pulse" />
        </div>
      )}
    </div>
  );
}

export default function SocialFeed() {
  const socialLinks = [
    {
      name: "Instagram",
      handle: "@advogandoparaenfermagem",
      url: "https://www.instagram.com/advogandoparaenfermagem",
      icon: Instagram,
      color: "from-purple-600 via-pink-600 to-orange-500",
      description: "Dicas diárias sobre direitos da Enfermagem"
    },
    {
      name: "TikTok",
      handle: "@advogandoparaenfermagem",
      url: "https://www.tiktok.com/@advogandoparaenfermagem",
      icon: "image",
      imageSrc: tiktokLogo,
      color: "from-black to-[#00f2ea]",
      description: "Conteúdo rápido e educativo"
    },
    {
      name: "YouTube",
      handle: "@AdvogandoParaEnfermagem",
      url: "https://youtube.com/@advogandoparaenfermagem",
      icon: "image",
      imageSrc: youtubeLogo,
      color: "from-red-600 to-red-700",
      description: "Análises completas e palestras"
    }
  ];

  const instagramPosts = [
    "https://www.instagram.com/reel/DPhjqOgD8GP/",
    "https://www.instagram.com/p/DQFsU2uDt68/",
    "https://www.instagram.com/reel/DQcqRAFDtZJ/",
    "https://www.instagram.com/p/DFL0xWPvEyx/"
  ];

  return (
    <section id="redes-sociais" className="section-padding bg-gradient-to-b from-background to-muted/20">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="heading-2 text-primary mb-3 sm:mb-4 px-2">
            Acompanhe Conteúdo Jurídico Diário
          </h2>
          <p className="body-large text-muted-foreground max-w-2xl mx-auto px-2">
            Orientação gratuita sobre direitos previdenciários e trabalhistas da Enfermagem
          </p>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              <div className="relative p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center`}>
                  {social.icon === "image" ? (
                    <img src={social.imageSrc} alt={social.name} className="h-5 w-5 sm:h-7 sm:w-7 object-contain" />
                  ) : (
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  )}
                </div>
                
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl mb-1">{social.name}</h3>
                  <p className="text-xs sm:text-sm text-accent font-medium mb-1 sm:mb-2">{social.handle}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{social.description}</p>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-accent group-hover:gap-3 transition-all">
                  Seguir agora
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Instagram Posts Grid - Lazy Loaded */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {instagramPosts.map((postUrl, index) => (
            <LazyInstagramEmbed key={index} postUrl={postUrl} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center">
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center gap-4 mb-4 sm:mb-6">
              <div className="h-px flex-1 bg-border" />
              <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />
              <div className="h-px flex-1 bg-border" />
            </div>
            
            <h3 className="heading-3 text-primary mb-2 sm:mb-3">
              Mais de 500 posts educativos sobre seus direitos
            </h3>
            <p className="body-default text-muted-foreground mb-4 sm:mb-6 px-2">
              Acesse conteúdo exclusivo, stories interativos e atualizações sobre legislação da Enfermagem
            </p>
            
            <Button asChild size="lg" variant="default" className="w-full sm:w-auto">
              <a href="https://www.instagram.com/advogandoparaenfermagem" target="_blank" rel="noopener noreferrer">
                <Instagram className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Seguir no Instagram
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
