import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { initiatives } from '../mockData';

// Dados estaticos da Campanha Rio Grande do Sul (mesmo formato das instituicoes)
const campanha = {
  name: 'Campanha Rio Grande do Sul',
  category: 'Emergências',
  region: 'Rio Grande do Sul',
  description: 'Neste momento, precisamos da sua solidariedade. O Rio Grande do Sul enfrenta uma nova onda de chuvas e enchentes. Milhares de famílias já estão fora de casa e centenas de cidades foram atingidas. #SOSRioGrandeDoSul',
  images: [
    'https://upload.wikimedia.org/wikipedia/commons/2/27/05.05.2024_-_Sobrevoo_das_%C3%A1reas_afetadas_pelas_chuvas_em_Canoas_-_53700500641.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/2/23/Imagens_a%C3%A9reas_de_Pelotas_durante_a_enchente_-_Foto_Michel_Corvello_%2853736836266%29.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/8/85/Sul_do_Brasil_2_de_Maio_de_2024.png',
  ],
  imageCaption: 'Imagens aéreas das comunidades afetadas no Rio Grande do Sul',
  disclaimer: 'Sua doação será direcionada às organizações parceiras que atuam no atendimento às vítimas das enchentes no Rio Grande do Sul.',
};

// Badge com gradiente (igual aos prints "POR QUE DOAR?" / "QUEM SOMOS?")
const SectionBadge = ({ title, gradient }) => (
  <div className="inline-flex items-center mb-6 mt-4">
    <div
      className={`bg-gradient-to-r ${gradient} text-white text-xl md:text-2xl font-bold px-6 py-2 tracking-wider uppercase`}
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      {title}
    </div>
  </div>
);

