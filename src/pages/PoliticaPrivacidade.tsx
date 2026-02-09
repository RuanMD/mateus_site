import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export default function PoliticaPrivacidade() {
  return (
    <PageTransition>
      <Helmet>
        <title>Política de Privacidade | Advogando para Enfermagem</title>
        <meta
          name="description"
          content="Política de Privacidade do escritório Advogando para Enfermagem. Saiba como tratamos seus dados pessoais."
        />
      </Helmet>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-8">
              Política de Privacidade
            </h1>

            <p className="text-muted-foreground mb-8">
              Última atualização: 02 de dezembro de 2025
            </p>

            <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-foreground prose-p:leading-relaxed prose-li:text-foreground">
              <section className="mb-10">
                <h2>1. Introdução</h2>
                <p>
                  O escritório <strong>Advogando para Enfermagem</strong>, representado pelo Dr. Mateus Gonçalves, 
                  está comprometido em proteger a privacidade dos usuários deste site. Esta Política de Privacidade 
                  descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade 
                  com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
                </p>
              </section>

              <section className="mb-10">
                <h2>2. Dados Coletados</h2>
                <p>Podemos coletar os seguintes tipos de dados pessoais:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Dados de identificação:</strong> nome completo, e-mail e telefone, fornecidos 
                    voluntariamente através do formulário de contato.
                  </li>
                  <li>
                    <strong>Dados de navegação:</strong> informações técnicas como endereço IP, tipo de 
                    navegador, páginas visitadas e tempo de permanência, coletados automaticamente.
                  </li>
                  <li>
                    <strong>Dados de comunicação:</strong> mensagens enviadas através do formulário de 
                    contato ou WhatsApp.
                  </li>
                </ul>
              </section>

              <section className="mb-10">
                <h2>3. Finalidade do Tratamento</h2>
                <p>Utilizamos seus dados pessoais para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Responder às suas solicitações de contato e orientação jurídica;</li>
                  <li>Prestar serviços advocatícios quando contratados;</li>
                  <li>Enviar comunicações relevantes sobre direitos da enfermagem;</li>
                  <li>Melhorar a experiência de navegação no site;</li>
                  <li>Cumprir obrigações legais e regulatórias.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2>4. Base Legal</h2>
                <p>
                  O tratamento de dados pessoais é realizado com base nas seguintes hipóteses legais 
                  previstas na LGPD:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Consentimento do titular (Art. 7º, I);</li>
                  <li>Execução de contrato ou de procedimentos preliminares (Art. 7º, V);</li>
                  <li>Exercício regular de direitos em processo judicial (Art. 7º, VI);</li>
                  <li>Interesses legítimos do controlador (Art. 7º, IX).</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2>5. Compartilhamento de Dados</h2>
                <p>
                  Seus dados pessoais não serão vendidos, alugados ou compartilhados com terceiros para 
                  fins comerciais. O compartilhamento poderá ocorrer apenas nas seguintes situações:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Quando necessário para a prestação dos serviços advocatícios;</li>
                  <li>Para cumprimento de obrigação legal ou regulatória;</li>
                  <li>Por determinação judicial ou de autoridade competente;</li>
                  <li>Com prestadores de serviços essenciais (hospedagem, e-mail), sob contrato de confidencialidade.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2>6. Segurança dos Dados</h2>
                <p>
                  Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais 
                  contra acesso não autorizado, perda, alteração ou destruição, incluindo:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Criptografia SSL/TLS para transmissão de dados;</li>
                  <li>Controle de acesso restrito às informações;</li>
                  <li>Armazenamento seguro em servidores protegidos;</li>
                  <li>Monitoramento contínuo de vulnerabilidades.</li>
                </ul>
              </section>

              <section className="mb-10">
                <h2>7. Seus Direitos</h2>
                <p>
                  Em conformidade com a LGPD, você tem direito a:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Confirmar a existência de tratamento de seus dados;</li>
                  <li>Acessar seus dados pessoais;</li>
                  <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                  <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                  <li>Solicitar a portabilidade dos dados;</li>
                  <li>Revogar o consentimento a qualquer momento;</li>
                  <li>Obter informações sobre o compartilhamento de dados.</li>
                </ul>
                <p className="mt-4">
                  Para exercer seus direitos, entre em contato através do e-mail: 
                  <a href="mailto:mateus@advogandoparaenfermagem.blog.br" className="text-primary hover:underline ml-1">
                    mateus@advogandoparaenfermagem.blog.br
                  </a>
                </p>
              </section>

              <section className="mb-10">
                <h2>8. Cookies</h2>
                <p>
                  Este site pode utilizar cookies para melhorar a experiência de navegação. Cookies são 
                  pequenos arquivos armazenados em seu dispositivo que nos ajudam a entender como você 
                  interage com o site. Você pode configurar seu navegador para recusar cookies, mas isso 
                  pode afetar algumas funcionalidades.
                </p>
              </section>

              <section className="mb-10">
                <h2>9. Retenção de Dados</h2>
                <p>
                  Seus dados pessoais serão mantidos apenas pelo tempo necessário para cumprir as 
                  finalidades para as quais foram coletados, incluindo obrigações legais, contratuais, 
                  de prestação de contas ou requisição de autoridades competentes.
                </p>
              </section>

              <section className="mb-10">
                <h2>10. Alterações nesta Política</h2>
                <p>
                  Esta Política de Privacidade pode ser atualizada periodicamente. Recomendamos que você 
                  revise esta página regularmente para estar ciente de quaisquer alterações. As mudanças 
                  entram em vigor imediatamente após sua publicação no site.
                </p>
              </section>

              <section className="mb-10">
                <h2>11. Contato</h2>
                <p>
                  Para dúvidas, solicitações ou reclamações relacionadas a esta Política de Privacidade 
                  ou ao tratamento de seus dados pessoais, entre em contato:
                </p>
                <div className="bg-muted/50 p-6 rounded-lg mt-4">
                  <p className="font-semibold text-foreground mb-2">Advogando para Enfermagem</p>
                  <p className="text-muted-foreground">Dr. Mateus Gonçalves - OAB/MT</p>
                  <p className="text-muted-foreground mt-2">
                    E-mail: <a href="mailto:mateus@advogandoparaenfermagem.blog.br" className="text-primary hover:underline">
                      mateus@advogandoparaenfermagem.blog.br
                    </a>
                  </p>
                  <p className="text-muted-foreground">
                    WhatsApp: <a href="https://wa.me/5565981579393" className="text-primary hover:underline">
                      (65) 98157-9393
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
}
