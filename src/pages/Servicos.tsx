import Header from "@/components/Header";
import ServicesPageContent from "@/components/ServicesPageContent";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, ServiceSchema } from "@/components/SchemaMarkup";

const Servicos = () => {
  return (
    <PageTransition>
      <SEO
        title="Serviços Jurídicos para Enfermagem | Aposentadoria, PPP, Piso Salarial"
        description="Serviços jurídicos especializados para profissionais da Enfermagem: aposentadoria especial, planejamento previdenciário, PPP/LTCAT, piso salarial, burnout, acidente de trabalho e mais."
        keywords="serviços advocacia enfermagem, aposentadoria especial enfermagem, PPP LTCAT enfermagem, piso salarial enfermagem, burnout enfermagem, acidente trabalho enfermagem, FGTS enfermagem, insalubridade enfermagem"
        canonical="/servicos"
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Serviços", url: "/servicos" }
        ]}
      />
      <ServiceSchema
        name="Serviços Jurídicos para Enfermagem"
        description="Aposentadoria especial, planejamento previdenciário, análise de PPP/LTCAT, piso salarial, burnout, acidente de trabalho, FGTS e mais para enfermeiros, técnicos e auxiliares."
        url="/servicos"
      />
      
      <div className="min-h-screen">
        <Header />
        <main className="pt-20">
          <ServicesPageContent />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default Servicos;
