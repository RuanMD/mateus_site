import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";

const ContatoPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Contato | Fale com o Advogado da Enfermagem"
        description="Entre em contato com o Advogando para Enfermagem. Receba um diagnóstico jurídico inicial sobre aposentadoria, PPP, piso salarial, burnout e direitos trabalhistas."
        keywords="contato advogado enfermagem, fale com advogado enfermagem, orientação jurídica enfermagem, WhatsApp advogado enfermagem, formulário contato enfermagem"
        canonical="/contato"
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Contato", url: "/contato" }
        ]}
      />
      
      <div className="min-h-screen">
        <Header />
        <main>
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default ContatoPage;
