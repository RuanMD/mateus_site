import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { 
  CalendarClock, 
  ShieldCheck, 
  FileCheck2, 
  HeartPulse, 
  Brain, 
  Stethoscope,
  Wallet,
  Scale,
  BadgeDollarSign,
  UserCheck,
  Building2,
  Users,
  Mic,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: ShieldCheck,
    title: "Aposentadoria especial (INSS e RPPS)",
    description: "A Enfermagem trabalha diariamente exposta a agentes biológicos (vírus, bactérias, fluidos), além de riscos físicos e emocionais. Isso pode garantir aposentadoria especial, com regras diferenciadas.",
    features: [
      "Reconhecimento de tempo especial no INSS e em regimes próprios (RPPS)",
      "Conversão de tempo especial em comum, quando juridicamente possível",
      "Elaboração de estratégia com base nas regras de transição e jurisprudência",
      "Atuação administrativa e judicial para garantir o direito à aposentadoria especial"
    ],
    cta: "Tenho dúvidas sobre aposentadoria especial"
  },
  {
    icon: FileCheck2,
    title: "Análise, correção e retificação de PPP e LTCAT",
    description: "O PPP e o LTCAT são documentos fundamentais para comprovar a insalubridade da atividade da Enfermagem.",
    details: "Quando o hospital ou a clínica se recusa a fornecer o PPP, entrega documento incompleto, reduz artificialmente o risco ou não reconhece o setor em que você realmente trabalhou, isso pode prejudicar diretamente a aposentadoria especial.",
    features: [
      "Análise técnica dos documentos",
      "Orientação para correção",
      "Ações judiciais para retificar o PPP"
    ],
    cta: "Quero revisar meu PPP/LTCAT"
  },
  {
    icon: CalendarClock,
    title: "Revisão de aposentadoria",
    description: "Se você já se aposentou, mas desconfia que o benefício foi calculado de forma errada, é possível analisar a viabilidade de revisão.",
    features: [
      "Tempo especial não reconhecido",
      "Vínculos não computados",
      "Erro na média de salários",
      "Desconsideração de períodos de contribuição",
      "Aplicação incorreta das regras de transição ou de cálculo"
    ],
    details: "Fazemos um estudo detalhado do seu histórico e da carta de concessão para identificar se há ou não espaço para revisão judicial ou administrativa.",
    cta: "Quero revisar minha aposentadoria"
  },
  {
    icon: HeartPulse,
    title: "Acidente de trabalho",
    description: "Acidentes durante o plantão, contaminações por material biológico, agressões, quedas e outras situações no ambiente hospitalar podem gerar direitos importantes.",
    features: [
      "Afastamento pelo INSS com benefício acidentário",
      "Estabilidade de 12 meses após o retorno",
      "Direito a indenização, em alguns casos",
      "Orientação sobre emissão da CAT",
      "Acompanhamento administrativo e judicial",
      "Estratégias para reconhecimento do nexo entre o acidente e o trabalho"
    ],
    cta: "Tive um acidente de trabalho"
  },
  {
    icon: Brain,
    title: "Doenças ocupacionais (incluindo burnout)",
    description: "Burnout, depressão, ansiedade, LER/DORT, lombalgias e outros problemas de saúde não surgem \"do nada\". Em muitos casos, estão diretamente ligados à rotina da Enfermagem.",
    features: [
      "Afastamento com benefício previdenciário adequado",
      "Estabilidade no emprego em determinadas situações",
      "Indenização por danos materiais e/ou morais",
      "Reconhecimento de doença ocupacional"
    ],
    details: "Atuamos para comprovar o nexo entre a doença e o trabalho e para buscar a proteção jurídica correspondente.",
    cta: "Quero orientação sobre doença ocupacional"
  },
  {
    icon: Stethoscope,
    title: "Auxílio-doença e auxílio-acidente",
    description: "Afastou-se por doença ou acidente e teve benefício negado ou cortado pelo INSS? Auxílio-doença e auxílio-acidente são fundamentais para garantir renda durante a recuperação e em casos de sequela permanente.",
    features: [
      "Orientação antes do pedido administrativo",
      "Análise de laudos e documentos médicos",
      "Recursos administrativos",
      "Ações judiciais quando necessário"
    ],
    cta: "Preciso de ajuda com benefício do INSS"
  },
  {
    icon: Wallet,
    title: "FGTS irregular e rescisão indireta",
    description: "Falta de depósito de FGTS, atrasos de salário, ausência de EPI, jornadas exaustivas, assédio e outras condutas graves podem justificar a rescisão indireta.",
    details: "Esse tipo de rescisão permite ao trabalhador sair do emprego com os mesmos direitos de uma demissão sem justa causa.",
    features: [
      "Saque do FGTS",
      "Multa de 40%",
      "Seguro-desemprego (quando cabível)",
      "Verbas rescisórias"
    ],
    cta: "Quero avaliar rescisão indireta"
  },
  {
    icon: Scale,
    title: "Insalubridade e direitos trabalhistas",
    description: "Plantões noturnos, exposição a agentes biológicos, jornadas superiores a 12 horas, ausência de intervalos e acúmulo de funções são realidades comuns na Enfermagem.",
    features: [
      "Adicional de insalubridade",
      "Adicional noturno",
      "Horas extras",
      "Intervalo intrajornada",
      "Diferenças salariais por desvio ou acúmulo de função"
    ],
    details: "Avaliamos sua realidade de trabalho e discutimos judicialmente os direitos não reconhecidos.",
    cta: "Quero entender meus direitos trabalhistas"
  },
  {
    icon: BadgeDollarSign,
    title: "Piso salarial da Enfermagem",
    description: "A Lei nº 14.434/2022 instituiu o piso nacional da Enfermagem, mas muitas instituições ainda têm dúvidas ou resistência na aplicação.",
    features: [
      "Orientação sobre quando o piso é devido",
      "Análise da situação de quem trabalha em entidades filantrópicas, privadas ou públicas",
      "Acompanhamento das portarias de complementação da União",
      "Ações para cobrança de diferenças quando cabível"
    ],
    cta: "Tenho dúvidas sobre o piso da Enfermagem"
  },
  {
    icon: UserCheck,
    title: "Acompanhamento jurídico individual",
    description: "Cada profissional da Enfermagem tem uma história: múltiplos vínculos, mudanças de setor, períodos de afastamento, adoecimento, dúvidas sobre piso, PPP e aposentadoria.",
    features: [
      "Análise do caso concreto",
      "Definição de estratégias",
      "Acompanhamento de processos administrativos e judiciais",
      "Explicação clara de cada etapa"
    ],
    cta: "Quero acompanhamento jurídico"
  },
  {
    icon: Building2,
    title: "Ações estratégicas para servidores públicos",
    description: "Servidoras e servidores da Enfermagem em municípios, estados e União enfrentam regras próprias (RPPS) e normas específicas.",
    features: [
      "Reconhecimento de tempo especial",
      "Revisão de proventos",
      "Enquadramento de adicionais",
      "Discussão de regras de transição pós-Reforma da Previdência",
      "Temas de aposentadoria, invalidez e pensão"
    ],
    cta: "Sou servidora(o) e tenho dúvidas"
  },
  {
    icon: Users,
    title: "Consultoria jurídica para sindicatos e entidades",
    description: "Sindicatos, associações e entidades representativas da Enfermagem precisam de suporte técnico especializado para defender direitos coletivos.",
    features: [
      "Pareceres técnicos",
      "Apoio em negociações coletivas",
      "Planejamento de ações coletivas",
      "Palestras e formação jurídica para a categoria"
    ],
    cta: "Sou sindicato/entidade e quero contato"
  },
  {
    icon: Mic,
    title: "Palestras, treinamentos e eventos",
    description: "Levamos orientação jurídica diretamente para equipes de Enfermagem, hospitais e clínicas, universidades e residências, sindicatos e eventos da categoria.",
    details: "Temas como aposentadoria especial, piso, FGTS, saúde mental, burnout e doenças ocupacionais são tratados de forma técnica, acessível e prática.",
    features: [],
    cta: "Quero levar palestra para minha equipe"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ServicesPageContent() {
  const whatsappNumber = "5565981579393";
  const getWhatsAppLink = (message: string) => {
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <DotPattern className="fill-primary/20" />
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-16 px-2"
        >
          <h1 className="heading-1 text-primary mb-6">
            Soluções jurídicas para cada etapa da sua carreira na Enfermagem
          </h1>
          <div className="space-y-4">
            <p className="body-large text-muted-foreground leading-relaxed">
              Atuamos exclusivamente com profissionais da Enfermagem — enfermeiras, técnicos e auxiliares — em todas as fases da vida profissional: início de carreira, meio de jornada e preparação para a aposentadoria.
            </p>
            <p className="body-default text-muted-foreground/80 leading-relaxed max-w-3xl mx-auto">
              Cada serviço é pensado para traduzir o juridiquês para a sua realidade: plantões noturnos, múltiplos vínculos, exposição a riscos, sobrecarga, burnout e desafios típicos de quem vive a rotina da Enfermagem.
            </p>
          </div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full border-2 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center shrink-0 group-hover:from-accent/30 group-hover:to-primary/20 transition-all duration-300">
                        <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-lg sm:text-xl leading-snug text-foreground mb-2">
                          {service.title}
                        </CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 pb-5 space-y-4">
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </CardDescription>
                    
                    {service.details && (
                      <p className="text-sm leading-relaxed text-muted-foreground/80">
                        {service.details}
                      </p>
                    )}
                    
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2 pt-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                  <CardFooter className="pt-0 mt-auto">
                    <Button 
                      asChild 
                      className="w-full group/btn bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300"
                    >
                      <a 
                        href={getWhatsAppLink(`Olá, Dr. Mateus! Vim através do site e gostaria de orientação sobre: ${service.title}`)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        {service.cta}
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
