import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noIndex?: boolean;
}

const BASE_URL = 'https://advogandoparaenfermagem.com.br';
const DEFAULT_IMAGE = 'https://advogandoparaenfermagem.blog.br/images/hero-nurses.webp';
const SITE_NAME = 'Advogando para Enfermagem';

export default function SEO({
  title = 'Advogado Previdenciário e Trabalhista da Enfermagem | Atendimento Nacional',
  description = 'Advogado previdenciário e trabalhista exclusivo para profissionais da Enfermagem em todo o Brasil. Aposentadoria especial, PPP, LTCAT, piso salarial, burnout e direitos trabalhistas.',
  keywords = 'advogado previdenciário enfermagem, advogado trabalhista enfermagem, aposentadoria especial enfermagem, PPP enfermagem, direitos enfermagem, piso salarial enfermagem, burnout enfermagem, LTCAT enfermagem',
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  article,
  noIndex = false,
}: SEOProps) {
  const fullTitle = title.includes('Advogando') || title.includes('Advogado') 
    ? title 
    : `${title} | Advogando para Enfermagem`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Mateus Gonçalves - Advogado OAB" />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={`${BASE_URL}${canonical}`} />}
      
      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      {canonical && <meta property="og:url" content={`${BASE_URL}${canonical}`} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Article specific (for blog posts) */}
      {ogType === 'article' && article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags?.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Helmet>
  );
}
