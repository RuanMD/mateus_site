import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FileQuestion, AlertCircle, BriefcaseBusiness, DollarSign, Folder, TrendingUp, Info } from "lucide-react";
import { motion } from "framer-motion";

const painPoints = [
  {
    icon: FileQuestion,
    title: "Dúvidas sobre aposentadoria",
    description: "Insegurança sobre tempo de contribuição, regras de aposentadoria especial, pontos e melhor momento para se aposentar pelo INSS ou pelo regime próprio (RPPS).",
  },
  {
    icon: AlertCircle,
    title: "Acidente de trabalho ou contaminação",
    description: "Dúvidas sobre estabilidade, CAT, auxílio-doença, auxílio-acidente, indenização e direitos após acidente ou exposição a material biológico.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Múltiplos vínculos e plantões",
    description: "Trabalha em dois ou mais vínculos, acumula plantões e não sabe como isso impacta sua aposentadoria, INSS, RPPS ou Imposto de Renda.",
  },
  {
    icon: DollarSign,
    title: "Piso salarial da Enfermagem",
    description: "Não recebe o piso nacional, não sabe se sua instituição recebe complementação da União ou tem dúvidas sobre o retroativo e 13º do piso.",
  },
  {
    icon: Folder,
    title: "FGTS, rescisão e direitos trabalhistas",
    description: "FGTS atrasado ou não depositado, salário em atraso, ausência de EPI, assédio ou sobrecarga que podem justificar rescisão indireta.",
  },
  {
    icon: TrendingUp,
    title: "Planejamento previdenciário estratégico",
    description: "Quer organizar sua carreira, entender o melhor momento para se aposentar e evitar perder dinheiro por falta de planejamento.",
  },
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function PainPoints() {
  return (
    <section id="situacoes" className="section-padding bg-muted/30">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-14"
        >
          <h2 className="heading-2 text-primary mb-4 sm:mb-5 px-2">
            Você se identifica com alguma dessas situações?
          </h2>
          <p className="body-large text-muted-foreground px-2 leading-relaxed">
            Cada uma dessas situações tem caminhos jurídicos específicos. Entender seus direitos é o primeiro passo para não ser prejudicada.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {painPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="h-full border-2 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:from-accent/30 group-hover:to-accent/20 transition-all duration-300">
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-accent" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl leading-snug">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <CardDescription className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                      {point.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button asChild variant="outline" size="sm" className="w-full text-sm hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300">
                      <Link to="/servicos">Conheça a Solução</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Disclaimer footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12"
        >
        <div className="flex items-center justify-center gap-2 text-center mx-auto px-4">
            <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
              As informações acima são de caráter educativo e não substituem uma orientação jurídica individual.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
