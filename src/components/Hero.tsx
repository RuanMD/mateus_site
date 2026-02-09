import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MapPin, MessageCircle, Scale } from "lucide-react";
import { LightRays } from "@/components/ui/light-rays";
import { motion } from "framer-motion";

export default function Hero() {
  const credentials = [
    { icon: Calendar, text: "Atuação dedicada à Enfermagem desde 2016" },
    { icon: Scale, text: "Foco 100% em direitos previdenciários e trabalhistas" },
    { icon: MapPin, text: "Atendimento online para todos os estados" },
    { icon: MessageCircle, text: "Contato ágil por WhatsApp no horário de atendimento" },
  ];

  return (
    <section id="inicio" className="relative overflow-hidden min-h-[100svh] md:min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src="/images/hero-bg.webp" 
          alt="" 
          width={1280}
          height={720}
          fetchPriority="high"
          decoding="sync"
          loading="eager"
          className="absolute inset-0 w-full h-full object-cover blur-[2px] scale-105"
        />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Blue gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/60" />
      
      {/* Light Rays animation */}
      <LightRays count={6} color="rgba(255, 255, 255, 0.12)" blur={50} opacity={0.4} speed={15} length="100%" />
      
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-15" />
      
      <div className="relative w-full px-4 sm:px-6 md:px-8 lg:container lg:mx-auto py-16 sm:py-20 md:py-24">
        <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent-foreground text-sm font-medium">
              <Scale className="w-4 h-4 text-accent" />
              Advocacia especializada para Enfermagem
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-[1.15] tracking-tight px-2"
          >
            Advogado{" "}
            <span className="relative">
              <span className="relative z-10 text-accent">previdenciário e trabalhista</span>
              <span className="absolute bottom-1 left-0 right-0 h-3 bg-accent/20 -skew-x-3 rounded" />
            </span>{" "}
            exclusivo para profissionais da Enfermagem em todo o Brasil
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-primary-foreground/95 font-medium px-2"
          >
            Protegendo juridicamente quem cuida do Brasil todos os dias
          </motion.p>
          
          {/* Divider */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 py-2"
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent/50" />
            <div className="w-2 h-2 rounded-full bg-accent" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50" />
          </motion.div>

          {/* Impact phrase */}
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-2xl mx-auto px-6"
          >
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/90 italic leading-relaxed">
              "Você não deveria envelhecer com medo de não conseguir se aposentar com dignidade."
            </p>
          </motion.blockquote>
          
          {/* CTA Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
          >
            <Button 
              asChild 
              size="lg" 
              className="text-base px-8 py-6 w-full sm:w-auto max-w-sm group bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300"
            >
              <a 
                href="https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20sobre%20direitos%20da%20Enfermagem." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Quero falar com o advogado
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>

          {/* Credentials block */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 sm:pt-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {credentials.map((credential, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="group flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-xl px-4 py-4 border border-white/10 hover:bg-white/15 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                    <credential.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="text-sm sm:text-base text-primary-foreground/95 leading-snug">
                    {credential.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
