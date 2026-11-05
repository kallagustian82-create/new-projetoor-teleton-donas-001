import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { blogPosts, initiatives } from '../mockData';

const BlogPostPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const post = blogPosts.find(p => p.slug === slug);

  const searchResults = searchQuery.length >= 2
    ? initiatives.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Artigo não encontrado</h1>
          <Button onClick={() => navigate('/')} className="bg-pink-500 text-white rounded-full px-8 py-3">
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  const images = post.images && post.images.length > 0 ? post.images : [post.image];
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center space-x-3">
              <img src="https://customer-assets.emergentagent.com/job_8d70a88e-5643-4035-93e8-fcb605f0dda7/artifacts/aclmur09_globinho-branco.png" alt="Globo" className="w-8 h-8 md:hidden invert" />
              <button onClick={() => navigate('/')} className="hidden md:block text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <img src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png" alt="ParaQuemDoar" className="hidden md:block h-16" />
            </div>
            <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
              <img src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png" alt="ParaQuemDoar" className="h-6" />
            </div>
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  data-testid="blog-search-input"
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
                      <button key={item.id} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left" onMouseDown={() => { navigate(`/instituicao/${item.slug}`); setSearchQuery(''); }}>
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-contain bg-gray-100 p-1" />
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.category} &middot; {item.region}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center">
              <button className="text-blue-500 p-1 md:hidden"><Search className="w-5 h-5" /></button>
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm md:text-base text-gray-700">Iniciativa:</span>
                <img src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/xr4t0foz_globo-roxo.png" alt="Globo" className="h-10" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        {/* Carrossel de imagens */}
        <div className="relative max-w-4xl mx-auto mb-10">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl">
            <img src={images[currentImageIndex]} alt={post.title} className="w-full h-full object-cover" />
            {images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg">
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all shadow-lg">
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {images.map((_, i) => (
                    <button key={i} onClick={() => setCurrentImageIndex(i)} className={`h-2.5 rounded-full transition-all ${currentImageIndex === i ? 'bg-white w-6' : 'bg-white/50 w-2.5'}`} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Conteúdo do post */}
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-500 font-semibold text-sm uppercase tracking-wider">Para Quem Doar Blog</span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mt-3 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {post.title}
          </h1>
          <div className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line mb-10" style={{ fontFamily: "'Nunito', sans-serif" }}>
            {post.content}
          </div>

          {/* Botão Fazer Doação */}
          <div className="border-t pt-8 flex flex-col sm:flex-row items-center gap-4">
            <Button
              data-testid="blog-doar-btn"
              className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-12 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/doacao/valor')}
            >
              Fazer doação
            </Button>
            <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700 transition-colors text-sm">
              Voltar ao início
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
