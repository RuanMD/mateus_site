import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Quais são os requisitos da aposentadoria especial da Enfermagem?",
    answer: `Para profissionais que já trabalhavam antes da Reforma de 2019, os requisitos são:
• 25 anos de atividade especial comprovada (exposição habitual e permanente a agentes biológicos);
• 86 pontos (tempo de contribuição + idade).

Quem ingressou na atividade após 2019 segue as regras permanentes da Reforma, que incluem tempo especial e idade mínima.`,
  },
  {
    question: "Quem tem direito ao reconhecimento de tempo especial na Enfermagem?",
    answer: `Enfermeiras, técnicos e auxiliares que trabalham expostos a agentes biológicos, de forma habitual e permanente, têm direito ao reconhecimento de atividade especial. Esse tempo pode antecipar a aposentadoria ou aumentar o valor do benefício, conforme a regra aplicável.`,
  },
  {
    question: "O que é PPP e por que ele é essencial?",
    answer: `O PPP registra suas funções, setores e os riscos aos quais você esteve exposta.
Ele é obrigatório para:
• comprovar tempo especial;
• pedir aposentadoria especial;
• revisar benefícios;
• discutir insalubridade.

Sem PPP correto, você pode perder direitos previdenciários importantes.`,
  },
  {
    question: "Como funciona a conversão de tempo especial?",
    answer: `A conversão aumenta o tempo de contribuição utilizando um fator multiplicador.
Hoje ela é reconhecida pelo INSS apenas para períodos até 13/11/2019, mas o tema está sendo julgado pelo STF (ADI 6309), que pode alterar essa limitação.`,
  },
  {
    question: "Burnout dá direito a benefício e estabilidade?",
    answer: `Sim. O burnout é doença ocupacional reconhecida.
Após decisão recente do TST, não é mais necessário afastamento superior a 15 dias para caracterizar acidente de trabalho quando há nexo causal.

Quando confirmado, o burnout pode gerar:
• benefício acidentário;
• estabilidade de 12 meses;
• direitos trabalhistas e previdenciários decorrentes;
• ações indenizatórias, quando cabíveis.`,
  },
  {
    question: "Tenho dois vínculos: isso muda minha aposentadoria?",
    answer: `Sim. No INSS, as contribuições de cada vínculo são somadas, respeitando o teto.
Ter múltiplos vínculos pode:
• aumentar o valor da média;
• gerar risco de contribuição desnecessária;
• exigir planejamento para evitar perdas na aposentadoria.`,
  },
  {
    question: "Quando existe direito ao auxílio-doença acidentário?",
    answer: `Quando a incapacidade tem relação direta ou concausal com o trabalho (ex.: contaminação, LER/DORT, burnout, agressão, acidente típico).
Esse benefício garante:
• estabilidade de 12 meses após o retorno;
• manutenção de direitos trabalhistas;
• possibilidade de ações indenizatórias.`,
  },
  {
    question: "O que fazer quando o PPP vem errado?",
    answer: `Solicite a correção formalmente ao empregador.
Se houver negativa ou demora, é possível pedir retificação judicial, com apoio de laudos, prontuários, testemunhas e provas técnicas.
Um PPP corrigido é essencial para tempo especial e aposentadoria especial.`,
  },
  {
    question: "Como funciona a complementação federal do Piso da Enfermagem?",
    answer: `A complementação federal é repassada a estados, municípios e entidades filantrópicas que não conseguem pagar o piso integral.
O profissional não solicita diretamente — quem solicita é o ente público ou instituição.
Se o piso não está sendo pago, a cobrança é feita contra o empregador.`,
  },
  {
    question: "FGTS não depositado gera rescisão indireta?",
    answer: `Sim. O não recolhimento do FGTS é falta grave e pode gerar rescisão indireta, permitindo ao trabalhador sair da empresa com todos os direitos de uma demissão sem justa causa, inclusive multa de 40% e seguro-desemprego.`,
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="section-padding bg-muted/30">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Perguntas Frequentes sobre Direitos da Enfermagem
            </h1>
            <p className="text-base sm:text-lg text-foreground/90 mb-4">
              Respostas objetivas e atualizadas sobre aposentadoria especial, tempo de contribuição, PPP, piso salarial, doenças ocupacionais e direitos trabalhistas da Enfermagem.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="border-2 rounded-lg px-4 sm:px-6 bg-background"
              >
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <h2 className="font-semibold text-primary pr-4 text-sm sm:text-base md:text-lg">{faq.question}</h2>
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 pb-4 whitespace-pre-line text-sm sm:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Disclaimer */}
          <div className="mt-10 p-4 sm:p-6 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs sm:text-sm text-muted-foreground text-center">
              As respostas deste FAQ são de caráter informativo e não substituem uma consulta jurídica individual. Se você tiver uma situação específica, o ideal é buscar{" "}
              <Link to="/contato" className="text-accent hover:underline font-medium">
                orientação personalizada
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
