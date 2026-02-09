import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo-new.png";
import AnimatedHeaderText from "@/components/AnimatedHeaderText";

const navigation = [{
  name: "Início",
  href: "/"
}, {
  name: "Quem Somos",
  href: "/quem-somos"
}, {
  name: "Serviços",
  href: "/servicos"
}, {
  name: "Blog",
  href: "/blog"
}, {
  name: "FAQ",
  href: "/faq"
}, {
  name: "Contato",
  href: "/contato"
}];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-custom flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={logo} alt="Advogando para Enfermagem" className="h-10 w-10" />
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-primary leading-none">
              Advogando para
            </span>
            <span className="font-display text-lg font-bold text-accent leading-none">
              Enfermagem
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
          {navigation.map(item => <Link key={item.name} to={item.href} className="text-sm font-medium text-foreground hover:text-accent transition-colors whitespace-nowrap">
              {item.name}
            </Link>)}
          <Button asChild variant="default" size="sm" className="relative overflow-hidden animate-pulse hover:animate-none group whitespace-nowrap">
            <a href="https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20sobre%20direitos%20da%20Enfermagem." target="_blank" rel="noopener noreferrer" className="relative z-10">
              <span className="relative">
                Falar com advogado
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button type="button" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && <div className="lg:hidden border-t border-border bg-background">
          <div className="container-custom py-4 space-y-4">
            {navigation.map(item => <Link key={item.name} to={item.href} className="block text-base font-medium text-foreground hover:text-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                {item.name}
              </Link>)}
            <Button asChild variant="default" size="sm" className="w-full relative overflow-hidden animate-pulse hover:animate-none group">
              <a href="https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20sobre%20direitos%20da%20Enfermagem." target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="relative z-10">
                <span className="relative">
                  Falar com advogado
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              </a>
            </Button>
          </div>
        </div>}

      {/* Animated Messages */}
      <div className="hidden md:block border-t border-border bg-muted/30">
        <div className="container-custom py-2">
          <AnimatedHeaderText />
        </div>
      </div>
    </header>;
}