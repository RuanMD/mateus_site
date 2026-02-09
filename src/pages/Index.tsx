import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PainPoints from "@/components/PainPoints";
import Services from "@/components/Services";
import SocialFeed from "@/components/SocialFeed";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { LocalBusinessSchema, WebsiteSchema, OrganizationSchema } from "@/components/SchemaMarkup";

const Index = () => {
  return (
    <PageTransition>
      <SEO
        title="Advogado Previdenciário e Trabalhista da Enfermagem | Atendimento Nacional"
        description="Advogado previdenciário e trabalhista exclusivo para enfermeiros, técnicos e auxiliares de enfermagem em todo o Brasil. Especialista em aposentadoria especial, PPP, LTCAT, piso salarial, burnout e direitos trabalhistas."
        keywords="advogado previdenciário enfermagem, advogado trabalhista enfermagem, aposentadoria especial enfermagem, PPP enfermagem, direitos enfermagem, piso salarial enfermagem, burnout enfermagem, LTCAT enfermagem, direitos trabalhistas enfermagem, advogado enfermeiro, advogado técnico enfermagem, insalubridade enfermagem"
        canonical="/"
      />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />
      
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <PainPoints />
          <Services />
          <SocialFeed />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default Index;
