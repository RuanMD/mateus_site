import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import PainPoints from "@/components/PainPoints";
import InternalLinking from "@/components/InternalLinking";
import citiesData from "@/data/cities.json";
import { Button } from "@/components/ui/button";
import { MessageCircle, Shield, Heart, Scale, ArrowRight, Instagram, Users, BookOpen, Video, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import mateusProfile from "@/assets/mateus-profile.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";

const CityPage = () => {
  const { slug } = useParams();
  const PREFIX = "aposentadoria-especial-da-enfermagem-";

  // Handlers both: 
  // 1. /aposentadoria-especial-da-enfermagem-sao-paulo-sp
  // 2. /sao-paulo-sp
  const citySlug = slug?.startsWith(PREFIX)
    ? slug.slice(PREFIX.length)
    : slug;

  const city = citySlug ? citiesData.find(c => c.slug === citySlug) : null;

  if (!city) {
    return <Navigate to="/404" replace />;
  }

  const title = `Aposentadoria especial da enfermagem em ${city.name} - ${city.state}`;
  const description = `Você está procurando por Aposentadoria especial da enfermagem em ${city.name} - ${city.state}? Nós podemos lhe atender! Advogado especialista para Enfermagem.`;

  // Deterministic city selection based on slug hash (consistent for SEO crawlers)
  const getRelatedCities = (currentSlug: string, count: number) => {
    const hash = currentSlug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const filtered = citiesData.filter(c => c.slug !== currentSlug);
    const sorted = [...filtered].sort((a, b) => a.slug.localeCompare(b.slug));
    const result = [];
    for (let i = 0; i < count && i < sorted.length; i++) {
      result.push(sorted[(hash + i * 617) % sorted.length]);
    }
    return result.map(c => ({
      // We keep the internal links with the long prefix for SEO consistency (current strategy)
      // but the component above now also accepts the short version if the user navigates directly.
      to: `/aposentadoria-especial-da-enfermagem-${c.slug}`,
      title: `Aposentadoria em ${c.name} - ${c.state}`
    }));
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": `Advogado Mateus Gonçalves em ${city.name} - ${city.state}`,
    "image": "https://storage.googleapis.com/gpt-engineer-file-uploads/rns3o9EKdNYL6jeM0ZAEuGM9lME2/uploads/1764643482393-gwqrwgr.png",
    "url": `https://advogandoparaenfermagem.com.br/aposentadoria-especial-da-enfermagem-${city.slug}`,
    "telephone": "+5565981579393",
    "description": `Advogado especialista em Aposentadoria Especial para Enfermagem atendendo em ${city.name} - ${city.state}.`,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Historiador Rubens de Mendonça, 2000 – Sala 1107",
      "addressLocality": "Cuiabá",
      "addressRegion": "MT",
      "postalCode": "78048-425",
      "addressCountry": "BR"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -15.596,
      "longitude": -56.096
    },
    "areaServed": {
      "@type": "City",
      "name": city.name,
      "addressRegion": city.state
    },
    "priceRange": "$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO title={title} description={description} canonical={`/aposentadoria-especial-da-enfermagem-${city.slug}`} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      </Helmet>

      <Header />

      <main>
        {/* City-Specific Hero */}
        <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32 bg-primary">
          {/* Subtle background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-secondary/40 opacity-90" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIvPjwvZz48L3N2Zz4=')] opacity-10" />

          <div className="container-custom relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 text-accent font-semibold text-xs md:text-sm uppercase tracking-wider mb-8">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Atendimento Especializado em {city.name} - {city.state}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1] tracking-tight"
            >
              Aposentadoria Especial da Enfermagem em <span className="text-accent">{city.name}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-12 font-medium"
            >
              Garanta seus direitos com quem entende a realidade dos plantões em {city.name}. Suporte jurídico especializado para Enfermeiros, Técnicos e Auxiliares.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-8 rounded-2xl shadow-2xl shadow-accent/20 transition-all hover:translate-y-[-4px] text-lg lg:text-xl">
                <a href={`https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Moro%20em%20${city.name}%20e%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20Aposentadoria%20Especial.`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-3 h-6 w-6 lg:h-7 lg:w-7" />
                  Consultar meu caso agora
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Identification Section */}
        <PainPoints />

        {/* Sobre o Especialista */}
        <section className="section-padding bg-muted/30">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Foto + Credenciais */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="bg-card rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <div className="aspect-[3/4] max-w-sm mx-auto">
                    <img src={mateusProfile} alt="Mateus Gonçalves - Advogado Especialista em Enfermagem" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 text-center border-t border-border">
                    <h3 className="text-xl font-display font-bold text-primary">Mateus Gonçalves</h3>
                    <p className="text-sm text-accent font-medium">OAB/MT 23.456</p>
                  </div>
                </div>
                {/* Badge de atendimentos */}
                <div className="absolute -bottom-4 right-4 lg:right-0 bg-card rounded-xl shadow-xl border border-border px-5 py-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Atendimentos</p>
                    <p className="text-xl font-bold text-primary">+<AnimatedCounter end={50000} suffix="" /></p>
                  </div>
                </div>
              </motion.div>

              {/* Info + Stats */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-3">
                    <span className="w-6 h-0.5 bg-accent" />
                    Sobre o Especialista
                  </span>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
                    Mateus Gonçalves
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Advogado especialista em aposentadoria no INSS e regimes próprios com foco prático em profissionais de Enfermagem.
                  </p>
                </div>

                <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-4">
                  <p className="text-sm font-medium text-foreground/80">
                    Proprietário do Instagram: <a href="https://instagram.com/advogandoparaenfermagem" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold hover:underline">@advogandoparaenfermagem</a>
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <p className="text-2xl md:text-3xl font-bold text-accent">+<AnimatedCounter end={500} /></p>
                    <p className="text-sm text-muted-foreground mt-1">Lives realizadas</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <p className="text-2xl md:text-3xl font-bold text-accent">+<AnimatedCounter end={700} /></p>
                    <p className="text-sm text-muted-foreground mt-1">Publicações</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <p className="text-2xl md:text-3xl font-bold text-accent">+<AnimatedCounter end={170} suffix=" mil" /></p>
                    <p className="text-sm text-muted-foreground mt-1">Seguidores</p>
                  </div>
                  <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                    <p className="text-2xl md:text-3xl font-bold text-primary">Nacional</p>
                    <p className="text-sm text-muted-foreground mt-1">Palestras em todo Brasil</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground italic">
                  Entrevistas para renomados portais e TV Cultura.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-padding bg-background relative overflow-hidden">
          <div className="container-custom">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="prose prose-lg max-w-none text-foreground/80"
                >
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
                    Por que você precisa de um advogado especialista para {city.name}?
                  </h2>
                  <p className="text-xl font-medium text-primary/90 mb-6 leading-relaxed">
                    A Enfermagem em <strong>{city.name} - {city.state}</strong> enfrenta desafios únicos. Seja em hospitais grandes ou unidades básicas, a luta pelo direito à aposentadoria especial é constante.
                  </p>

                  <p>
                    A regra da aposentadoria especial permite que profissionais da saúde se aposentem mais cedo devido à exposição a agentes nocivos (biológicos). No entanto, converter esse direito em benefício real no INSS ou Regime Próprio exige uma estratégia jurídica sólida.
                  </p>

                  <div className="my-10 grid gap-6 sm:grid-cols-2">
                    <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-accent" />
                      </div>
                      <h4 className="text-lg font-bold text-primary mb-2">Análise de PPP</h4>
                      <p className="text-sm">Muitas instituições em {city.name} entregam documentos com códigos errados que invalidam o tempo especial.</p>
                    </div>
                    <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                        <Scale className="h-6 w-6 text-primary" />
                      </div>
                      <h4 className="text-lg font-bold text-primary mb-2">Atuação Nacional</h4>
                      <p className="text-sm">Atendimento 100% online e seguro, com a mesma proximidade de um escritório físico em {city.name}.</p>
                    </div>
                  </div>

                  <p>
                    Nós não apenas entramos com o pedido; nós desenhamos uma estratégia para que você não perca tempo e nem dinheiro. Afinal, cada mês de atraso é um prejuízo para quem dedicou a vida cuidando de {city.name}.
                  </p>

                  <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-primary to-primary-dark text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-white text-2xl font-bold mb-4">Mora em {city.name} ou região?</h3>
                      <p className="text-white/90 mb-6 text-lg font-medium">
                        Não deixe sua aposentadoria para depois. Clique no botão abaixo e fale diretamente com o Dr. Mateus Gonçalves.
                      </p>
                      <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto font-bold px-8 py-6 rounded-xl hover:scale-105 transition-transform text-primary hover:bg-white">
                        <a href={`https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Moro%20em%20${city.name}%20e%20gostaria%20de%20orienta%C3%A7%C3%A3o%20sobre%20Aposentadoria%20Especial.`} target="_blank" rel="noopener noreferrer">
                          <MessageCircle className="mr-2 h-5 w-5" />
                          Quero falar com o Dr. Mateus
                        </a>
                      </Button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-full bg-white/5 skew-x-12" />
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-card p-6 rounded-3xl border border-border shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -mr-12 -mt-12" />

                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Heart className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 italic">"Defender a Enfermagem é defender o Brasil."</h3>
                    <p className="text-sm text-muted-foreground mb-8">Mateus Gonçalves, Advogado especialista em Enfermagem.</p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-left">
                        <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm font-medium leading-tight">Consultoria 100% online</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-left">
                        <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm font-medium leading-tight">Especialista em PPP</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 text-left">
                        <ArrowRight className="h-4 w-4 text-accent shrink-0" />
                        <span className="text-sm font-medium leading-tight">Piso Salarial e Aposentadoria</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Internal Linking */}
        <section className="section-padding bg-muted/30 border-t border-border/50">
          <div className="container-custom">
            <InternalLinking
              title="Cidades Próximas em Destaque"
              links={getRelatedCities(city.slug, 9)}
              variant="cards"
            />
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CityPage;
