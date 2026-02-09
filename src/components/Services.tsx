import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DotPattern } from "@/components/ui/dot-pattern";
import { CalendarClock, ShieldCheck, FileCheck2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: CalendarClock,
    title: "Planejamento previdenciário para Enfermagem",
    description: "Análise completa da sua trajetória profissional, considerando vínculos, plantões, períodos especiais e afastamentos, para que você se aposente no melhor momento e com o melhor benefício possível.",
  },
  {
    icon: ShieldCheck,
    title: "Aposentadoria especial (INSS e RPPS)",
    description: "Reconhecimento do tempo especial de quem trabalha exposta a agentes biológicos, tanto no INSS quanto nos regimes próprios, com foco em reduzir tempo de contribuição e proteger o valor do benefício.",
  },
  {
    icon: FileCheck2,
    title: "PPP, LTCAT e documentos especiais",
    description: "Análise, correção e, quando necessário, ação judicial para retificar documentos que comprovam a insalubridade da sua atividade, evitando que erros prejudiquem sua aposentadoria especial.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function Services() {
  return (
    <section id="servicos" className="section-padding bg-background relative overflow-hidden">
      <DotPattern className="fill-primary/20" />
      <div className="container-custom relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-10 sm:mb-14 px-2"
        >
          <h2 className="heading-2 text-primary mb-5 sm:mb-6">
            Soluções jurídicas para cada etapa da sua carreira na Enfermagem
          </h2>
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
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full border-2 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 group bg-card/80 backdrop-blur-sm">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center mb-5 group-hover:from-accent/30 group-hover:to-primary/20 transition-all duration-300">
                      <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-accent" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl leading-snug text-foreground">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-5">
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0 mt-auto">
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full group/btn hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300"
                    >
                      <Link to="/servicos" className="flex items-center justify-center gap-2">
                        Ver detalhes do serviço
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View all services link */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10 sm:mt-12"
        >
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 group">
            <Link to="/servicos" className="flex items-center gap-2">
              Ver todos os serviços
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
