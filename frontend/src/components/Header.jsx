import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { initiatives } from '../mockData';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const searchResults = searchQuery.length >= 2
    ? initiatives.filter(i =>
        i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        i.region.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_8d70a88e-5643-4035-93e8-fcb605f0dda7/artifacts/rpf2hr5m_globinho-branco.png" 
              alt="Globo" 
              className="md:hidden w-7 h-7 flex-shrink-0"
            />
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/zxsfbrbt_logo-horizontal.png" 
              alt="ParaQuemDoar" 
              className="hidden md:block h-14 brightness-0 invert"
            />
          </div>

          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/zxsfbrbt_logo-horizontal.png" 
              alt="ParaQuemDoar" 
              className="h-8 brightness-0 invert"
            />
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5 z-10" />
              <Input
                type="text"
                data-testid="header-search-input"
                placeholder="Busca..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-orange-300 bg-white/95 backdrop-blur-sm text-gray-700 placeholder:text-orange-400 focus:border-orange-400 focus:bg-white transition-all"
              />
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border overflow-hidden z-50 max-h-80 overflow-y-auto">
                  {searchResults.map(item => (
                    <button
                      key={item.id}
                      data-testid={`header-search-result-${item.slug}`}
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
            <button className="text-white p-1 md:hidden">
              <Search className="w-5 h-5" />
            </button>
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm md:text-base text-white font-light">Iniciativa:</span>
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/y6iwz76t_globo.png" 
                alt="Globo" 
                className="h-10 brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
