import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

const QuemSomos = () => {
  return (
    <PageTransition>
      <SEO
        title="Quem Somos | Mateus Gonçalves - Advogado Especialista em Enfermagem"
        description="Conheça o Advogando para Enfermagem e Mateus Gonçalves, advogado especializado exclusivamente em direitos previdenciários e trabalhistas de enfermeiros, técnicos e auxiliares de enfermagem em todo o Brasil."
        keywords="advogado enfermagem, Mateus Gonçalves advogado, especialista direitos enfermagem, advogado previdenciário enfermagem, quem somos advogando enfermagem"
        canonical="/quem-somos"
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Quem Somos", url: "/quem-somos" }
        ]}
      />
      
      <div className="min-h-screen">
        <Header />
        <main>
          <About />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default QuemSomos;
