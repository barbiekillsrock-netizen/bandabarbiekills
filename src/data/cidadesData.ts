export interface CidadeData {
  cidade: string;
  slug: string;
  foco: string;
  hook: string;
  venues: string;
}

export const cidadesData: CidadeData[] = [
  {
    cidade: "Campinas",
    slug: "banda-casamento-campinas",
    foco: "Híbrido",
    hook: "Centro logístico e expertise em grandes produções de alto padrão.",
    venues: "Alma Campinas, Casa de Campo, The Royal Palm Plaza.",
  },
  {
    cidade: "São Paulo",
    slug: "evento-corporativo-sao-paulo",
    foco: "Híbrido",
    hook: "O epicentro dos grandes eventos e casamentos de luxo do país.",
    venues: "Casa Fasano, Villa Jockey, Buffet França.",
  },
  {
    cidade: "Alphaville",
    slug: "evento-corporativo-alphaville",
    foco: "Corporativo",
    hook: "Público executivo exigente e eventos de endomarketing de alto nível.",
    venues: "Blue Tree Premium, Iguatemi Business.",
  },
  {
    cidade: "Barueri",
    slug: "evento-corporativo-barueri",
    foco: "Corporativo",
    hook: "Polo empresarial vibrante com foco em tecnologia e serviços.",
    venues: "Centro de Eventos Barueri, Solarium.",
  },
  {
    cidade: "Holambra",
    slug: "banda-casamento-holambra",
    foco: "Casamento",
    hook: "Charme europeu, cidade das flores e cenários românticos.",
    venues: "Fazenda Vila Rica, Quinta das Videiras.",
  },
  {
    cidade: "Itu",
    slug: "banda-casamento-itu",
    foco: "Casamento",
    hook: "Fazendas históricas de luxo com pé direito alto e rusticidade chique.",
    venues: "Fazenda Vila Real, Fazenda Capoava, Vasselo.",
  },
  {
    cidade: "Jundiaí",
    slug: "banda-casamento-jundiai",
    foco: "Híbrido",
    hook: "Tradição e infraestrutura completa entre a capital e o interior.",
    venues: "Espaço G9, Solar da Marquesa, Multiplan.",
  },
  {
    cidade: "Indaiatuba",
    slug: "banda-casamento-indaiatuba",
    foco: "Casamento",
    hook: "Sofisticação rural e exclusividade no polo mundial de Polo.",
    venues: "Clube de Campo Helvetia, Villa de Reggio.",
  },
  {
    cidade: "Vinhedo",
    slug: "banda-casamento-vinhedo",
    foco: "Híbrido",
    hook: "Festas exclusivas em condomínios de alto padrão e castelos.",
    venues: "Castelo dos Vinhedos, Espaço Boulevard.",
  },
  {
    cidade: "Valinhos",
    slug: "banda-casamento-valinhos",
    foco: "Híbrido",
    hook: "Proximidade estratégica com Campinas e espaços em meio à natureza.",
    venues: "Fonte Santa Teresa, Hotel Itapema.",
  },
  {
    cidade: "Sorocaba",
    slug: "banda-casamento-sorocaba",
    foco: "Casamento",
    hook: "Grandes propriedades rurais e infraestrutura de ponta para noivas.",
    venues: "Villa Sansu, Fazenda Santa Maria.",
  },
  {
    cidade: "Paulínia",
    slug: "evento-corporativo-paulinia",
    foco: "Híbrido",
    hook: "Hub empresarial e centros de convenções de altíssima capacidade.",
    venues: "Premium Paulínia, Vitória Hotel Convention.",
  },
  {
    cidade: "Piracicaba",
    slug: "banda-casamento-piracicaba",
    foco: "Híbrido",
    hook: "Tradição do interior com eventos em locais históricos e usinas.",
    venues: "Engenho Central, Monte Alegre, Usina inovação.",
  },
  {
    cidade: "Americana",
    slug: "banda-casamento-americana",
    foco: "Híbrido",
    hook: "Polo industrial forte com tradição em grandes festas sociais.",
    venues: "Vila Americana, Espaço Beira Rio.",
  },
  {
    cidade: "Louveira",
    slug: "banda-casamento-louveira",
    foco: "Casamento",
    hook: "Tranquilidade e espaços charmosos em rotas gastronômicas.",
    venues: "Fazenda Santo Antonio, Villa de Lucca.",
  },
  {
    cidade: "Jaguariúna",
    slug: "banda-casamento-jaguariuna",
    foco: "Híbrido",
    hook: "Onde o clima de interior encontra a estrutura de grandes shows.",
    venues: "Red Eventos, Fazenda Santa Gertrudes.",
  },
  {
    cidade: "Atibaia",
    slug: "banda-casamento-atibaia",
    foco: "Casamento",
    hook: "Clima de montanha e resorts de grande porte para casamentos destino.",
    venues: "Bourbon Atibaia, Tauá Resort.",
  },
  {
    cidade: "Bragança Paulista",
    slug: "banda-casamento-braganca",
    foco: "Casamento",
    hook: "Paisagens deslumbrantes da represa e fazendas de alto luxo.",
    venues: "Villa Santo Agostinho, Fazenda Coronel Jacinto.",
  },
  {
    cidade: "São Caetano do Sul",
    slug: "evento-corporativo-sao-caetano",
    foco: "Corporativo",
    hook: "O coração do ABC com foco em eventos corporativos de precisão.",
    venues: "Buffet Napoleão, Espaço Win.",
  },
  {
    cidade: "Limeira",
    slug: "banda-casamento-limeira",
    foco: "Híbrido",
    hook: "Potência do agronegócio e joias, ideal para festas grandiosas.",
    venues: "Zarzuela Eventos, Maison de Luxe.",
  },
  {
    cidade: "Santana de Parnaíba",
    slug: "evento-corporativo-santana-parnaiba",
    foco: "Corporativo",
    hook: "Cenário histórico preservado vizinho a grandes centros empresariais.",
    venues: "Ville Sport Show, Espaços em Alphaville.",
  },
];

export const getCidadeBySlug = (slug: string): CidadeData | undefined => cidadesData.find((c) => c.slug === slug);

export const cidadeSlugMap: Record<string, string> = Object.fromEntries(cidadesData.map((c) => [c.cidade, c.slug]));
