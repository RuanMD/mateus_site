import { useState } from "react";
import { Instagram, Mail, Phone, Youtube, Send, MapPin, Clock, ArrowRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo-new.png";
import { getErrorMessage } from "@/lib/error-mapper";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !trimmedEmail.includes("@") || trimmedEmail.length > 255) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um e-mail válido.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("newsletter-subscribe", {
        body: { email: trimmedEmail },
      });

      const parsedFromError = (() => {
        if (!error) return null;
        const ctx = (error as unknown as { context?: { status?: number; body?: unknown } }).context;
        const status = ctx?.status;
        const body = ctx?.body;

        if (typeof body === "string") {
          try {
            const json = JSON.parse(body) as { error?: string; message?: string };
            return { status, ...json };
          } catch {
            return { status, message: (error as Error).message };
          }
        }

        return { status, message: (error as Error).message };
      })();

      const status = parsedFromError?.status;
      const errorKey = data?.error ?? parsedFromError?.error;
      const errorMsg =
        data?.message ??
        parsedFromError?.message ??
        (error ? getErrorMessage(error) : "Ocorreu um erro. Tente novamente.");

      if (error || errorKey) {
        if (status === 409 || errorKey === "E-mail já cadastrado") {
          toast({ title: "E-mail já cadastrado", description: errorMsg });
          return;
        }
        if (status === 429 || errorKey === "Muitas tentativas") {
          toast({ title: "Muitas tentativas", description: errorMsg, variant: "destructive" });
          return;
        }
        if (status === 400 || errorKey === "E-mail inválido") {
          toast({ title: "E-mail inválido", description: errorMsg, variant: "destructive" });
          return;
        }

        toast({ title: "Erro ao inscrever", description: errorMsg, variant: "destructive" });
        return;
      }

      toast({
        title: "Inscrição realizada!",
        description: "Você receberá nossas atualizações em breve."
      });
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Erro ao inscrever",
        description: getErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Início", title: "Página inicial - Advogado da Enfermagem" },
    { to: "/quem-somos", label: "Quem Somos", title: "Sobre Dr. Mateus Gonçalves - Advogado Especialista" },
    { to: "/servicos", label: "Serviços", title: "Serviços Jurídicos para Enfermagem" },
    { to: "/blog", label: "Blog", title: "Blog sobre Direitos da Enfermagem" },
    { to: "/faq", label: "Perguntas Frequentes", title: "FAQ - Dúvidas sobre Aposentadoria e Direitos" },
    { to: "/contato", label: "Contato", title: "Entre em Contato com Advogado da Enfermagem" },
  ];

  const serviceLinks = [
    { to: "/servicos#aposentadoria-especial", label: "Aposentadoria Especial", title: "Aposentadoria Especial para Enfermeiros" },
    { to: "/servicos#ppp-ltcat", label: "PPP e LTCAT", title: "Análise de PPP e LTCAT" },
    { to: "/servicos#piso-salarial", label: "Piso Salarial", title: "Piso Salarial da Enfermagem" },
    { to: "/servicos#burnout", label: "Burnout", title: "Burnout e Saúde Mental na Enfermagem" },
  ];

  return (
    <footer className="bg-gradient-to-b from-primary to-primary/95 text-primary-foreground relative overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

      {/* Newsletter Section */}
      <div className="relative overflow-hidden border-b border-primary-foreground/10">
        <AnimatedGridPattern
          numSquares={30}
          maxOpacity={0.1}
          duration={3}
          repeatDelay={1}
          className={cn(
            "[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 fill-accent/20 stroke-accent/20"
          )}
        />
        <div className="container-custom py-14 sm:py-16 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <Mail className="h-4 w-4" />
              Newsletter
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold mb-3">
              Fique por Dentro
            </h3>
            <p className="text-primary-foreground/70 mb-8 text-sm sm:text-base">
              Cadastre-se para receber notícias sobre leis trabalhistas da Enfermagem diretamente no seu e-mail.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="Seu melhor e-mail"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="bg-primary-foreground/5 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent focus:ring-accent/20 h-12 pl-4 pr-4 rounded-xl"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-primary font-semibold px-6 h-12 rounded-xl shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-all duration-300"
              >
                {isSubmitting ? (
                  "Enviando..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Inscrever-se
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/40 mt-4">
              Não enviamos spam. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

          {/* Brand */}
          <div className="lg:col-span-3 space-y-6">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-xl blur-lg group-hover:bg-accent/30 transition-colors" />
                <img src={logo} alt="Advogando para Enfermagem" className="h-12 w-12 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold leading-tight group-hover:text-accent transition-colors">
                  Advogando para
                </span>
                <span className="font-display text-lg font-bold text-accent leading-tight">
                  Enfermagem
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
              Advogado exclusivo para profissionais da Enfermagem em todo o Brasil. Protegendo quem cuida do país todos os dias.
            </p>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs text-primary-foreground/50 uppercase tracking-wider mb-3 font-medium">
                Redes Sociais
              </p>
              <div className="flex gap-2">
                <a
                  href="https://instagram.com/advogandoparaenfermagem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent hover:text-white transition-all duration-300 group"
                  aria-label="Siga no Instagram"
                >
                  <Instagram className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.tiktok.com/@advogandoparaenfermagem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center hover:bg-black hover:border-transparent hover:text-white transition-all duration-300 group"
                  aria-label="Siga no TikTok"
                >
                  <svg className="h-4 w-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@AdvogandoParaEnfermagem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center hover:bg-red-600 hover:border-transparent hover:text-white transition-all duration-300 group"
                  aria-label="Inscreva-se no YouTube"
                >
                  <Youtube className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="lg:col-span-2" aria-label="Navegação principal">
            <h4 className="text-xs text-primary-foreground/50 uppercase tracking-wider mb-4 font-medium">
              Navegação
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    title={link.title}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services Quick Links */}
          <nav className="lg:col-span-2" aria-label="Serviços jurídicos">
            <h4 className="text-xs text-primary-foreground/50 uppercase tracking-wider mb-4 font-medium">
              Serviços
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    title={link.title}
                    className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cities */}
          <nav className="lg:col-span-2" aria-label="Cidades atendidas">
            <h4 className="text-xs text-primary-foreground/50 uppercase tracking-wider mb-4 font-medium">
              Cidades Atendidas
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/cidades"
                  title="Ver todas as cidades atendidas"
                  className="text-sm text-accent font-medium hover:text-accent/80 transition-colors inline-flex items-center gap-1 group"
                >
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Ver todas as cidades
                </Link>
              </li>
              <li>
                <Link to="/aposentadoria-especial-da-enfermagem-sao-paulo-sp" title="Aposentadoria Especial em São Paulo" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  São Paulo - SP
                </Link>
              </li>
              <li>
                <Link to="/aposentadoria-especial-da-enfermagem-rio-de-janeiro-rj" title="Aposentadoria Especial no Rio de Janeiro" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Rio de Janeiro - RJ
                </Link>
              </li>
              <li>
                <Link to="/aposentadoria-especial-da-enfermagem-belo-horizonte-mg" title="Aposentadoria Especial em Belo Horizonte" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Belo Horizonte - MG
                </Link>
              </li>
              <li>
                <Link to="/aposentadoria-especial-da-enfermagem-cuiaba-mt" title="Aposentadoria Especial em Cuiabá" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Cuiabá - MT
                </Link>
              </li>
              <li>
                <Link to="/aposentadoria-especial-da-enfermagem-salvador-ba" title="Aposentadoria Especial em Salvador" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Salvador - BA
                </Link>
              </li>
              <li>
                <Link to="/aposentadoria-especial-da-enfermagem-fortaleza-ce" title="Aposentadoria Especial em Fortaleza" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors inline-flex items-center gap-1 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                  Fortaleza - CE
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contact Info + Address */}
          <div className="lg:col-span-3">
            <h4 className="text-xs text-primary-foreground/50 uppercase tracking-wider mb-4 font-medium">
              Contato
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://wa.me/5565981579393?text=Olá%2C%20Dr.%20Mateus!%20Vim%20através%20do%20site%20e%20gostaria%20de%20receber%20orientação%20jurídica%20sobre%20direitos%20da%20Enfermagem."
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Fale pelo WhatsApp com o Advogado da Enfermagem"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm">(65) 98157-9393</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:mateus@advogandoparaenfermagem.blog.br"
                  title="Envie um email para o Advogado da Enfermagem"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm break-all">mateus@advogandoparaenfermagem.blog.br</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-primary-foreground/50" />
                </div>
                <span className="text-sm">Seg-Sex, 9h às 18h<br />(Horário de Brasília)</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/60 pt-2 border-t border-primary-foreground/10">
                <div className="w-8 h-8 rounded-lg bg-primary-foreground/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4 text-primary-foreground/50" />
                </div>
                <address className="text-sm not-italic leading-relaxed">
                  Av. Historiador Rubens de Mendonça, 2000<br />
                  Sala 1107 – Bosque da Saúde<br />
                  Cuiabá – MT, 78048-425
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Ethical Disclaimer */}
        <div className="border-t border-primary-foreground/10 pt-8 pb-6">
          <div className="bg-primary-foreground/5 rounded-xl px-6 py-4 max-w-4xl mx-auto">
            <p className="text-xs text-primary-foreground/50 text-center leading-relaxed">
              Este site tem caráter exclusivamente informativo, não constitui promessa de resultado e não substitui consulta jurídica individual.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/50 order-2 lg:order-1">
              © {currentYear} Advogando para Enfermagem. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm order-1 lg:order-2">
              <Link to="/politica-de-privacidade" className="text-primary-foreground/50 hover:text-accent transition-colors">
                Política de Privacidade
              </Link>
              <Link to="/faq" className="text-primary-foreground/50 hover:text-accent transition-colors">
                FAQ
              </Link>
              <Link to="/contato" className="text-primary-foreground/50 hover:text-accent transition-colors">
                Fale Conosco
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
