import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://advogandoparaenfermagem.com.br';
const DEFAULT_IMAGE = 'https://advogandoparaenfermagem.blog.br/images/hero-nurses.webp';

// Organization Schema - for consistent branding across all pages
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Advogando para Enfermagem",
    "alternateName": ["Mateus Gonçalves Advocacia", "Advogado da Enfermagem"],
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/logo.png`,
      "width": 512,
      "height": 512
    },
    "image": DEFAULT_IMAGE,
    "description": "Escritório de advocacia especializado exclusivamente em direitos previdenciários e trabalhistas de profissionais da Enfermagem em todo o Brasil.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      "name": "Mateus Gonçalves",
      "jobTitle": "Advogado Especialista em Direito Previdenciário e Trabalhista",
      "description": "Advogado especializado exclusivamente em direitos de profissionais da Enfermagem",
      "knowsAbout": [
        "Aposentadoria Especial",
        "Direito Previdenciário",
        "Direito Trabalhista",
        "Piso Salarial Enfermagem",
        "PPP e LTCAT"
      ]
    },
    "sameAs": [
      "https://www.instagram.com/advogandoparaenfermagem",
      "https://www.tiktok.com/@advogandoparaenfermagem",
      "https://www.youtube.com/@AdvogandoParaEnfermagem"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+55-65-98157-9393",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": "Portuguese",
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// LocalBusiness + ProfessionalService Schema
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "ProfessionalService", "LegalService"],
    "@id": `${BASE_URL}/#localbusiness`,
    "name": "Advogando para Enfermagem",
    "alternateName": "Mateus Gonçalves Advocacia",
    "description": "Escritório de advocacia especializado exclusivamente em direitos previdenciários e trabalhistas de profissionais da Enfermagem em todo o Brasil. Atendimento online para todo o país.",
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "image": DEFAULT_IMAGE,
    "telephone": "+55 65 98157-9393",
    "email": "mateus@advogandoparaenfermagem.blog.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Historiador Rubens de Mendonça, 2000 - Sala 1107",
      "addressLocality": "Cuiabá",
      "addressRegion": "MT",
      "postalCode": "78048-425",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-15.5989",
      "longitude": "-56.0949"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "serviceArea": {
      "@type": "Country",
      "name": "Brasil"
    },
    "priceRange": "$$",
    "currenciesAccepted": "BRL",
    "paymentAccepted": ["Transferência Bancária", "PIX", "Cartão de Crédito"],
    "knowsLanguage": "pt-BR",
    "slogan": "Protegendo quem cuida do Brasil",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Serviços Jurídicos para Enfermagem",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Aposentadoria Especial da Enfermagem",
            "description": "Análise e defesa do direito à aposentadoria especial para enfermeiros, técnicos e auxiliares de enfermagem expostos a agentes biológicos.",
            "url": `${BASE_URL}/servicos`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Planejamento Previdenciário",
            "description": "Análise completa do histórico profissional para otimizar a aposentadoria de profissionais da enfermagem.",
            "url": `${BASE_URL}/servicos`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Análise de PPP e LTCAT",
            "description": "Correção e retificação de documentos previdenciários para enfermeiros.",
            "url": `${BASE_URL}/servicos`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Piso Salarial da Enfermagem",
            "description": "Ações judiciais para garantir o recebimento do piso nacional da Enfermagem.",
            "url": `${BASE_URL}/servicos`
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Burnout e Saúde Mental",
            "description": "Defesa de direitos relacionados a esgotamento profissional e problemas de saúde mental na enfermagem.",
            "url": `${BASE_URL}/servicos`
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/advogandoparaenfermagem",
      "https://www.tiktok.com/@advogandoparaenfermagem",
      "https://www.youtube.com/@AdvogandoParaEnfermagem"
    ],
    "founder": {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      "name": "Mateus Gonçalves",
      "jobTitle": "Advogado Especialista em Direito Previdenciário e Trabalhista"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Maria Silva"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Excelente atendimento! Dr. Mateus conseguiu minha aposentadoria especial em tempo recorde."
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Website Schema with SearchAction
export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Advogando para Enfermagem",
    "alternateName": "Advogado da Enfermagem",
    "description": "Portal jurídico especializado em direitos previdenciários e trabalhistas para enfermeiros, técnicos e auxiliares de enfermagem em todo o Brasil",
    "publisher": {
      "@id": `${BASE_URL}/#organization`
    },
    "potentialAction": [
      {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${BASE_URL}/blog?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      },
      {
        "@type": "ReadAction",
        "target": `${BASE_URL}/blog`
      }
    ],
    "inLanguage": "pt-BR",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@id": `${BASE_URL}/#organization`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// WebPage Schema for individual pages
interface WebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  dateModified?: string;
}

export function WebPageSchema({ title, description, url, dateModified }: WebPageSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${url}#webpage`,
    "url": `${BASE_URL}${url}`,
    "name": title,
    "description": description,
    "isPartOf": {
      "@id": `${BASE_URL}/#website`
    },
    "about": {
      "@id": `${BASE_URL}/#organization`
    },
    "dateModified": dateModified || new Date().toISOString(),
    "inLanguage": "pt-BR",
    "potentialAction": {
      "@type": "ReadAction",
      "target": `${BASE_URL}${url}`
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.url}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Article/BlogPosting Schema
interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedDate: string;
  modifiedDate?: string;
  authorName?: string;
  category?: string;
}

export function ArticleSchema({
  title,
  description,
  url,
  image,
  publishedDate,
  modifiedDate,
  authorName = "Mateus Gonçalves",
  category,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image || `${BASE_URL}/logo.png`,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": `${BASE_URL}/quem-somos`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Advogando para Enfermagem",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/logo.png`
      }
    },
    "datePublished": publishedDate,
    "dateModified": modifiedDate || publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${BASE_URL}${url}`
    },
    ...(category && { "articleSection": category }),
    "inLanguage": "pt-BR"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQSchema({ items }: { items: FAQItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

// Service Schema for individual service pages
interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
}

export function ServiceSchema({ name, description, url }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "LegalService",
      "name": "Advogando para Enfermagem",
      "@id": `${BASE_URL}/#organization`
    },
    "areaServed": {
      "@type": "Country",
      "name": "Brasil"
    },
    "url": `${BASE_URL}${url}`
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
