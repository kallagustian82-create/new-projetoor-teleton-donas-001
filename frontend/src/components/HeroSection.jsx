import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative min-h-screen md:h-[80vh] md:max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/mu01vg4k_Frame-31-%281%29%5B1%5D%5B1%5D%5B1%5D.png" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center md:justify-center gap-8 md:gap-12 h-full pt-20 pb-6 md:py-16">
          {/* Left Image - visible on all screens */}
          <div className="flex-shrink-0 mt-4 md:mt-0">
            <div className="w-[85vw] h-[85vw] max-w-[380px] max-h-[380px] md:w-[520px] md:h-[520px] md:max-w-none md:max-h-none rounded-full overflow-hidden shadow-2xl">
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/2ltjm6aw_Base-para-bolinha-PQD-%2846%29.png" 
                alt="Emergencia climatica em MG"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content - same width as image on mobile */}
          <div className="text-white text-left md:text-left max-w-2xl w-[85vw] max-w-[380px] md:max-w-2xl md:w-auto px-0 md:px-0">
            <h1 className="text-[34px] md:text-[42px] font-bold leading-tight mb-1 md:mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Emergência climática
            </h1>
            
            <p className="text-[22px] md:text-[36px] font-light leading-snug md:leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Conheça e doe para organizações que apoiam as vítimas da tragédia em MG
            </p>
            
            <Button 
              className="mt-4 md:mt-8 bg-transparent text-white hover:bg-white/10 rounded-full px-12 md:px-12 py-4 md:py-6 text-lg md:text-lg border-2 border-white shadow-lg transition-all duration-300 hover:scale-105 md:bg-white md:text-pink-600 md:hover:bg-pink-50"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
              onClick={() => navigate('/doacao')}
            >
              <span className="md:hidden">Doar para Juiz de Fora</span>
              <span className="hidden md:inline">Doar para Juiz de Fora</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;