import { useMemo } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MapPin } from "lucide-react";
import citiesData from "@/data/cities.json";

const stateNames: Record<string, string> = {
  AC: "Acre", AL: "Alagoas", AM: "Amazonas", AP: "Amapá",
  BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo",
  GO: "Goiás", MA: "Maranhão", MG: "Minas Gerais", MS: "Mato Grosso do Sul",
  MT: "Mato Grosso", PA: "Pará", PB: "Paraíba", PE: "Pernambuco",
  PI: "Piauí", PR: "Paraná", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte",
  RO: "Rondônia", RR: "Roraima", RS: "Rio Grande do Sul", SC: "Santa Catarina",
  SE: "Sergipe", SP: "São Paulo", TO: "Tocantins"
};

const CidadesPage = () => {
  const byState = useMemo(() => {
    const grouped: Record<string, typeof citiesData> = {};
    for (const city of citiesData) {
      if (city.state.length !== 2) continue;
      if (!grouped[city.state]) grouped[city.state] = [];
      grouped[city.state].push(city);
    }
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, []);

  const totalCities = byState.reduce((sum, [, cities]) => sum + cities.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Aposentadoria Especial da Enfermagem - Todas as Cidades do Brasil"
        description={`Atendimento jurídico especializado para enfermeiros em ${totalCities} cidades brasileiras. Encontre orientação sobre aposentadoria especial da enfermagem na sua cidade.`}
        canonical="/cidades"
      />

      <Header />

      <main>
        <section className="pt-24 pb-12 md:pt-36 md:pb-16 bg-primary">
          <div className="container-custom text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 text-accent font-semibold text-xs uppercase tracking-wider mb-6">
              <MapPin className="h-4 w-4" />
              Atendimento Nacional
            </span>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
              Cidades Atendidas em Todo o Brasil
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Assessoria jurídica especializada em aposentadoria especial da enfermagem para <strong className="text-accent">{totalCities.toLocaleString('pt-BR')} cidades</strong> brasileiras.
            </p>
          </div>
        </section>

        <section className="section-padding">
          <div className="container-custom max-w-4xl">
            <Accordion type="multiple" className="w-full">
              {byState.map(([state, cities]) => (
                <AccordionItem key={state} value={state}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-accent">
                    <span className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {state}
                      </span>
                      <span>{stateNames[state] || state}</span>
                      <span className="text-sm font-normal text-muted-foreground">({cities.length} cidades)</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-2">
                      {cities.map(city => (
                        <Link
                          key={city.slug}
                          to={`/aposentadoria-especial-da-enfermagem-${city.slug}`}
                          className="text-sm text-foreground/70 hover:text-accent transition-colors py-1.5 px-3 rounded-lg hover:bg-accent/5"
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default CidadesPage;
