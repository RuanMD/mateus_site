import { Button } from "@/components/ui/button";
import { Shield, Heart, Scale, Award, Target, Eye, Lightbulb, Users, Calendar, MapPin, Video, Building2, Hospital, Home, Briefcase, FileText, UserCheck, Stethoscope, Clock, AlertTriangle, DollarSign, Quote, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";
import mateusProfile from "@/assets/mateus-profile.jpg";
import AnimatedCounter from "@/components/AnimatedCounter";
import { StripedPattern } from "@/components/ui/striped-pattern";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { DotPattern } from "@/components/ui/dot-pattern";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  viewport: {
    once: true,
    margin: "-100px"
  },
  transition: {
    duration: 0.6
  }
};
const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1
    }
  },
  viewport: {
    once: true
  }
};
const staggerItem = {
  initial: {
    opacity: 0,
    y: 20
  },
  whileInView: {
    opacity: 1,
    y: 0
  },
  transition: {
    duration: 0.5
  }
};
export default function About() {
  return <>
      {/* Hero Section */}
      <section id="quem-somos" className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div className="space-y-4 sm:space-y-6 order-2 lg:order-1" {...fadeInUp}>
              <div className="inline-block">
                <span className="text-accent font-semibold text-xs sm:text-sm uppercase tracking-wider">
                  Quem Somos
                </span>
              </div>
              
              <h1 className="heading-1 text-primary">
                Advogando para Enfermagem
              </h1>
              
              <div className="prose prose-sm sm:prose-lg max-w-none text-foreground/80 space-y-3 sm:space-y-4">
                <p className="text-base sm:text-xl font-medium text-primary">
                  O Advogando para Enfermagem nasceu com um propósito claro: proteger juridicamente quem protege o Brasil todos os dias.
                </p>
                
                <p className="text-sm sm:text-base">
                  <strong>Advogando para Enfermagem</strong> é o site institucional do advogado <strong>Mateus Gonçalves</strong>, referência nacional em direitos previdenciários e trabalhistas da Enfermagem brasileira.
                </p>
                
                <p className="text-sm sm:text-base">
                  Sou advogado há anos dedicado exclusivamente à defesa de enfermeiras, técnicos e auxiliares de Enfermagem, tanto do setor público quanto do privado, em todo o território nacional.
                </p>
                
                <p className="text-sm sm:text-base">
                  Este site nasce para organizar em um só lugar tudo o que já construímos nas redes sociais, nos atendimentos, nas palestras e nos projetos com a categoria.
                </p>
              </div>

              <div className="pt-2 sm:pt-4">
                <Button asChild size="lg" variant="default" className="w-full sm:w-auto group">
                  <a href="https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20sobre%20direitos%20da%20Enfermagem." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Agendar Orientação Especializada
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div className="relative order-1 lg:order-2" initial={{
            opacity: 0,
            scale: 0.95
          }} whileInView={{
            opacity: 1,
            scale: 1
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <div className="aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border-4 border-accent/20 max-w-sm mx-auto lg:max-w-none shadow-2xl">
                <img src={mateusProfile} alt="Mateus Gonçalves - Advogado especializado em Enfermagem" className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 lg:w-48 lg:h-48 bg-accent/10 rounded-2xl -z-10"></div>
              <div className="hidden sm:block absolute -top-4 -left-4 w-20 h-20 lg:w-32 lg:h-32 bg-primary/10 rounded-full -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Um Movimento Section */}
      <section className="section-padding bg-muted/30 relative overflow-hidden">
        <StripedPattern className="[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center space-y-4 sm:space-y-6 px-2 mb-10 sm:mb-12" {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                Nossa Essência
              </span>
              <h2 className="heading-2 text-primary">
                Mais do que um escritório tradicional
              </h2>
              <p className="text-lg sm:text-xl text-foreground/80 max-w-3xl mx-auto">
                O Advogando para Enfermagem não é apenas um escritório: é um <strong className="text-accent">movimento focado em uma única categoria</strong>.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Realidade da Enfermagem */}
              <motion.div className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50 shadow-lg" initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">
                    100% voltado para quem está na ponta do cuidado
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {[{
                  icon: Clock,
                  text: "Jornadas exaustivas e múltiplos vínculos"
                }, {
                  icon: AlertTriangle,
                  text: "Exposição diária a agentes biológicos e situações de risco"
                }, {
                  icon: Heart,
                  text: "Adoecimento físico e emocional"
                }, {
                  icon: FileText,
                  text: "Dificuldades com INSS, RPPS, PPP, piso salarial, FGTS, estabilidade, acidente de trabalho e aposentadoria especial"
                }].map((item, index) => <motion.div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10" initial={{
                  opacity: 0,
                  y: 10
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}>
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-sm sm:text-base text-foreground/80">{item.text}</span>
                    </motion.div>)}
                </div>
              </motion.div>

              {/* Especialização */}
              <motion.div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 sm:p-8 text-primary-foreground relative overflow-hidden" initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Scale className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold">
                      Por que a especialização?
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base opacity-90 leading-relaxed">
                      Em vez de tentar atender todas as áreas do Direito, escolhi <strong>aprofundar ao máximo</strong> em previdenciário e trabalhista aplicados à Enfermagem.
                    </p>
                    
                    <div className="h-px bg-primary-foreground/20"></div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lightbulb className="h-4 w-4 text-accent" />
                      </div>
                      <p className="text-sm sm:text-base opacity-90">
                        Oferecemos <strong>orientação técnica</strong> aliada à <strong>compreensão da rotina real dos plantões</strong>.
                      </p>
                    </div>
                    
                    <div className="mt-6 p-4 rounded-xl bg-primary-foreground/10 border border-primary-foreground/20">
                      <p className="text-sm font-medium text-center">
                        "Quem entende sua realidade, defende melhor seus direitos."
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* História Pessoal - IMPROVED */}
      <section className="section-padding bg-background relative overflow-hidden">
        <DotPattern className="fill-accent/5 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center space-y-3 sm:space-y-4 px-2 mb-10 sm:mb-16" {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <Heart className="h-4 w-4" />
                A Jornada
              </span>
              <h2 className="heading-2 text-primary">
                Minha História
              </h2>
              <p className="body-large text-muted-foreground max-w-2xl mx-auto">
                E antes de qualquer título, sou alguém que decidiu dedicar a carreira inteira a uma única categoria não por acaso, mas por convicção.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Timeline */}
              <motion.div className="space-y-6" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{
              once: true
            }}>
                <motion.div className="relative pl-8 pb-8 border-l-2 border-accent/30" variants={staggerItem}>
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                  <div className="bg-card rounded-xl p-5 shadow-lg border border-border/50">
                    <h3 className="font-semibold text-primary mb-2">O Despertar</h3>
                    <p className="text-sm sm:text-base text-foreground/80">
                      A cada hospital que visitei, a cada evento que participei, a cada atendimento que realizei, eu testemunhei a mesma realidade: profissionais sobrecarregados, esquecidos, exaustos… e desamparados juridicamente.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="relative pl-8 pb-8 border-l-2 border-accent/30" variants={staggerItem}>
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent"></div>
                  <div className="bg-card rounded-xl p-5 shadow-lg border border-border/50">
                    <h3 className="font-semibold text-primary mb-2">A Realidade</h3>
                    <p className="text-sm sm:text-base text-foreground/80">
                      Enfermeiras, técnicos e auxiliares que cuidam de vidas, mas que raramente recebem o cuidado profissional que merecem. Gente que trabalha em dois ou três vínculos, encara plantões intermináveis, adoece em silêncio.
                    </p>
                  </div>
                </motion.div>

                <motion.div className="relative pl-8" variants={staggerItem}>
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                  <div className="bg-card rounded-xl p-5 shadow-lg border border-border/50">
                    <h3 className="font-semibold text-primary mb-2">A Decisão</h3>
                    <p className="text-sm sm:text-base text-foreground/80">
                      Foi diante dessa injustiça diária que entendi que não poderia ser mais um advogado generalista. A Enfermagem precisava e continua precisando de um especialista.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Quote Card */}
              <motion.div className="lg:sticky lg:top-32" initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.3
            }}>
                <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 sm:p-10 text-primary-foreground relative overflow-hidden">
                  <Quote className="absolute top-4 left-4 h-12 w-12 opacity-20" />
                  <Quote className="absolute bottom-4 right-4 h-12 w-12 opacity-20 rotate-180" />
                  
                  <div className="relative z-10 space-y-6">
                    <p className="text-lg sm:text-xl font-medium leading-relaxed">
                      "Foi diante dessa injustiça diária que entendi que não poderia ser mais um advogado generalista."
                    </p>
                    <div className="h-px bg-primary-foreground/30"></div>
                    <div>
                      <p className="font-semibold">Mateus Gonçalves</p>
                      <p className="text-sm opacity-80">Advogado Especialista em Enfermagem</p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <p className="text-sm opacity-90">
                      A Enfermagem precisava e continua precisando de um especialista. Um defensor. Uma voz técnica, forte e constante.
                    </p>
                    <p className="text-sm font-medium">
                      Assim nasceu o <strong>Advogando para Enfermagem</strong>. Primeiro como um projeto digital. Depois como um movimento. E hoje como uma das maiores plataformas jurídicas dedicadas à categoria no Brasil.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Alcance e Atuação */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <AnimatedGridPattern numSquares={30} maxOpacity={0.1} duration={3} repeatDelay={1} className={cn("[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 stroke-primary-foreground/20")} />
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-10 sm:mb-12 px-2" {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                <MapPin className="h-4 w-4" />
                Presença Nacional
              </span>
              <h2 className="heading-2 mb-3 sm:mb-4">
                Atuação nacional focada na Enfermagem
              </h2>
              <p className="body-large opacity-90 max-w-3xl mx-auto">
                Atendo profissionais da Enfermagem em todo o Brasil, de diferentes realidades
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Setores Atendidos */}
              <motion.div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary-foreground/10" initial={{
              opacity: 0,
              x: -30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6
            }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold">
                    Onde atuamos
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {[{
                  icon: Hospital,
                  text: "Hospitais públicos e privados"
                }, {
                  icon: Home,
                  text: "Unidades básicas de saúde, UPAs e pronto-atendimentos"
                }, {
                  icon: Users,
                  text: "Estratégia Saúde da Família (ESF/PSF)"
                }, {
                  icon: Stethoscope,
                  text: "UTI, emergência, centro cirúrgico, CME, maternidades"
                }, {
                  icon: Home,
                  text: "Home care, clínicas, instituições de longa permanência"
                }, {
                  icon: Building2,
                  text: "Servidoras e servidores municipais, estaduais e federais"
                }, {
                  icon: UserCheck,
                  text: "Residentes em Enfermagem"
                }, {
                  icon: Heart,
                  text: "Profissionais afastados ou adoecidos"
                }].map((item, index) => <motion.div key={index} className="flex items-start gap-3 p-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10" initial={{
                  opacity: 0,
                  x: -10
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: index * 0.05
                }}>
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <item.icon className="h-4 w-4 text-accent" />
                      </div>
                      <span className="text-sm sm:text-base opacity-90">{item.text}</span>
                    </motion.div>)}
                </div>
              </motion.div>

              {/* Foco e Trajetória */}
              <motion.div className="space-y-6" initial={{
              opacity: 0,
              x: 30
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }}>
                {/* Card Principal */}
                <div className="bg-accent/20 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-accent/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/30 flex items-center justify-center">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold">Nosso foco</h3>
                  </div>
                  <p className="text-sm sm:text-base opacity-90 leading-relaxed">
                    Em todos os casos, o foco é o mesmo: <strong className="text-accent">proteger direitos</strong>, <strong className="text-accent">planejar o futuro</strong> e <strong className="text-accent">evitar que a Enfermagem seja invisibilizada juridicamente</strong>.
                  </p>
                </div>

                {/* Card Trajetória */}
                <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-primary-foreground/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                      <Award className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold">Trajetória</h3>
                  </div>
                  <p className="text-sm sm:text-base opacity-90 leading-relaxed mb-4">
                    Ao longo da trajetória, já orientei <strong>centenas de profissionais</strong>, participei de diversos eventos, palestras e lives.
                  </p>
                  <div className="h-px bg-primary-foreground/20 mb-4"></div>
                  <p className="text-sm opacity-80 leading-relaxed">
                    Venho atuando como <strong>voz jurídica</strong> em debates nacionais sobre aposentadoria especial, piso salarial e saúde mental da Enfermagem.
                  </p>
                </div>

                {/* Indicadores Discretos */}
                <div className="grid grid-cols-3 gap-3">
                  {[{
                  icon: MapPin,
                  label: "27 estados"
                }, {
                  icon: Video,
                  label: "Palestras e lives"
                }, {
                  icon: Users,
                  label: "Centenas orientados"
                }].map((item, index) => <motion.div key={index} className="bg-primary-foreground/5 rounded-xl p-4 text-center border border-primary-foreground/10" initial={{
                  opacity: 0,
                  y: 10
                }} whileInView={{
                  opacity: 1,
                  y: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: 0.3 + index * 0.1
                }}>
                      <item.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                      <p className="text-xs sm:text-sm font-medium opacity-90">{item.label}</p>
                    </motion.div>)}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* Por que a Enfermagem - REDESIGNED */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        <StripedPattern className="stroke-accent/5 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-10 sm:mb-14" {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Heart className="h-4 w-4" />
                A Escolha
              </span>
              <h2 className="heading-2 text-primary px-2">
                Por que escolhi a Enfermagem?
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
              {/* Main Quote - Takes 3 columns */}
              <motion.div 
                className="lg:col-span-3 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl sm:rounded-3xl p-8 sm:p-10 text-primary-foreground relative overflow-hidden"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/5 rounded-full blur-2xl"></div>
                <Quote className="absolute top-6 right-6 h-16 w-16 opacity-10" />
                
                <div className="relative z-10 space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
                    <Heart className="h-7 w-7 text-accent" />
                  </div>
                  
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    Porque foi a Enfermagem que escolheu primeiro.
                  </p>
                  
                  <div className="h-px bg-primary-foreground/20"></div>
                  
                  <p className="text-base sm:text-lg opacity-90 leading-relaxed">
                    Cada mensagem, cada história, cada relato de dor e de superação me mostrou que a categoria sempre esteve <strong>sozinha juridicamente</strong>.
                  </p>
                  
                  <div className="pt-4">
                    <div className="bg-primary-foreground/10 rounded-xl p-4 sm:p-5 border border-primary-foreground/20">
                      <p className="text-lg sm:text-xl font-semibold text-accent">
                        Eu acredito profundamente que defender a Enfermagem é defender o Brasil.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Rights Cards - Takes 2 columns */}
              <motion.div 
                className="lg:col-span-2 space-y-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                <div className="text-center lg:text-left mb-4">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">Ninguém deveria...</p>
                </div>
                
                {[
                  { icon: AlertTriangle, text: "Enfrentar um acidente de trabalho sem orientação", color: "bg-destructive/10 text-destructive" },
                  { icon: Heart, text: "Adoecer por burnout sem ser reconhecido", color: "bg-accent/10 text-accent" },
                  { icon: Shield, text: "Trabalhar em insalubridade sem proteção", color: "bg-primary/10 text-primary" },
                  { icon: Calendar, text: "Envelhecer com medo de não conseguir se aposentar com dignidade", color: "bg-secondary/10 text-secondary" }
                ].map((item, index) => (
                  <motion.div 
                    key={index} 
                    className="group bg-card rounded-xl p-4 sm:p-5 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300"
                    variants={staggerItem}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", item.color)}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <p className="text-sm sm:text-base text-foreground/80 font-medium pt-2">
                        {item.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Propósito, Missão, Visão e Valores */}
      <section className="section-padding bg-background relative overflow-hidden">
        <DotPattern className="fill-accent/5 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center mb-10 sm:mb-14" {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Target className="h-4 w-4" />
                Nosso DNA
              </span>
              <h2 className="heading-2 text-primary px-2">
                Propósito, missão, visão e valores
              </h2>
            </motion.div>

            {/* Propósito em Destaque */}
            <motion.div 
              className="bg-gradient-to-br from-primary to-secondary rounded-2xl sm:rounded-3xl p-8 sm:p-12 text-primary-foreground text-center mb-10 sm:mb-14 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-4 opacity-90">Nosso Propósito</h3>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold max-w-3xl mx-auto leading-relaxed">
                  Defender juridicamente a Enfermagem, garantindo que quem cuida de todos não fique desamparado quando mais precisa.
                </p>
              </div>
            </motion.div>

            {/* Missão e Visão */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14">
              {/* Missão */}
              <motion.div 
                className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center">
                    <Target className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">Nossa Missão</h3>
                </div>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Garantir que cada profissional da Enfermagem tenha acesso à <strong className="text-primary">orientação jurídica correta</strong>, <strong className="text-primary">defesa especializada</strong> e <strong className="text-primary">planejamento de futuro</strong>, de forma ética, acessível e humanizada.
                </p>
              </motion.div>

              {/* Visão */}
              <motion.div 
                className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <Eye className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">Nossa Visão</h3>
                </div>
                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                  Construir a <strong className="text-primary">maior plataforma jurídica da América Latina</strong> dedicada exclusivamente à Enfermagem, sendo referência em conteúdo, atendimento e defesa dos direitos da categoria.
                </p>
              </motion.div>
            </div>

            {/* Valores */}
            <motion.div 
              className="bg-muted/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8 sm:mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-primary">Nossos Valores</h3>
              </div>
              
              <motion.div 
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
              >
                {[
                  { icon: Scale, text: "Ética absoluta e respeito às normas da OAB" },
                  { icon: Award, text: "Profundidade técnica em previdenciário e trabalhista" },
                  { icon: Heart, text: "Humanização no atendimento" },
                  { icon: Users, text: "Linguagem clara, sem juridiquês desnecessário" },
                  { icon: Shield, text: "Responsabilidade social com a saúde coletiva" },
                  { icon: Target, text: "Defesa firme e combativa dentro dos limites da lei" },
                  { icon: Lightbulb, text: "Educação jurídica acessível para toda a categoria", fullWidth: true }
                ].map((value, index) => (
                  <motion.div 
                    key={index} 
                    className={cn(
                      "flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-card border border-border/50 hover:border-accent/30 hover:shadow-md transition-all duration-300",
                      value.fullWidth && "lg:col-span-3 lg:max-w-md lg:mx-auto"
                    )}
                    variants={staggerItem}
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-sm sm:text-base text-foreground/80 font-medium pt-2">{value.text}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pilares - IMPROVED */}
      <section className="section-padding bg-muted/30 relative overflow-hidden">
        <StripedPattern className="stroke-accent/5 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]" />
        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div className="text-center mb-10 sm:mb-14" {...fadeInUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                <Shield className="h-4 w-4" />
                Fundamentos
              </span>
              <h2 className="heading-2 text-primary px-2">
                Nossos Pilares
              </h2>
            </motion.div>
            
            <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{
            once: true
          }}>
              {[{
              icon: Shield,
              title: "Especialização Total",
              desc: "100% focado em Enfermagem",
              color: "accent"
            }, {
              icon: Heart,
              title: "Compromisso Real",
              desc: "Defesa dos seus direitos",
              color: "primary"
            }, {
              icon: Scale,
              title: "Atuação Ética",
              desc: "Transparência total",
              color: "secondary"
            }, {
              icon: Award,
              title: "Excelência Técnica",
              desc: "Conhecimento profundo",
              color: "accent"
            }].map((pillar, index) => <motion.div key={index} className="group bg-card rounded-2xl p-6 sm:p-8 text-center space-y-4 border border-border hover:border-accent/30 hover:shadow-xl transition-all duration-300" variants={staggerItem}>
                  <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-110", pillar.color === "accent" ? "bg-accent/10" : pillar.color === "primary" ? "bg-primary/10" : "bg-secondary/10")}>
                    <pillar.icon className={cn("h-7 w-7 sm:h-8 sm:w-8", pillar.color === "accent" ? "text-accent" : pillar.color === "primary" ? "text-primary" : "text-secondary")} />
                  </div>
                  <h3 className="font-bold text-base sm:text-lg text-primary">{pillar.title}</h3>
                  <p className="text-sm text-muted-foreground">{pillar.desc}</p>
                </motion.div>)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manifesto - IMPROVED */}
      <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
        <AnimatedGridPattern numSquares={40} maxOpacity={0.08} duration={4} repeatDelay={1} className={cn("[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 stroke-primary-foreground/10")} />
        <div className="container-custom relative z-10">
          <motion.div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10 px-2" initial={{
          opacity: 0
        }} whileInView={{
          opacity: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
                <Sparkles className="h-4 w-4" />
                Nosso Propósito
              </span>
              <h2 className="heading-2">
                Manifesto: Por que existimos
              </h2>
            </div>
            
            <motion.div className="space-y-4 sm:space-y-6" variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{
            once: true
          }}>
              {["Existimos para que uma técnica de Enfermagem que trabalha 12 horas em pé saiba que tem direito a se aposentar antes.", "Existimos para que uma enfermeira com burnout saiba que não está sozinha.", "Existimos para que quem sofreu um acidente de trabalho não precise ouvir 'isso é normal'.", "Existimos para que quem perdeu anos de contribuição não seja enganado.", "Existimos para que o sistema pare de tratar como invisível a categoria que nunca deixa ninguém sem cuidado."].map((text, index) => <motion.p key={index} className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed" variants={staggerItem}>
                  {text}
                </motion.p>)}
            </motion.div>
            
            <motion.div className="pt-6 sm:pt-10 space-y-4 sm:space-y-6" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.5
          }}>
              <div className="bg-primary-foreground/10 rounded-2xl p-6 sm:p-8 border border-primary-foreground/10">
                <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  Existimos porque ninguém cuida de quem cuida — mas isso está mudando.
                </p>
                <p className="text-sm sm:text-lg opacity-90">
                  A Justiça começa onde a informação se torna acessível. E a Enfermagem começa a ser protegida quando entende que tem direitos, voz, história e valor.
                </p>
              </div>
              
              <p className="text-lg sm:text-xl font-semibold">
                O Advogando para Enfermagem é parte dessa virada histórica.
              </p>
            </motion.div>

            <motion.div className="pt-4 sm:pt-8" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6,
            delay: 0.7
          }}>
              <Button asChild size="lg" variant="secondary" className="bg-background text-primary hover:bg-background/90 w-full sm:w-auto group">
                <a href="https://wa.me/5565981579393?text=Ol%C3%A1%2C%20Dr.%20Mateus!%20Vim%20atrav%C3%A9s%20do%20site%20e%20gostaria%20de%20receber%20orienta%C3%A7%C3%A3o%20jur%C3%ADdica%20sobre%20direitos%20da%20Enfermagem." target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Faça Parte Dessa Mudança
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>;
}