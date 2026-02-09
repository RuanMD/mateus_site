import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface RelatedLink {
  to: string;
  title: string;
  description?: string;
}

interface InternalLinkingProps {
  title?: string;
  links: RelatedLink[];
  variant?: "default" | "compact" | "cards";
}

export default function InternalLinking({ 
  title = "Leia também", 
  links, 
  variant = "default" 
}: InternalLinkingProps) {
  if (links.length === 0) return null;

  if (variant === "compact") {
    return (
      <nav aria-label="Links relacionados" className="my-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          {title}
        </h3>
        <ul className="space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              <Link 
                to={link.to}
                className="text-primary hover:text-accent transition-colors inline-flex items-center gap-1 group text-sm"
              >
                <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  if (variant === "cards") {
    return (
      <nav aria-label="Conteúdo relacionado" className="my-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="block p-4 rounded-xl border border-border bg-card hover:border-accent/40 hover:shadow-lg transition-all group"
            >
              <h4 className="font-medium text-foreground group-hover:text-accent transition-colors mb-1">
                {link.title}
              </h4>
              {link.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {link.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav aria-label="Links relacionados" className="my-6 p-4 rounded-lg bg-muted/30 border border-border">
      <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              to={link.to}
              className="text-primary hover:text-accent transition-colors inline-flex items-center gap-2 group"
            >
              <ArrowRight className="h-4 w-4 text-accent group-hover:translate-x-1 transition-transform" />
              <span>{link.title}</span>
            </Link>
            {link.description && (
              <p className="text-sm text-muted-foreground ml-6 mt-0.5">
                {link.description}
              </p>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

// SEO-focused internal links for common pages
export const commonInternalLinks = {
  services: [
    { to: "/servicos", title: "Todos os Serviços Jurídicos para Enfermagem" },
    { to: "/blog", title: "Blog sobre Direitos da Enfermagem" },
    { to: "/faq", title: "Perguntas Frequentes sobre Aposentadoria" },
  ],
  retirement: [
    { to: "/servicos", title: "Aposentadoria Especial da Enfermagem" },
    { to: "/blog/categoria/aposentadoria-especial", title: "Artigos sobre Aposentadoria Especial" },
    { to: "/faq", title: "Dúvidas sobre Aposentadoria" },
  ],
  salary: [
    { to: "/servicos", title: "Piso Salarial da Enfermagem" },
    { to: "/blog/categoria/piso-salarial", title: "Artigos sobre Piso Salarial" },
    { to: "/contato", title: "Consulte um Especialista" },
  ],
  documents: [
    { to: "/servicos", title: "Análise de PPP e LTCAT" },
    { to: "/blog", title: "Como corrigir erros no PPP" },
    { to: "/contato", title: "Solicitar Análise de Documentos" },
  ],
};
