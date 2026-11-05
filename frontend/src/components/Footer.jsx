import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white overflow-hidden">
      {/* NO decorative circles - clean gradient only */}
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Column 1 - Globo */}
          <div>
            <h3 className="text-base md:text-lg font-light mb-6">Um projeto</h3>
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/2xhoeuv9_globo%20%281%29.png" 
              alt="Globo" 
              className="h-12 md:h-16"
            />
          </div>

          {/* Column 2 - Benfeitoria */}
          <div>
            <h3 className="text-base md:text-lg font-light mb-6">Realização</h3>
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/i0z2us06_benfeitoria.png" 
              alt="Benfeitoria" 
              className="h-10 md:h-12"
            />
          </div>

          {/* Column 3 - Links */}
          <div>
            <h3 className="text-base md:text-lg font-light mb-6">Início</h3>
            <ul className="space-y-3 text-sm md:text-base font-light">
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Sobre</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Parcerias</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Encontre uma iniciativa</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Termos de uso</a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center md:justify-end mb-8">
          <Button
            className="bg-white text-orange-500 hover:bg-orange-50 rounded-full px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-normal border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => alert('Indicar uma iniciativa')}
          >
            Indicar uma iniciativa
          </Button>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/20 text-center text-xs md:text-sm opacity-80">
          <p>© {new Date().getFullYear()} Para Quem Doar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
