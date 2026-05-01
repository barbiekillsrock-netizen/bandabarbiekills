export interface CidadeData {
  cidade: string;
  slug: string;
  foco: string;
  hook: string;
  venues: string;
  h1Custom?: string;
  autoridade: string;
  logistica: string;
  seoIntro: string;
  seoComplemento: string;
  faq: {
    p1: string;
    r1: string;
    p2: string;
    r2: string;
    p3: string;
    r3: string;
  };
}

export const cidadesData: CidadeData[] = [
  {
    cidade: "Campinas",
    slug: "banda-casamento-campinas",
    foco: "Híbrido",
    hook: "Centro logístico e expertise em grandes produções de alto padrão.",
    venues: "Alma Campinas, Casa de Campo, The Royal Palm Plaza.",
    autoridade:
      "A Barbie Kills tem sede em Campinas e isso faz toda a diferença. Com mais de 14 anos de estrada, a vocalista Mariana Chaib e o grupo conhecem como ninguém os espaços, os cerimonialistas e o mercado de eventos da cidade. De casamentos no Royal Palm Plaza a convenções corporativas para Honda e Ambev, cada show em Campinas é tratado com o cuidado de quem está em casa.",
    logistica:
      "Por estar sediada em Campinas, a banda chega com pontualidade e sem custos extras de deslocamento. Já tocamos no Alma Campinas, Casa de Campo, The Royal Palm Plaza e em dezenas de centros de eventos corporativos da cidade. Você não precisa se preocupar com nada técnico: a gente resolve tudo com a agilidade de quem opera daqui.",
    seoIntro:
      "Se você está planejando um casamento ou evento corporativo em Campinas, a Barbie Kills é a banda que une história local, estrutura própria e um repertório construído para deixar qualquer pista cheia. Para casamentos de luxo ou convenções de grandes empresas, somos daqui e colocamos isso em cada show.",
    seoComplemento:
      "Do coquetel mais intimista à confraternização de final de ano mais animada, adaptamos nosso repertório de Pop, Rock, MPB e Samba Rock para o seu público. Fale com a nossa produção e veja como transformar o seu evento em algo que as pessoas vão lembrar.",
    faq: {
      p1: "A Barbie Kills é uma banda de Campinas mesmo?",
      r1: "Sim! Temos sede em Campinas e é aqui que a maioria dos nossos shows acontece. Isso significa que você conta com uma banda que conhece de verdade os espaços da cidade, tem relacionamento com os melhores cerimonialistas e chega sem complicações de deslocamento, seja para um casamento ou para um grande evento corporativo.",
      p2: "A banda atende eventos corporativos em Campinas além de casamentos?",
      r2: "Atende com muito prazer! Temos ampla experiência em convenções, premiações e confraternizações corporativas em Campinas. Empresas como Honda e Ambev já confiaram na Barbie Kills para seus eventos, e adoramos transformar uma noite corporativa em algo que as pessoas realmente levam na memória. Também oferecemos painel de LED próprio para exibição de marcas durante a performance.",
      p3: "Quais espaços de Campinas a banda já tocou?",
      r3: "Já nos apresentamos em dezenas de espaços em Campinas, incluindo Alma Campinas, Casa de Campo e The Royal Palm Plaza para casamentos, e em centros de convenções e espaços corporativos de toda a cidade. Conhecer o ambiente nos permite planejar som e iluminação com muito mais cuidado e precisão.",
    },
  },
  {
    cidade: "São Paulo",
    slug: "evento-corporativo-sao-paulo",
    foco: "Híbrido",
    hook: "O epicentro dos grandes eventos e casamentos de luxo do país.",
    venues: "Casa Fasano, Villa Jockey, Buffet França.",
    autoridade:
      "São Paulo é o palco dos eventos mais exigentes do Brasil, e a Barbie Kills está mais do que pronta para ele. Com mais de 14 anos de experiência e uma vocalista revelada pela Rede Globo, a banda já se apresentou em alguns dos espaços mais sofisticados da capital, de casamentos de luxo a grandes convenções corporativas. Cada show em São Paulo é tratado com a seriedade e o capricho que a cidade exige.",
    logistica:
      "Atendemos São Paulo com infraestrutura técnica própria e completa: PA profissional, iluminação cênica e equipe dedicada. Conhecemos espaços como Casa Fasano, Villa Jockey e Buffet França e chegamos preparados para cada detalhe, do posicionamento das caixas ao horário exato do sound check.",
    seoIntro:
      "Contratar uma banda em São Paulo pede critério, e a Barbie Kills entrega tudo que você espera: musicalidade, apresentação impecável e uma estrutura técnica que não depende de ninguém. Para casamentos de alto padrão ou eventos corporativos de grandes empresas, você foca no evento e a gente cuida da música.",
    seoComplemento:
      "Atendemos casamentos, eventos corporativos e grandes festas em São Paulo e Grande SP, com repertório completo de Pop, Rock, MPB e Samba Rock. Cada show é montado sob medida para o perfil dos seus convidados.",
    faq: {
      p1: "A Barbie Kills cobra taxa de deslocamento para shows em São Paulo?",
      r1: "As condições de deslocamento são sempre apresentadas de forma transparente no orçamento. Atendemos São Paulo com regularidade, então os valores são bastante acessíveis. Entre em contato com nossa produção para receber uma proposta personalizada para o seu evento.",
      p2: "A banda já tocou em espaços sofisticados de São Paulo?",
      r2: "Sim! Já nos apresentamos em espaços como Casa Fasano, Villa Jockey e Buffet França. Esses ambientes exigem um padrão elevado em som, iluminação e postura de palco, e a Barbie Kills está preparada para cada um deles.",
      p3: "A Barbie Kills atende eventos corporativos em São Paulo?",
      r3: "Com certeza! São Paulo é o maior polo de eventos corporativos do país e temos muita experiência em convenções, premiações e confraternizações de grandes empresas. Também temos painel de LED próprio para exibição de marcas e vídeos durante a performance, o que faz muita diferença em eventos de endomarketing.",
    },
  },
  {
    cidade: "Alphaville",
    slug: "evento-corporativo-alphaville",
    foco: "Corporativo",
    hook: "Público executivo exigente e eventos de endomarketing de alto nível.",
    venues: "Blue Tree Premium, Iguatemi Business.",
    autoridade:
      "Alphaville reúne um público que entende de qualidade, e a Barbie Kills foi construída para impressionar exatamente esse perfil. Com músicos de alto nível, postura de palco sofisticada e um repertório que transita com naturalidade do coquetel executivo à festa da premiação, entregamos uma experiência musical que a sua empresa vai se orgulhar de ter escolhido.",
    logistica:
      "Conhecemos bem os espaços de Alphaville, como Blue Tree Premium e Iguatemi Business, e entendemos as exigências desses ambientes: montagem discreta, pontualidade absoluta e equipe técnica que não atrapalha o cronograma do evento. Chegamos com tudo próprio e resolvemos cada detalhe antes da sua equipe precisar perguntar.",
    seoIntro:
      "Para eventos corporativos em Alphaville, a Barbie Kills entrega o padrão que esse mercado exige. Somos especialistas em transformar convenções, premiações e confraternizações em momentos que as pessoas levam para casa na memória.",
    seoComplemento:
      "Nossa produção cuida de toda a parte técnica do evento musical: rider, montagem, sound check e desmontagem, tudo sem interferir no seu cronograma. E com painel de LED próprio, dá para integrar a identidade visual da sua empresa à performance ao vivo.",
    faq: {
      p1: "A Barbie Kills já se apresentou em eventos corporativos em Alphaville?",
      r1: "Sim! Já tocamos em espaços como Blue Tree Premium e Iguatemi Business, que são referência para eventos executivos na região. Sabemos como funciona a dinâmica desses ambientes e chegamos preparados para atender cada exigência técnica e de protocolo.",
      p2: "A banda oferece opções de repertório para diferentes momentos do evento?",
      r2: "Oferece! Para coquetéis e jantares executivos, trabalhamos com versões mais suaves de MPB e Pop que facilitam a conversa e criam uma atmosfera sofisticada. Para premiações e confraternizações, a energia sobe e o Rock e o Samba Rock tomam conta. Tudo planejado junto com a sua produção.",
      p3: "A Barbie Kills tem painel de LED para eventos corporativos?",
      r3: "Sim, e é um diferencial que nossos clientes corporativos adoram! O painel de LED próprio permite exibir o logo da empresa, vídeos institucionais e conteúdos personalizados integrados à performance. Fica lindo e reforça muito a identidade do evento.",
    },
  },
  {
    cidade: "Barueri",
    slug: "evento-corporativo-barueri",
    foco: "Corporativo",
    hook: "Polo empresarial vibrante com foco em tecnologia e serviços.",
    venues: "Centro de Eventos Barueri, Solarium.",
    autoridade:
      "Barueri cresceu muito como polo empresarial e hoje tem um calendário intenso de eventos corporativos de qualidade. A Barbie Kills atende esse mercado com seriedade e entusiasmo: estrutura técnica própria, repertório que vai do Pop e Rock ao MPB e Samba Rock, e uma performance que engaja do primeiro ao último acorde.",
    logistica:
      "Já tocamos no Centro de Eventos Barueri e no Solarium, e conhecemos as particularidades técnicas de cada espaço. Nossa equipe chega com antecedência, resolve a montagem com discrição e faz o sound check sem atrapalhar nada na preparação do evento. Você não precisa se preocupar com a parte musical: está em boas mãos.",
    seoIntro:
      "Para eventos corporativos em Barueri, a Barbie Kills traz exatamente o que faz a diferença: profissionalismo, energia e uma performance que as pessoas ficam comentando depois. Da confraternização de final de ano à premiação de resultados, a gente cuida da trilha sonora.",
    seoComplemento:
      "Atendemos convenções, confraternizações, premiações e festas corporativas em Barueri. Nossa produção trabalha junto com a sua equipe para que tudo saia exatamente como planejado.",
    faq: {
      p1: "A Barbie Kills atende eventos de pequeno e grande porte em Barueri?",
      r1: "Sim! Adaptamos nossa formação e infraestrutura ao tamanho do evento, de um jantar executivo com 50 pessoas a uma convenção com 500. O cuidado e a qualidade são os mesmos independente do porte.",
      p2: "A banda tem experiência com empresas de tecnologia e serviços, que são comuns em Barueri?",
      r2: "Temos! O perfil das empresas de Barueri costuma pedir um evento sofisticado mas também animado, e a Barbie Kills sabe equilibrar muito bem os dois. Trabalhamos com repertório adaptável e abordagem de palco que funciona para públicos corporativos de diferentes segmentos.",
      p3: "A banda oferece música ambiente para coquetéis e jantares em Barueri?",
      r3: "Sim, com prazer! Para momentos de networking e jantar, oferecemos formação acústica com MPB e Pop em volume controlado, a trilha perfeita para facilitar conversas e criar uma atmosfera elegante antes da performance principal.",
    },
  },
  {
    cidade: "Holambra",
    slug: "banda-casamento-holambra",
    foco: "Casamento",
    hook: "Charme europeu, cidade das flores e cenários que parecem de conto de fadas.",
    venues: "Fazenda Vila Rica, Quinta das Videiras.",
    autoridade:
      "Holambra tem um charme que poucas cidades do Brasil oferecem: fazendas floridas, arquitetura europeia e uma atmosfera romântica que já começa no caminho até o espaço. Casar aqui é escolher um cenário lindo, e a Barbie Kills é a banda que transforma esse cenário em uma festa inesquecível, com Pop, Rock, MPB e Samba Rock que aquece a pista e emociona os convidados.",
    logistica:
      "Holambra fica a menos de 40km de Campinas, nossa base, então a logística é simples e sem surpresas. Conhecemos espaços como Fazenda Vila Rica e Quinta das Videiras e sabemos como montar tudo sem atrapalhar a decoração ou o cronograma do cerimonial. Chegamos cedo, resolvemos tudo e deixamos você aproveitar cada momento.",
    seoIntro:
      "Casar em Holambra já é um presente para os seus convidados. A Barbie Kills garante que a festa seja à altura do cenário, com um show que começa no coquetel e não para até a última música da madrugada.",
    seoComplemento:
      "Atendemos casamentos de todos os tamanhos em Holambra, da cerimônia intimista no jardim à grande festa no salão. Nossa produção trabalha junto com o cerimonial para que cada detalhe musical seja exatamente como você imaginou.",
    faq: {
      p1: "A Barbie Kills tem experiência com casamentos em fazendas e espaços ao ar livre em Holambra?",
      r1: "Sim! Espaços rurais e ao ar livre são um dos nossos ambientes favoritos. Levamos estrutura técnica completa para áreas externas, incluindo PA outdoor e iluminação adaptável, e nossa equipe sabe como extrair o melhor som em qualquer configuração.",
      p2: "A banda pode tocar tanto na cerimônia quanto na festa em Holambra?",
      r2: "Pode sim! Para a cerimônia, oferecemos o projeto Los Libres, uma formação acústica e intimista com arranjos personalizados para o momento do sim. Para a festa, a Barbie Kills entra com tudo e transforma a noite. Dois momentos especiais, um único fornecedor de confiança.",
      p3: "Como funciona a logística da banda para eventos em Holambra?",
      r3: "Holambra fica pertinho de Campinas, então chegamos com facilidade e sem custo extra de deslocamento. Nossa equipe chega com antecedência para montagem e sound check, garantindo que tudo esteja pronto e perfeito antes dos primeiros convidados chegarem.",
    },
  },
  {
    cidade: "Itu",
    slug: "banda-casamento-itu",
    foco: "Casamento",
    hook: "Fazendas históricas de luxo com pé direito alto e rusticidade chique.",
    venues: "Fazenda Vila Real, Fazenda Capoava, Vasselo.",
    autoridade:
      "Casar em Itu é casar com estilo. As fazendas históricas da cidade têm uma grandiosidade que poucos lugares no Brasil conseguem oferecer, e a Barbie Kills entrega um show que está à altura desses cenários. Energia, sofisticação e um repertório de Pop, Rock, MPB e Samba Rock que enche a pista do início ao fim.",
    logistica:
      "Já tocamos na Fazenda Vila Real, Fazenda Capoava, Vasselo e em outros espaços de Itu, e conhecemos bem as características acústicas desses ambientes de pé direito alto. Nossa equipe chega preparada para cada detalhe técnico e resolve tudo com discrição, sem atrapalhar a decoração ou o cerimonial.",
    seoIntro:
      "Itu tem os palcos mais bonitos do interior de São Paulo para um casamento. A Barbie Kills garante que o show musical seja tão especial quanto o cenário: uma performance que emociona, diverte e deixa todo mundo na pista.",
    seoComplemento:
      "Nossa produção trabalha de mãos dadas com os cerimonialistas de Itu para que cada momento da festa tenha a trilha sonora perfeita, da entrada dos noivos ao último Samba Rock da madrugada.",
    faq: {
      p1: "A banda tem experiência com casamentos nas fazendas de Itu?",
      r1: "Tem sim! Já tocamos na Fazenda Vila Real, Fazenda Capoava, Vasselo e em outros espaços incríveis de Itu. Cada fazenda tem sua personalidade acústica e a gente chega preparado para extrair o melhor som em qualquer uma delas.",
      p2: "Qual é o repertório mais pedido nos casamentos em Itu?",
      r2: "O perfil dos casamentos em Itu costuma pedir um repertório que equilibra sofisticação e animação: Beatles, Queen, Amy Winehouse, sucessos da MPB e muito Samba Rock para animar a pista. Mas o setlist é sempre montado junto com os noivos para refletir a identidade do casal.",
      p3: "A Barbie Kills atende casamentos de diferentes tamanhos em Itu?",
      r3: "Atende! Trabalhamos com eventos de 80 até 500 convidados, adaptando a formação da banda e a infraestrutura técnica ao tamanho do evento. Você paga pelo que o seu evento precisa, sem excessos.",
    },
  },
  {
    cidade: "Jundiaí",
    slug: "banda-casamento-jundiai",
    foco: "Híbrido",
    hook: "Shows de alta energia na Serra do Japi e estrutura técnica de ponta.",
    venues: "Espaço G9, Solar da Marquesa, Multiplan, Fazenda Montanhas.",
    h1Custom: "Banda para Casamentos e Eventos em Jundiaí",
    autoridade:
      "Jundiaí tem crescido muito no mercado de eventos, com casamentos lindos nas fazendas da Serra do Japi e eventos corporativos de alto nível nos centros empresariais modernos da cidade. A Barbie Kills atende os dois perfis com a mesma qualidade: repertório de Pop, Rock, MPB e Samba Rock, estrutura técnica própria e uma energia de palco que o público de Jundiaí vai amar.",
    logistica:
      "A partir de Campinas, atendemos Jundiaí e Itatiba com agilidade. Conhecemos o Espaço G9, Solar da Marquesa, Multiplan e Fazenda Montanhas, e chegamos prontos para qualquer configuração de espaço, seja um salão fechado ou uma fazenda com vista para a Serra do Japi.",
    seoIntro:
      "Para casamentos nas fazendas da Serra do Japi ou para eventos corporativos nos centros empresariais de Jundiaí, a Barbie Kills está pronta para fazer do seu evento algo realmente especial. A gente se adapta ao seu evento, não o contrário.",
    seoComplemento:
      "Atendemos casamentos, eventos corporativos, formaturas e aniversários em Jundiaí e Itatiba. Entre em contato com nossa produção para garantir a sua data.",
    faq: {
      p1: "A Barbie Kills atende casamentos e eventos corporativos em Jundiaí?",
      r1: "Atende os dois e com muito prazer. Para casamentos, trazemos energia e um repertório que enche a pista. Para eventos corporativos, montamos um setlist e uma abordagem de palco específicos para o ambiente executivo, com opção de performance bilíngue e painel de LED para exibição de marcas.",
      p2: "A banda conhece os espaços de eventos de Jundiaí?",
      r2: "Conhece sim! Já tocamos no Espaço G9, Solar da Marquesa, Fazenda Montanhas e em outros espaços da região, incluindo fazendas próximas a Itatiba. Conhecer o ambiente antes faz muita diferença na qualidade do som e da experiência do público.",
      p3: "Como funciona a logística para eventos em Jundiaí?",
      r3: "Jundiaí fica a cerca de 50km de Campinas, nossa base. A logística é tranquila e eficiente, e o deslocamento não pesa no orçamento. Chegamos com antecedência para montagem e sound check, sem comprometer o cronograma do seu evento.",
    },
  },
  {
    cidade: "Indaiatuba",
    slug: "banda-casamento-indaiatuba",
    foco: "Casamento",
    hook: "Sofisticação rural e exclusividade no polo mundial de Polo.",
    venues: "Clube de Campo Helvetia, Villa de Reggio.",
    autoridade:
      "Indaiatuba tem uma identidade única no cenário de casamentos do interior paulista: espaços sofisticados em clima de campo, público exigente e um mercado nupcial que não abre mão de qualidade. A Barbie Kills chega aqui com o mesmo padrão de performance que encantou noivos em Campinas e São Paulo, trazendo Pop, Rock, MPB e Samba Rock com toda a energia e cuidado que o seu dia merece.",
    logistica:
      "Conhecemos bem o Clube de Campo Helvetia e a Villa de Reggio, dois dos espaços mais requisitados de Indaiatuba. Nossa estrutura técnica própria garante som e iluminação de qualidade em qualquer configuração, e a equipe chega preparada para resolver cada detalhe sem que você precise se preocupar.",
    seoIntro:
      "Indaiatuba tem espaços lindos e um clima especial para casamentos. A Barbie Kills é a banda que complementa esse cenário com um show cheio de energia, repertório versátil e aquele cuidado que transforma uma boa festa em uma festa inesquecível.",
    seoComplemento:
      "Atendemos casamentos, festas de aniversário e eventos sociais em Indaiatuba. Nossa produção cuida de cada detalhe musical para que você aproveite cada minuto da festa.",
    faq: {
      p1: "A Barbie Kills tem experiência com casamentos em Indaiatuba?",
      r1: "Tem sim! Conhecemos os principais espaços da cidade, como Clube de Campo Helvetia e Villa de Reggio, e já tocamos na região. Nossa infraestrutura própria garante qualidade de som e iluminação independente do espaço que você escolher.",
      p2: "Qual repertório a banda toca nos casamentos de Indaiatuba?",
      r2: "Trabalhamos com Pop, Rock, MPB e Samba Rock, com mais de 150 músicas no repertório. O setlist é sempre montado junto com os noivos para garantir que tanto os clássicos internacionais quanto os hits nacionais preferidos do casal façam parte da noite.",
      p3: "A banda oferece serviço para a cerimônia além da festa em Indaiatuba?",
      r3: "Oferece! Para a cerimônia temos o projeto Los Libres, uma formação acústica especializada com arranjos personalizados para musicalizar cada momento do sim. Para a festa, a Barbie Kills entra com tudo. Dois momentos especiais, uma equipe só.",
    },
  },
  {
    cidade: "Vinhedo",
    slug: "banda-casamento-vinhedo",
    foco: "Híbrido",
    hook: "Festas exclusivas em condomínios de alto padrão e espaços deslumbrantes.",
    venues: "Castelo dos Vinhedos, Espaço Boulevard.",
    autoridade:
      "Vinhedo é uma das cidades mais exclusivas da região de Campinas para eventos, com condomínios de alto padrão e espaços que impressionam pela beleza e pelos detalhes. A Barbie Kills se encaixa muito bem nesse ambiente: um show sofisticado e cheio de energia, com Pop, Rock, MPB e Samba Rock para um público que valoriza qualidade em tudo.",
    logistica:
      "O Castelo dos Vinhedos e o Espaço Boulevard são dois dos nossos espaços favoritos na região, e já nos apresentamos em ambos. Nossa estrutura técnica própria se adapta a ambientes internos e externos, garantindo som e iluminação impecáveis em qualquer configuração.",
    seoIntro:
      "Vinhedo tem alguns dos cenários mais elegantes do interior paulista para casamentos e eventos corporativos. A Barbie Kills traz para esses cenários um show que combina com a sofisticação do lugar: energia contagiante e repertório que não deixa ninguém parado.",
    seoComplemento:
      "Atendemos casamentos e eventos corporativos em Vinhedo com o mesmo nível de dedicação. Para eventos de empresas instaladas nos condomínios de alto padrão da cidade, nossa equipe monta uma experiência musical sob medida para o perfil do público executivo.",
    faq: {
      p1: "A Barbie Kills tem experiência em espaços de Vinhedo?",
      r1: "Tem sim! Já tocamos no Castelo dos Vinhedos e no Espaço Boulevard, que estão entre os espaços mais bonitos da região. Conhecer bem o ambiente nos permite planejar som e iluminação com muito mais cuidado.",
      p2: "A banda atende eventos corporativos em Vinhedo?",
      r2: "Atende! Vinhedo concentra condomínios de alto padrão com muitas empresas que realizam eventos de qualidade. Para esse perfil corporativo, ajustamos o setlist, a formação e a postura de palco ao ambiente executivo, garantindo uma noite sofisticada e inesquecível.",
      p3: "Como é o processo para contratar a Barbie Kills para um evento em Vinhedo?",
      r3: "É bem simples! Você manda uma mensagem pelo WhatsApp para nossa produção, a gente conversa sobre o evento, o espaço e as preferências musicais, e em seguida envia uma proposta personalizada com todas as informações. Transparência do começo ao fim.",
    },
  },
  {
    cidade: "Valinhos",
    slug: "banda-casamento-valinhos",
    foco: "Híbrido",
    hook: "Espaços encantadores em meio à natureza e proximidade com Campinas.",
    venues: "Fonte Santa Teresa, Hotel Itapema.",
    autoridade:
      "Valinhos tem uma vocação natural para eventos em contato com a natureza, com espaços charmosos que combinam verde, tranquilidade e boa infraestrutura. Seja para um casamento romântico ou para uma confraternização corporativa em ambiente diferenciado, a Barbie Kills atende Valinhos com o mesmo entusiasmo e qualidade de sempre.",
    logistica:
      "Valinhos fica pertinho de Campinas, o que torna a logística muito simples. Conhecemos a Fonte Santa Teresa e o Hotel Itapema, e chegamos com estrutura técnica própria completa para garantir som e iluminação de qualidade em qualquer tipo de ambiente, externo ou interno.",
    seoIntro:
      "Valinhos é uma escolha ótima para casamentos e eventos corporativos que buscam um cenário diferenciado sem sair da região de Campinas. A Barbie Kills está pronta para fazer do seu evento em Valinhos uma noite que todo mundo vai lembrar.",
    seoComplemento:
      "Para casamentos, trazemos o repertório completo de Pop, Rock, MPB e Samba Rock e trabalhamos junto com o cerimonial. Para eventos corporativos, montamos a experiência musical certa para o perfil da sua empresa e do seu público. A proximidade com Campinas garante agilidade e sem custos extras.",
    faq: {
      p1: "A Barbie Kills atende tanto casamentos quanto eventos corporativos em Valinhos?",
      r1: "Atende sim! Para casamentos, trazemos o show completo de Pop, Rock, MPB e Samba Rock com todo o cuidado que o seu dia merece. Para eventos corporativos, adaptamos a formação e o repertório ao ambiente e ao perfil do público da sua empresa.",
      p2: "A banda toca em espaços ao ar livre em Valinhos?",
      r2: "Toca! Temos estrutura técnica para ambientes externos, com PA outdoor e iluminação adaptável. Espaços em meio à natureza têm desafios acústicos específicos e nossa equipe tem experiência e preparo para resolver cada um deles.",
      p3: "Qual é o repertório da Barbie Kills para um casamento em Valinhos?",
      r3: "Trabalhamos com Pop, Rock, MPB e Samba Rock, com mais de 150 músicas disponíveis. O setlist é montado junto com os noivos para garantir que a festa reflita o estilo do casal e que cada convidado tenha seus momentos especiais na pista.",
    },
  },
  {
    cidade: "Sorocaba",
    slug: "banda-casamento-sorocaba",
    foco: "Casamento",
    hook: "Grandes espaços rurais e infraestrutura de ponta para casamentos dos sonhos.",
    venues: "Villa Sansu, Fazenda Santa Maria.",
    autoridade:
      "Sorocaba tem um mercado de casamentos robusto e sofisticado, com espaços que combinam grandiosidade e atenção aos detalhes. A Barbie Kills chega em Sorocaba preparada para entregar o show que os noivos e seus convidados merecem: energia, emoção e um repertório de Pop, Rock, MPB e Samba Rock que transforma qualquer festa em memória.",
    logistica:
      "Conhecemos o Villa Sansu e a Fazenda Santa Maria, dois dos espaços mais procurados para casamentos em Sorocaba, e já nos apresentamos em ambos. Nossa estrutura técnica própria chega completa e nossa equipe trabalha junto com o cerimonial para que tudo aconteça no tempo certo.",
    seoIntro:
      "Sorocaba tem espaços lindos para casamentos e um mercado que valoriza qualidade. A Barbie Kills é a banda que torna esses eventos ainda mais especiais: um show que emociona, diverte e deixa a pista cheia do começo ao fim.",
    seoComplemento:
      "Atendemos casamentos de todos os tamanhos em Sorocaba, do evento intimista à grande festa com centenas de convidados. Nossa produção cuida de todos os detalhes musicais para que você aproveite cada segundo do seu dia.",
    faq: {
      p1: "A Barbie Kills tem experiência com casamentos em Sorocaba?",
      r1: "Tem sim! Já tocamos em Villa Sansu, Fazenda Santa Maria e em outros espaços da cidade. Nossa equipe conhece as particularidades acústicas desses ambientes e chega preparada para entregar um show impecável.",
      p2: "Qual é o repertório da banda para casamentos em Sorocaba?",
      r2: "Trabalhamos com Pop, Rock, MPB e Samba Rock, com mais de 150 músicas disponíveis. O setlist é sempre montado em conjunto com os noivos para garantir que a personalidade do casal esteja em cada música tocada na festa.",
      p3: "A Barbie Kills oferece serviço de cerimônia e festa em Sorocaba?",
      r3: "Oferece! Para a cerimônia temos o projeto Los Libres, com formação acústica especializada e repertório personalizado. Para a festa, a Barbie Kills entra com o show completo. Dois momentos especiais do seu casamento com um único fornecedor em quem você pode confiar.",
    },
  },
  {
    cidade: "Paulínia",
    slug: "evento-corporativo-paulinia",
    foco: "Híbrido",
    hook: "Hub empresarial com centros de convenções de grande capacidade.",
    venues: "Premium Paulínia, Vitória Hotel Convention.",
    autoridade:
      "Paulínia é um dos polos industriais e corporativos mais importantes do interior paulista, com um calendário intenso de eventos de grande porte. A Barbie Kills atende esse mercado com seriedade e a mesma energia que define todos os nossos shows: estrutura técnica própria, repertório de Pop, Rock, MPB e Samba Rock, e uma performance que transforma qualquer evento em algo memorável.",
    logistica:
      "Já tocamos no Premium Paulínia e no Vitória Hotel Convention, e conhecemos bem a dinâmica desses espaços. Paulínia fica a menos de 30km de Campinas, o que torna nossa logística muito eficiente. Chegamos preparados, montamos com discrição e garantimos que o show aconteça exatamente como planejado.",
    seoIntro:
      "Paulínia tem uma cena de eventos corporativos muito ativa, e a Barbie Kills está pronta para ser a atração musical que transforma a sua noite. De confraternizações a convenções de grande porte, cuidamos de cada detalhe para que a música seja o ponto alto do evento.",
    seoComplemento:
      "Atendemos também casamentos em Paulínia com o mesmo padrão de excelência. Para noivos que buscam uma banda versátil na região, nosso repertório completo de Pop, Rock, MPB e Samba Rock garante uma festa cheia de energia e personalidade.",
    faq: {
      p1: "A Barbie Kills tem experiência com eventos corporativos em Paulínia?",
      r1: "Tem! Paulínia é uma cidade que atendemos com regularidade, especialmente para eventos corporativos de empresas do polo industrial da região. Já tocamos no Premium Paulínia e no Vitória Hotel Convention e nos sentimos em casa nesses espaços.",
      p2: "A banda atende casamentos em Paulínia além de eventos corporativos?",
      r2: "Atende com muito prazer! Nosso repertório de Pop, Rock, MPB e Samba Rock funciona lindamente para casamentos e festas sociais. O mesmo nível de cuidado e dedicação que oferecemos para o mercado corporativo está disponível para os noivos que escolherem Paulínia.",
      p3: "Como funciona a logística para eventos em Paulínia?",
      r3: "Paulínia fica a menos de 30km de Campinas, nossa base. A logística é muito tranquila e o deslocamento não representa custo relevante no orçamento. Nossa equipe chega com antecedência para garantir que tudo esteja pronto antes do início do evento.",
    },
  },
  {
    cidade: "Piracicaba",
    slug: "banda-casamento-piracicaba",
    foco: "Híbrido",
    hook: "Eventos em locais históricos únicos e uma cena cultural rica.",
    venues: "Engenho Central, Monte Alegre, Usina Inovação.",
    autoridade:
      "Piracicaba tem uma identidade cultural forte e espaços de eventos únicos no Brasil, como o Engenho Central, que misturam história e modernidade de forma muito especial. A Barbie Kills se encaixa perfeitamente nesse cenário: um show que respeita a sofisticação do ambiente e ao mesmo tempo traz a energia de Pop, Rock, MPB e Samba Rock que qualquer boa festa precisa.",
    logistica:
      "Conhecemos o Engenho Central, Monte Alegre e a Usina Inovação, espaços com características acústicas únicas que nossa equipe sabe como aproveitar ao máximo. Chegamos com estrutura técnica própria completa e resolvemos cada detalhe antes do evento começar.",
    seoIntro:
      "Piracicaba tem espaços de eventos com uma personalidade que poucas cidades do interior oferecem. A Barbie Kills chega para completar esse cenário tanto em casamentos sofisticados quanto em eventos corporativos que pedem um ambiente diferenciado e culturalmente rico.",
    seoComplemento:
      "Para casamentos em Piracicaba, trabalhamos junto com o cerimonial para criar a trilha sonora perfeita. Para eventos corporativos, nossa equipe monta a experiência musical certa para o perfil da sua empresa, com estrutura técnica completa e repertório adaptado ao seu público.",
    faq: {
      p1: "A Barbie Kills já tocou nos espaços históricos de Piracicaba?",
      r1: "Já sim! O Engenho Central é um dos espaços mais únicos do interior paulista e já nos apresentamos lá. Esses ambientes históricos têm características acústicas muito específicas, com tetos altos e estruturas especiais, e nossa equipe técnica sabe como extrair o melhor som em cada um deles.",
      p2: "A banda atende eventos corporativos em Piracicaba?",
      r2: "Atende com muito prazer! Piracicaba tem empresas importantes que realizam eventos corporativos de qualidade, especialmente nos setores agroindustrial e tecnológico. Nossa equipe monta uma experiência musical personalizada para o perfil da sua empresa e do seu público.",
      p3: "A Barbie Kills atende casamentos em Piracicaba também?",
      r3: "Atende sim! Para casamentos em Piracicaba, trazemos o show completo de Pop, Rock, MPB e Samba Rock e trabalhamos junto com o cerimonial desde o planejamento. O resultado é uma festa com a trilha sonora que o casal sempre imaginou.",
    },
  },
  {
    cidade: "Americana",
    slug: "banda-casamento-americana",
    foco: "Híbrido",
    hook: "Tradição em grandes festas sociais e mercado corporativo em crescimento.",
    venues: "Vila Americana, Espaço Beira Rio.",
    autoridade:
      "Americana tem uma tradição forte em festas sociais e um público que sabe o que quer: qualidade, energia e diversão. Além dos casamentos, a cidade tem um polo industrial ativo com empresas que organizam eventos corporativos de peso. A Barbie Kills atende os dois mercados com o mesmo padrão: Pop, Rock, MPB e Samba Rock em um show que não deixa ninguém parado.",
    logistica:
      "Conhecemos a Vila Americana e o Espaço Beira Rio, e chegamos preparados para cada configuração. A proximidade com Campinas torna nossa logística eficiente e com custo de deslocamento muito acessível.",
    seoIntro:
      "Americana é uma cidade com tradição em grandes festas e um mercado corporativo crescente. A Barbie Kills chega com tudo que é preciso para fazer do seu evento um sucesso, seja um casamento animado ou uma confraternização de empresa que as pessoas vão lembrar.",
    seoComplemento:
      "Para casamentos em Americana, montamos o setlist junto com os noivos para uma noite personalizada. Para eventos corporativos, ajustamos repertório e abordagem ao perfil da empresa. Em ambos os casos, estrutura técnica própria e dedicação do início ao fim.",
    faq: {
      p1: "A Barbie Kills atende eventos em Americana com frequência?",
      r1: "Atende! Americana é uma das cidades que visitamos com mais regularidade na região de Campinas. Conhecemos bem os principais espaços de eventos da cidade, como Vila Americana e Espaço Beira Rio, e chegamos sempre preparados.",
      p2: "Qual é o repertório da banda para festas em Americana?",
      r2: "Trabalhamos com Pop, Rock, MPB e Samba Rock, com mais de 150 músicas. O setlist é montado de acordo com o perfil do evento e do público, para que a pista fique cheia do começo ao fim e todo mundo saia com aquele sorriso no rosto.",
      p3: "A Barbie Kills atende eventos corporativos em Americana?",
      r3: "Atende com prazer! Americana tem empresas importantes que organizam eventos corporativos de qualidade. Nossa produção monta uma proposta específica para eventos de empresas, com repertório ajustado ao perfil do público corporativo e estrutura técnica que garante um show impecável.",
    },
  },
  {
    cidade: "Louveira",
    slug: "banda-casamento-louveira",
    foco: "Casamento",
    hook: "Tranquilidade, natureza e espaços charmosos em rotas gastronômicas.",
    venues: "Fazenda Santo Antonio, Villa de Lucca.",
    autoridade:
      "Louveira é uma cidade que combina tranquilidade, natureza e um charme especial, tornando-se uma escolha cada vez mais querida para casamentos que fogem do convencional. A Barbie Kills traz para Louveira toda a energia e sofisticação do seu show, com Pop, Rock, MPB e Samba Rock para uma festa que os convidados vão lembrar por muito tempo.",
    logistica:
      "Conhecemos a Fazenda Santo Antonio e a Villa de Lucca, dois dos espaços mais procurados para casamentos em Louveira. Nossa estrutura técnica própria garante som e iluminação de qualidade tanto em ambientes internos quanto ao ar livre.",
    seoIntro:
      "Louveira tem uma atmosfera única para casamentos, longe da agitação dos grandes centros mas com toda a estrutura necessária para uma festa incrível. A Barbie Kills é a banda que completa esse cenário do jeito certo.",
    seoComplemento:
      "Atendemos casamentos e festas sociais em Louveira com toda a atenção e cuidado que o seu dia merece. Nossa produção trabalha junto com o cerimonial para que cada detalhe musical seja exatamente como você imaginou.",
    faq: {
      p1: "A Barbie Kills tem experiência com casamentos em Louveira?",
      r1: "Tem! Conhecemos os principais espaços de casamento de Louveira, como Fazenda Santo Antonio e Villa de Lucca, e já tocamos na região. Nossa estrutura técnica própria garante qualidade de som e iluminação em qualquer ambiente.",
      p2: "A banda toca em espaços rurais e ao ar livre em Louveira?",
      r2: "Toca sim! Temos estrutura técnica completa para espaços externos, com PA outdoor e iluminação adaptável. Fazendas e espaços em meio à natureza são ambientes que nossa equipe conhece muito bem e adora trabalhar.",
      p3: "Como funciona o processo para contratar a Barbie Kills para um casamento em Louveira?",
      r3: "Bem simples: você fala com nossa produção pelo WhatsApp, a gente conversa sobre o perfil do casamento, o espaço escolhido e as músicas que são especiais para vocês, e em seguida enviamos uma proposta completa e personalizada.",
    },
  },
  {
    cidade: "Jaguariúna",
    slug: "banda-casamento-jaguariuna",
    foco: "Híbrido",
    hook: "O melhor do clima de interior com estrutura para grandes shows.",
    venues: "Red Eventos, Fazenda Santa Gertrudes.",
    autoridade:
      "Jaguariúna tem conquistado cada vez mais espaço no mercado de eventos da região de Campinas, com espaços que combinam o charme do interior com infraestrutura moderna. A Barbie Kills atende Jaguariúna com o mesmo entusiasmo de sempre: Pop, Rock, MPB e Samba Rock em um show que não deixa a pista parada.",
    logistica:
      "Já tocamos no Red Eventos e na Fazenda Santa Gertrudes, dois dos principais espaços de eventos de Jaguariúna. Nossa estrutura técnica própria chega completa e nossa equipe está preparada para qualquer configuração de palco ou ambiente.",
    seoIntro:
      "Jaguariúna é uma ótima escolha para casamentos e eventos que querem o melhor dos dois mundos: o aconchego do interior e a estrutura para uma grande festa. A Barbie Kills garante que a música seja à altura do cenário.",
    seoComplemento:
      "Além de casamentos, atendemos eventos corporativos em Jaguariúna com proposta musical personalizada para o perfil da empresa. Nossa proximidade com Campinas garante logística eficiente e preços acessíveis para os dois tipos de evento.",
    faq: {
      p1: "A Barbie Kills tem experiência com eventos em Jaguariúna?",
      r1: "Tem sim! Já tocamos no Red Eventos, na Fazenda Santa Gertrudes e em outros espaços da região. Jaguariúna é uma cidade que atendemos com regularidade e onde já fizemos shows muito especiais.",
      p2: "A banda atende eventos corporativos em Jaguariúna?",
      r2: "Atende! Para empresas de Jaguariúna e região, elaboramos uma proposta musical específica com repertório ajustado ao perfil do público e estrutura técnica completa. O clima de interior combinado com uma performance de alto nível cria uma experiência diferenciada para os colaboradores.",
      p3: "Como funciona a logística para eventos em Jaguariúna?",
      r3: "Jaguariúna fica bem próxima de Campinas, nossa base. A logística é tranquila e sem complicações. Chegamos com antecedência para montagem e sound check, garantindo que tudo esteja pronto antes dos convidados chegarem.",
    },
  },
  {
    cidade: "Atibaia",
    slug: "banda-casamento-atibaia",
    foco: "Casamento",
    hook: "Clima de montanha, natureza e resorts de grande porte para casamentos destino.",
    venues: "Bourbon Atibaia, Tauá Resort.",
    autoridade:
      "Atibaia é um destino consolidado para casamentos que buscam clima especial, natureza e resorts de alto padrão. Casar no Bourbon Atibaia ou no Tauá Resort já é uma experiência incrível, e a Barbie Kills está aqui para tornar a festa à altura do cenário: Pop, Rock, MPB e Samba Rock em um show que emociona e anima do primeiro ao último acorde.",
    logistica:
      "Conhecemos o Bourbon Atibaia e o Tauá Resort, e entendemos as exigências técnicas desses grandes espaços. Nossa equipe chega preparada para cada detalhe, de posicionamento de caixas a cronograma com o cerimonial, e garante que o show aconteça exatamente como planejado.",
    seoIntro:
      "Atibaia é uma escolha especial para noivos que querem mais do que uma festa bonita: querem uma experiência. A Barbie Kills complementa esse destino com um show que os convidados vão lembrar mesmo anos depois.",
    seoComplemento:
      "Atendemos casamentos em Atibaia com toda a estrutura necessária para um evento destino: infraestrutura técnica própria, repertório personalizado e uma equipe de produção que cuida de cada detalhe musical.",
    faq: {
      p1: "A Barbie Kills tem experiência com casamentos em resorts de Atibaia?",
      r1: "Tem sim! Já nos apresentamos no Bourbon Atibaia, no Tauá Resort e em outros espaços da cidade. Resorts têm múltiplos ambientes e exigências técnicas específicas, e nossa equipe está preparada para atender cada configuração com cuidado e qualidade.",
      p2: "Como funciona a logística para um casamento destino em Atibaia?",
      r2: "Para casamentos destino em Atibaia, nossa produção começa a trabalhar com o cerimonial desde o planejamento. Cuidamos de toda a parte técnica, rider, montagem e sound check, para que o casal e os convidados só precisem aproveitar cada momento.",
      p3: "A banda oferece serviço de cerimônia e festa em Atibaia?",
      r3: "Oferece! Para a cerimônia temos o projeto Los Libres, com formação acústica especializada e arranjos personalizados. Para a festa, a Barbie Kills entra com tudo. Pop, Rock, MPB e Samba Rock para uma noite que começa com emoção e termina com a pista cheia.",
    },
  },
  {
    cidade: "Bragança Paulista",
    slug: "banda-casamento-braganca",
    foco: "Casamento",
    hook: "Paisagens deslumbrantes da represa e fazendas de alto luxo únicas.",
    venues: "Villa Santo Agostinho, Fazenda Coronel Jacinto.",
    autoridade:
      "Bragança Paulista guarda um cenário natural que encanta logo na chegada: fazendas de luxo às margens da represa, ar puro de serra e uma atmosfera que prepara os convidados para algo especial antes mesmo da festa começar. A Barbie Kills traz para esse cenário um show que combina com tudo isso, com Pop, Rock, MPB e Samba Rock tocados com emoção e alta energia.",
    logistica:
      "A Villa Santo Agostinho e a Fazenda Coronel Jacinto são dois dos espaços mais exclusivos para casamentos em Bragança Paulista, e nossa equipe já se apresentou na região. Levamos estrutura técnica própria completa, incluindo PA e iluminação adequados para espaços afastados, e chegamos com tempo suficiente para que tudo esteja impecável antes da chegada dos convidados.",
    seoIntro:
      "Escolher Bragança Paulista para o casamento é apostar em exclusividade e beleza natural. A Barbie Kills é a banda que honra essa escolha: um show cuidadoso, energético e inesquecível para uma das noites mais importantes da sua vida.",
    seoComplemento:
      "Trabalhamos junto com o cerimonial de Bragança Paulista desde o planejamento musical até o último acorde da festa. Casamentos intimistas ou grandes celebrações, o mesmo capricho e dedicação em cada detalhe.",
    faq: {
      p1: "A Barbie Kills atende casamentos em fazendas de Bragança Paulista?",
      r1: "Atende! Já nos apresentamos em espaços como Villa Santo Agostinho e Fazenda Coronel Jacinto, e conhecemos bem as características desses ambientes. Pé direito alto, espaços externos e acústica específica de fazenda, nossa equipe técnica resolve tudo com tranquilidade.",
      p2: "A banda toca em espaços ao ar livre em Bragança Paulista?",
      r2: "Toca sim! Temos estrutura técnica preparada para áreas externas, com PA outdoor e iluminação adaptável para diferentes configurações de espaço. Casamentos ao ar livre à beira da represa são um dos cenários mais lindos que já tocamos.",
      p3: "Qual repertório combina com os casamentos em Bragança Paulista?",
      r3: "O perfil dos casamentos em fazendas de luxo costuma pedir um repertório que equilibra sofisticação e animação: clássicos internacionais de Pop e Rock, sucessos da MPB e blocos de Samba Rock que incendeiam a pista. O setlist é sempre montado junto com os noivos para refletir a identidade do casal.",
    },
  },
  {
    cidade: "São Caetano do Sul",
    slug: "evento-corporativo-sao-caetano",
    foco: "Corporativo",
    hook: "O coração do ABC com foco em eventos corporativos de alto padrão.",
    venues: "Buffet Napoleão, Espaço Win.",
    h1Custom: "Banda para Eventos em São Caetano do Sul",
    autoridade:
      "São Caetano do Sul é uma das cidades com maior IDH do Brasil e concentra empresas de ponta do setor automotivo, industrial e de serviços. O padrão dos eventos corporativos aqui é alto, e a Barbie Kills está preparada para esse nível de exigência: músicos de elite, infraestrutura própria e repertório que vai do Pop e Rock ao MPB e Samba Rock.",
    logistica:
      "Conhecemos o Buffet Napoleão e o Espaço Win, dois dos principais espaços de eventos de São Caetano do Sul, e chegamos com estrutura técnica completa para atender as exigências desses ambientes. Nossa equipe trabalha de forma integrada com a produção do evento para que tudo aconteça no tempo certo.",
    seoIntro:
      "São Caetano do Sul tem um mercado de eventos corporativos exigente e bem estabelecido. A Barbie Kills atende esse mercado com o padrão de qualidade que ele exige: performance profissional, infraestrutura técnica própria e repertório versátil que funciona para qualquer formato de evento.",
    seoComplemento:
      "Atendemos convenções, premiações, confraternizações e casamentos em São Caetano do Sul e região do ABC. Fale com nossa produção para uma proposta personalizada.",
    faq: {
      p1: "A Barbie Kills tem experiência com eventos corporativos em São Caetano do Sul?",
      r1: "Tem! Atendemos empresas de São Caetano do Sul e da região do ABC com regularidade. Conhecemos os principais espaços de eventos da cidade, como Buffet Napoleão e Espaço Win, e chegamos preparados para atender as exigências técnicas de cada ambiente.",
      p2: "A banda oferece repertório adequado para eventos executivos em São Caetano do Sul?",
      r2: "Oferece! Para ambientes executivos, trabalhamos com formações e repertórios específicos para cada momento do evento: versões mais suaves de MPB e Pop para coquetéis e jantares, e a energia do Rock e do Samba Rock para premiações e confraternizações.",
      p3: "A Barbie Kills tem painel de LED para eventos corporativos em São Caetano do Sul?",
      r3: "Sim! Temos painel de LED próprio para exibição de logos, vídeos institucionais e conteúdos personalizados integrados à performance. É um recurso muito valorizado pelas empresas da região do ABC para reforçar a identidade do evento.",
    },
  },
  {
    cidade: "Limeira",
    slug: "banda-casamento-limeira",
    foco: "Híbrido",
    hook: "Potência do agronegócio e festas grandiosas no interior paulista.",
    venues: "Zarzuela Eventos, Maison de Luxe.",
    h1Custom: "Banda para Casamento e Eventos em Limeira",
    autoridade:
      "Limeira tem uma economia forte e um mercado de eventos que reflete isso: festas bem produzidas, público exigente e espaços de qualidade. A Barbie Kills atende Limeira com energia e sofisticação, trazendo Pop, Rock, MPB e Samba Rock em um show que está à altura das melhores festas da cidade.",
    logistica:
      "Conhecemos o Zarzuela Eventos e o Maison de Luxe, dois dos espaços mais requisitados de Limeira. Nossa estrutura técnica própria chega completa e nossa equipe está preparada para qualquer configuração de palco e ambiente.",
    seoIntro:
      "Limeira tem um mercado de eventos vibrante, com festas que combinam a tradição do interior com o padrão de São Paulo. A Barbie Kills é a banda que completa esse cenário: repertório eclético, show de alta energia e profissionalismo que faz toda a diferença.",
    seoComplemento:
      "Para casamentos em Limeira, personalizamos o setlist junto com os noivos para uma noite única. Para eventos corporativos, nossa equipe cria uma proposta musical pensada para o perfil da sua empresa e do seu público. Nossa proximidade com Campinas garante logística eficiente e transparente.",
    faq: {
      p1: "A Barbie Kills tem experiência com eventos em Limeira?",
      r1: "Tem sim! Conhecemos os principais espaços de eventos de Limeira, como Zarzuela Eventos e Maison de Luxe, e já realizamos shows na cidade. Nossa infraestrutura técnica própria garante qualidade de som e iluminação em qualquer ambiente.",
      p2: "A banda atende eventos corporativos em Limeira?",
      r2: "Atende! Para empresas de Limeira, especialmente do setor agroindustrial e joalheiro, elaboramos uma proposta musical específica com repertório ajustado ao perfil do evento e estrutura técnica completa. O resultado é uma confraternização ou premiação que os colaboradores realmente lembram.",
      p3: "Como funciona a logística para eventos em Limeira?",
      r3: "Limeira fica a cerca de 60km de Campinas, nossa base. A logística é tranquila e sem complicações. Nossa equipe chega com antecedência para garantir montagem e sound check dentro do cronograma do evento.",
    },
  },
  {
    cidade: "Santana de Parnaíba",
    slug: "evento-corporativo-santana-parnaiba",
    foco: "Corporativo",
    hook: "Cenário histórico preservado e polo de grandes eventos corporativos.",
    venues: "Ville Sport Show, Espaços em Alphaville.",
    autoridade:
      "Santana de Parnaíba combina a exclusividade de um centro histórico preservado com a proximidade estratégica de Alphaville, criando um polo de eventos corporativos e sociais de alto padrão. A Barbie Kills atende esse mercado com a seriedade e o entusiasmo que cada show merece: estrutura técnica própria, repertório versátil e uma performance que impressiona.",
    logistica:
      "Conhecemos o Ville Sport Show e os principais espaços em Alphaville atendidos por Santana de Parnaíba. Nossa equipe chega com estrutura completa e está preparada para as exigências de espaços históricos e centros de convenções modernos.",
    seoIntro:
      "Santana de Parnaíba é uma escolha sofisticada para eventos corporativos e sociais que querem um ambiente diferenciado. A Barbie Kills traz para esse cenário um show de alta qualidade: Pop, Rock, MPB e Samba Rock com energia e profissionalismo.",
    seoComplemento:
      "Atendemos convenções, premiações, confraternizações e casamentos em Santana de Parnaíba e região de Alphaville. Fale com nossa produção para uma proposta personalizada.",
    faq: {
      p1: "A Barbie Kills tem experiência com eventos em Santana de Parnaíba?",
      r1: "Tem! Atendemos Santana de Parnaíba e a região de Alphaville com regularidade. Conhecemos os principais espaços da área, como Ville Sport Show, e chegamos preparados para atender as exigências técnicas de cada ambiente.",
      p2: "A banda atende eventos corporativos e casamentos em Santana de Parnaíba?",
      r2: "Atende os dois! Para eventos corporativos, trabalhamos com formações e repertórios adaptados ao ambiente executivo, com painel de LED próprio disponível para exibição de marcas. Para casamentos, trazemos o show completo de Pop, Rock, MPB e Samba Rock.",
      p3: "Como funciona a logística para eventos em Santana de Parnaíba?",
      r3: "Santana de Parnaíba fica próxima de Alphaville e de São Paulo, o que torna nossa logística muito eficiente. Nossa equipe chega com antecedência para montagem e sound check, garantindo que tudo esteja pronto antes do início do evento sem nenhum estresse para a sua equipe de produção.",
    },
  },
];

export const getCidadeBySlug = (slug: string): CidadeData | undefined => cidadesData.find((c) => c.slug === slug);

export const cidadeSlugMap: Record<string, string> = Object.fromEntries(cidadesData.map((c) => [c.cidade, c.slug]));
