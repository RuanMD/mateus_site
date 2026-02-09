import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GoogleMap from "@/components/GoogleMap";
import { supabase } from "@/integrations/supabase/client";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    newsletter: false,
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "Consentimento necessário",
        description: "Por favor, aceite os termos para enviar sua mensagem.",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em até 24 horas úteis.",
      });
      setFormData({ name: "", email: "", phone: "", message: "", newsletter: false, consent: false });
    } catch (error) {
      console.error("Error sending contact form:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente ou entre em contato pelo WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="section-padding bg-background">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 px-2">
            <h1 className="heading-1 text-primary mb-3 sm:mb-4">
              Fale com o advogado
            </h1>
            <p className="text-lg sm:text-xl font-medium text-foreground/90 mb-4">
              Receba um diagnóstico jurídico inicial sobre a sua situação
            </p>
            <p className="body-default text-muted-foreground max-w-2xl mx-auto">
              Se você é profissional da Enfermagem e tem dúvidas sobre aposentadoria, piso, FGTS, acidente de trabalho, doenças ocupacionais ou outros direitos, preencha o formulário abaixo.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <Card className="border-2">
                <CardHeader className="pb-4 sm:pb-6">
                  <CardTitle className="text-lg sm:text-xl">Formulário de Contato</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Todas as informações são confidenciais e protegidas pelo sigilo profissional.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm">Nome completo *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Seu nome"
                          className="text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm">Telefone/WhatsApp *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="text-sm sm:text-base"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm">Descreva sua situação *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Conte-nos sobre sua situação jurídica..."
                        rows={5}
                        className="text-sm sm:text-base"
                      />
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, newsletter: checked as boolean })
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="newsletter" className="text-xs sm:text-sm font-normal leading-relaxed cursor-pointer">
                        Quero receber conteúdos educacionais sobre direitos da Enfermagem (opcional)
                      </Label>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, consent: checked as boolean })
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="consent" className="text-xs sm:text-sm font-normal leading-relaxed cursor-pointer">
                        Ao enviar seus dados, você concorda com nossa{" "}
                        <Link to="/politica-privacidade" className="text-accent hover:underline">
                          Política de Privacidade
                        </Link>{" "}
                        e com o uso das informações para contato e análise inicial da sua demanda jurídica. *
                      </Label>
                    </div>

                    <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-md">
                      O envio deste formulário não cria, por si só, vínculo contratual entre o usuário e o advogado.
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? "Enviando..." : "Enviar Solicitação"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <Card className="border-2">
                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl">Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm mb-1">WhatsApp</p>
                      <a
                        href="https://wa.me/5565981579393"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors"
                      >
                        (65) 98157-9393
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-xs sm:text-sm mb-1">E-mail</p>
                      <a
                        href="mailto:mateus@advogandoparaenfermagem.blog.br"
                        className="text-xs sm:text-sm text-muted-foreground hover:text-accent transition-colors break-all"
                      >
                        mateus@advogandoparaenfermagem.blog.br
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm mb-1">Endereço</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Av. Historiador Rubens de Mendonça, 2000
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Sala 1107 – Bosque da Saúde
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Cuiabá – MT, 78048-425
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-xs sm:text-sm mb-1">Horário de Atendimento</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Segunda a sexta, das 9h às 18h</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">(horário de Brasília)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-accent/5">
                <CardContent className="pt-4 sm:pt-6">
                  <p className="text-xs sm:text-sm text-foreground/80">
                    Buscamos responder às mensagens em até <strong>24 horas úteis</strong>. Casos urgentes recebem prioridade sempre que possível.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Google Maps Section */}
          <div className="mt-10 sm:mt-16">
            <Card className="border-2 overflow-hidden">
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-lg sm:text-2xl">Nossa Localização</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Av. Historiador Rubens de Mendonça, 2000 – Sala 1107 – Bosque da Saúde, Cuiabá – MT
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <GoogleMap 
                  address="Av. Historiador Rubens de Mendonça, 2000 - Sala 1107 - Bosque da Saude, Cuiabá - MT, 78048-425"
                  className="h-[300px] sm:h-[400px] md:h-[450px]"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
