import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";
import { BreadcrumbSchema, FAQSchema } from "@/components/SchemaMarkup";

const faqItems = [
  {
    question: "Quais são os requisitos da aposentadoria especial da Enfermagem?",
    answer: "Para profissionais que já trabalhavam antes da Reforma de 2019, os requisitos são: 25 anos de atividade especial comprovada e 86 pontos. Quem ingressou após 2019 segue as regras permanentes da Reforma.",
  },
  {
    question: "Quem tem direito ao reconhecimento de tempo especial na Enfermagem?",
    answer: "Enfermeiras, técnicos e auxiliares que trabalham expostos a agentes biológicos, de forma habitual e permanente, têm direito ao reconhecimento de atividade especial.",
  },
  {
    question: "O que é PPP e por que ele é essencial?",
    answer: "O PPP registra suas funções, setores e os riscos aos quais você esteve exposta. Ele é obrigatório para comprovar tempo especial, pedir aposentadoria especial e revisar benefícios.",
  },
  {
    question: "Como funciona a conversão de tempo especial?",
    answer: "A conversão aumenta o tempo de contribuição utilizando um fator multiplicador. Hoje ela é reconhecida pelo INSS apenas para períodos até 13/11/2019.",
  },
  {
    question: "Burnout dá direito a benefício e estabilidade?",
    answer: "Sim. O burnout é doença ocupacional reconhecida e pode gerar benefício acidentário, estabilidade de 12 meses e ações indenizatórias.",
  },
  {
    question: "Tenho dois vínculos: isso muda minha aposentadoria?",
    answer: "Sim. No INSS, as contribuições de cada vínculo são somadas, respeitando o teto. Múltiplos vínculos exigem planejamento para evitar perdas.",
  },
  {
    question: "Quando existe direito ao auxílio-doença acidentário?",
    answer: "Quando a incapacidade tem relação direta ou concausal com o trabalho. Esse benefício garante estabilidade de 12 meses após o retorno.",
  },
  {
    question: "O que fazer quando o PPP vem errado?",
    answer: "Solicite a correção formalmente ao empregador. Se houver negativa, é possível pedir retificação judicial com apoio de laudos e provas técnicas.",
  },
  {
    question: "Como funciona a complementação federal do Piso da Enfermagem?",
    answer: "A complementação federal é repassada a estados, municípios e entidades filantrópicas. Se o piso não está sendo pago, a cobrança é feita contra o empregador.",
  },
  {
    question: "FGTS não depositado gera rescisão indireta?",
    answer: "Sim. O não recolhimento do FGTS é falta grave e pode gerar rescisão indireta com todos os direitos de uma demissão sem justa causa.",
  },
];

const FAQPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Perguntas Frequentes sobre Direitos da Enfermagem (Aposentadoria, Piso, Insalubridade, Benefícios)"
        description="Respostas objetivas e atualizadas sobre aposentadoria especial, tempo de contribuição, PPP, piso salarial, doenças ocupacionais e direitos trabalhistas da Enfermagem."
        keywords="FAQ enfermagem, aposentadoria especial enfermagem, piso salarial enfermagem, PPP enfermagem, burnout enfermagem, direitos trabalhistas enfermagem, insalubridade enfermagem"
        canonical="/faq"
      />
      <BreadcrumbSchema
        items={[
          { name: "Início", url: "/" },
          { name: "Perguntas Frequentes", url: "/faq" }
        ]}
      />
      <FAQSchema items={faqItems} />
      
      <div className="min-h-screen">
        <Header />
        <main>
          <FAQ />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </PageTransition>
  );
};

export default FAQPage;