const CampanhaPernambuco = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const searchResults = searchQuery.length >= 2
    ? initiatives.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const images = campanha.images;
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleDoar = () => {
    navigate('/doacao/valor', { state: { institution: campanha.name, fromCampanha: true } });
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="campanha-pernambuco-page">
      <header className="bg-white shadow-sm py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <img
                src="https://customer-assets.emergentagent.com/job_8d70a88e-5643-4035-93e8-fcb605f0dda7/artifacts/aclmur09_globinho-branco.png"
                alt="Globo"
                className="w-8 h-8 md:hidden invert"
              />
              <button
                onClick={() => navigate('/')}
                className="hidden md:block text-gray-600 hover:text-gray-800 transition-colors"
                data-testid="campanha-back-btn"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <img
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png"
                alt="ParaQuemDoar"
                className="hidden md:block h-16"
              />
            </div>
            <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
              <img
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png"
                alt="ParaQuemDoar"
                className="h-6"
              />
            </div>
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  data-testid="search-input"
                  placeholder="Busca..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                  onFocus={() => setShowResults(true)}
                  onBlur={() => setTimeout(() => setShowResults(false), 200)}
                  className="w-full px-4 py-3 rounded-full border-2 border-blue-300 focus:border-purple-400 focus:outline-none transition-colors"
                />
                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border overflow-hidden z-50 max-h-80 overflow-y-auto">
                    {searchResults.map(item => (
                      <button
                        key={item.id}
                        data-testid={`search-result-${item.slug}`}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                        onMouseDown={() => { navigate(`/instituicao/${item.slug}`); setSearchQuery(''); setShowResults(false); }}
                      >
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-contain bg-gray-100 p-1" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category} &middot; {item.region}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
                {showResults && searchQuery.length >= 2 && searchResults.length === 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border p-4 z-50">
                    <p className="text-gray-500 text-sm text-center">Nenhuma instituição encontrada</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-blue-500 p-1 md:hidden">
                <Search className="w-5 h-5" />
              </button>
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm md:text-base text-gray-700">Iniciativa:</span>
                <img
                  src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/xr4t0foz_globo-roxo.png"
                  alt="Globo"
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Carrossel de Imagens */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img
                src={images[currentImageIndex]}
                alt={campanha.name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
                    data-testid="campanha-prev-image"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
                    data-testid="campanha-next-image"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                  </button>
                  <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                          currentImageIndex === index
                            ? 'bg-white w-6 md:w-8'
                            : 'bg-white/50 hover:bg-white/70 w-2.5 md:w-3'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            {campanha.imageCaption && (
              <p className="text-xs text-gray-500 text-left mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {campanha.imageCaption}
              </p>
            )}
          </div>

          {/* Info da Campanha */}
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="text-base">{campanha.category}</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pink-500 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {campanha.name}
            </h1>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
              {campanha.description}
            </p>

            <div className="py-4">
              <Button
                data-testid="fazer-doacao-btn"
                className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full px-12 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                onClick={handleDoar}
              >
                Fazer doação
              </Button>
            </div>

            {campanha.disclaimer && (
              <p className="text-sm text-pink-500 leading-relaxed max-w-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
                {campanha.disclaimer}
              </p>
            )}
          </div>
        </div>

        {/* Bloco POR QUE DOAR? */}
        <div className="mt-12 max-w-4xl">
          <SectionBadge title="POR QUE DOAR?" gradient="from-red-500 via-pink-500 to-purple-600" />
          <div className="space-y-5 text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <p>
              As fortes chuvas que atingem o Rio Grande do Sul, principalmente no Vale do Taquari, na região metropolitana de Porto Alegre e na Zona Sul, deixaram <strong>mais de 1.800 pessoas fora de casa</strong> e mais de <strong>200 municípios com danos</strong>. Rios como o Taquari, Caí, Jacuí, Sinos e Gravataí atingiram cota de inundação e famílias inteiras precisaram ser retiradas de áreas de risco.
            </p>
            <p>
              Doar é mais do que ajudar: é garantir dignidade e amparo nesse momento de emergência. Com as doações, conseguimos enviar itens essenciais como alimentos não perecíveis, água potável, roupas, cobertores, colchões, produtos de higiene e material de limpeza, além de apoiar ações de resgate, abrigo e reconstrução para quem mais precisa.
            </p>
            <p>
              Cada contribuição — seja alimento, item de higiene ou doação financeira — faz diferença na vida de quem enfrenta essa tragédia. Sua solidariedade pode salvar, acolher e acelerar a recuperação das famílias gaúchas afetadas.
            </p>
            <p className="font-bold text-gray-800">
              Se você puder, participe. Compartilhe também. Porque juntos conseguimos levar esperança para o Rio Grande do Sul. 💜
            </p>
          </div>

          {/* Botao Fazer doacao apos o primeiro texto */}
          <div className="mt-8">
            <Button
              data-testid="fazer-doacao-btn-meio"
              className="bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full px-12 py-5 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={handleDoar}
            >
              Fazer doação
            </Button>
          </div>
        </div>

        {/* Bloco QUEM SOMOS? */}
        <div className="mt-12 max-w-4xl">
          <SectionBadge title="QUEM SOMOS?" gradient="from-green-500 via-lime-400 to-yellow-400" />
          <div className="text-base md:text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
            <p>
              Essa é uma campanha promovida pela Globo, através da sua plataforma de fomento à cultura de doação ParaQuemDoar. A tecnologia digital e social de arrecadação é do Grupo Benfeitoria, ecossistema propulsor de impacto com mais de 15 anos de experiência, que desenvolveu e opera a plataforma ParaQuemDoar. Nesta campanha, através do Instituto Benfeitoria, o Grupo também é responsável por receber e repassar todas as doações aos projetos e produzir e divulgar relatório final com toda transparência que uma mobilização dessa precisa.
            </p>
          </div>
        </div>

        {/* Indicador da regiao no rodape (sem botao) */}
        <div className="mt-12 flex items-center justify-end border-t pt-8">
          <div className="flex items-center space-x-2 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{campanha.region}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampanhaPernambuco;
