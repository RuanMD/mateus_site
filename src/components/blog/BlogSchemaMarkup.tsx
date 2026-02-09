import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogSchemaMarkupProps {
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  authorBio?: string;
  faqItems?: FAQItem[];
}

const BlogSchemaMarkup = ({
  title,
  description,
  canonicalUrl,
  imageUrl,
  publishedTime,
  modifiedTime,
  authorName,
  authorBio,
  faqItems,
}: BlogSchemaMarkupProps) => {
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: canonicalUrl,
    ...(imageUrl && {
      image: {
        "@type": "ImageObject",
        url: imageUrl,
      },
    }),
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      "@type": "Person",
      name: authorName || "Mateus Gonçalves",
      description: authorBio || "Advogado especializado em Direitos da Enfermagem",
    },
    publisher: {
      "@type": "Organization",
      name: "Advogando para Enfermagem",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/logo.png`,
      },
    },
  };

  const faqSchema =
    faqItems && faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: window.location.origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${window.location.origin}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
};

export default BlogSchemaMarkup;
