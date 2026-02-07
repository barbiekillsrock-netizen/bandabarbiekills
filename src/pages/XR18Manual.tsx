import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const XR18Manual = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050505] via-[#0B0015] to-[#020005] text-foreground">
      <Helmet>
        <title>Manual Técnico XR18 - Barbie Kills</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Link to="/" className="inline-block mb-12">
          <img src="/logo-barbie-kills.png" alt="Barbie Kills" className="h-12 md:h-14" />
        </Link>

        <div className="max-w-4xl mx-auto">
          <h1 className="font-bebas text-4xl md:text-5xl lg:text-6xl text-white mb-2">
            MANUAL TÉCNICO DE CONEXÃO
          </h1>
          <p className="font-bebas text-2xl md:text-3xl neon-pink-text mb-8">BEHRINGER XR18</p>
          <p className="text-gray-400 font-oswald text-lg mb-12 border-l-2 border-neon-pink pl-4">
            Este guia detalha o procedimento de conexão e a arquitetura de rede configurada para máxima estabilidade durante as apresentações da Barbie Kills.
          </p>

          {/* Section 1 */}
          <Section number="1" title="CONEXÃO FÍSICA (CAMADA 1)">
            <InfoCard label="CONEXÃO OBRIGATÓRIA">
              Conecte um cabo de rede (RJ45) na porta <Code>REMOTE</Code> da XR18 e a outra extremidade em qualquer porta LAN do roteador Mercusys.
            </InfoCard>
            <InfoCard label="CHAVE FÍSICA NA MESA">
              A chave seletora deve estar posicionada em <Code>ETHERNET</Code> (totalmente para a esquerda).
            </InfoCard>
            <InfoCard label="VERIFICAÇÃO">
              Certifique-se de que os LEDs de rede na porta da mesa e do roteador estão piscando após a conexão.
            </InfoCard>
          </Section>

          {/* Section 2 */}
          <Section number="2" title="DADOS MESTRES DA REDE">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataField label="SSID (NOME DO WI-FI)" value="BARBIEKILLS_WIFI" />
              <DataField label="SENHA DO WI-FI" value="admin123" />
              <DataField label="IP DA MESA (MIXER)" value="192.168.1.150" />
              <DataField label="ROTEADOR (GATEWAY)" value="192.168.1.1" />
            </div>
          </Section>

          {/* Section 3 */}
          <Section number="3" title="DISPOSITIVOS COM VÍNCULO DE MAC (ESTÁVEIS)">
            <p className="text-gray-400 mb-4">
              Estes aparelhos têm "vaga reservada" (IP estático via roteador) para evitar conflitos e garantir reconexão prioritária:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DataField label="Tablet Samsung S6 Lite" value="192.168.1.101" />
              <DataField label="Notebook Dell Mari" value="192.168.1.102" />
              <DataField label="Notebook Samsung Renato" value="192.168.1.103" />
              <DataField label="XR18-BARBIEKILLS" value="192.168.1.150" />
            </div>
          </Section>

          {/* Section 4 */}
          <Section number="4" title="PASSO A PASSO PARA CONEXÃO (TABLET / NOVOS DISPOSITIVOS)">
            <StepList steps={[
              { label: "Wi-Fi", text: "Conecte na rede BARBIEKILLS_WIFI (Senha: admin123)." },
              { label: "Alerta de Internet", text: 'Se o Android/iOS avisar "Wi-Fi sem internet", selecione "Manter Conexão".' },
              { label: "Permissões (Crítico)", text: "No Android, o app X AIR precisa de permissão de Localização e Dispositivos Próximos. O GPS deve estar LIGADO." },
              { label: "Acesso Manual", text: "No App X AIR, não use o Search. No campo IP, digite: 192.168.1.150 e clique em Connect." },
            ]} />
          </Section>

          {/* Section 5 */}
          <Section number="5" title="PROCEDIMENTO DE EMERGÊNCIA (CONEXÃO VIA CABO DIRETO)">
            <p className="text-gray-400 mb-4">Caso precise ligar a XR18 diretamente ao Notebook sem o roteador:</p>
            <StepList steps={[
              { label: "Cabo Físico", text: "Conecte o cabo na porta REMOTE da mesa e na porta LAN do Notebook." },
              { label: "Configuração de IP no PC", text: "Pressione Windows + R, digite ncpa.cpl e aperte Enter." },
              { label: "Protocolo IP", text: "Clique com o botão direito em Ethernet > Propriedades > Protocolo IP Versão 4 (TCP/IPv4) > Propriedades." },
              { label: "Definir IP Manual", text: 'Selecione "Usar o seguinte endereço IP":' },
            ]} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-8 mt-4 mb-6">
              <DataField label="Endereço IP" value="192.168.1.10" />
              <DataField label="Máscara de sub-rede" value="255.255.255.0" />
            </div>
            <InfoCard label="Finalizar">
              Clique em OK. No app X-AIR-Edit, conecte no IP <Code>192.168.1.150</Code>.
            </InfoCard>
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 font-oswald font-bold">⚠️ IMPORTANTE</p>
              <p className="text-yellow-200/80 mt-1">Após o show, volte para "Obter endereço IP automaticamente".</p>
            </div>
          </Section>

          {/* Section 6 */}
          <Section number="6" title="DEBUG RÁPIDO NO PALCO">
            <InfoCard label="Dados Móveis">
              DESATIVE o 4G/5G para evitar que o aparelho tente buscar internet fora da rede da mesa.
            </InfoCard>
            <InfoCard label="Ciclo de Energia">
              Desligue tudo. Ligue o roteador primeiro (espere 60s) e depois a mesa.
            </InfoCard>
            <InfoCard label="Access Point">
              Se o roteador falhar, mude a chave da mesa para <Code>Access Point</Code> e use o Wi-Fi direto da XR18 no IP <Code>192.168.1.1</Code>.
            </InfoCard>
          </Section>
        </div>
      </div>
    </main>
  );
};

// Sub-components

const Section = ({ number, title, children }: { number: string; title: string; children: React.ReactNode }) => (
  <section className="mb-12">
    <div className="flex items-baseline gap-3 mb-6">
      <span className="font-bebas text-3xl neon-pink-text">{number}.</span>
      <h2 className="font-bebas text-2xl md:text-3xl text-white">{title}</h2>
    </div>
    <div className="space-y-4">{children}</div>
  </section>
);

const InfoCard = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-5">
    <p className="font-oswald text-neon-pink font-bold text-sm uppercase tracking-wider mb-2">{label}</p>
    <p className="text-gray-300">{children}</p>
  </div>
);

const DataField = ({ label, value }: { label: string; value: string }) => (
  <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-4">
    <p className="text-gray-500 text-xs uppercase tracking-wider font-oswald mb-1">{label}</p>
    <p className="font-mono text-neon-pink text-lg font-bold">{value}</p>
  </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-white/10 text-neon-pink px-2 py-0.5 rounded font-mono text-sm">{children}</code>
);

const StepList = ({ steps }: { steps: { label: string; text: string }[] }) => (
  <ol className="space-y-3">
    {steps.map((step, i) => (
      <li key={i} className="bg-white/5 backdrop-blur-md border border-white/10 shadow-xl rounded-lg p-5 flex gap-4">
        <span className="font-bebas text-2xl neon-pink-text flex-shrink-0">{i + 1}.</span>
        <div>
          <span className="font-oswald font-bold text-white">{step.label}: </span>
          <span className="text-gray-300">{step.text}</span>
        </div>
      </li>
    ))}
  </ol>
);

export default XR18Manual;
