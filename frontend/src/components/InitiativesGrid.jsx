import React, { useState } from 'react';
import { initiatives } from '../mockData';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const InitiativeCard = ({ initiative, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      data-testid={`initiative-card-${initiative.id}`}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative w-full bg-gray-100 flex items-center justify-center" style={{ paddingBottom: '65%' }}>
        <img 
          src={initiative.image} 
          alt={initiative.name}
          className={`absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 ${
            isHovered ? 'scale-105' : 'scale-100'
          }`}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center text-gray-500 text-xs mb-2">
          <MapPin className="w-3.5 h-3.5 mr-1" />
          <span>{initiative.region}</span>
        </div>

        <h3 className="text-lg font-bold text-pink-500 mb-2 leading-tight">
          {initiative.name}
        </h3>

        <p className="text-gray-600 leading-relaxed line-clamp-2 text-sm">
          {initiative.description}
        </p>
      </div>
    </div>
  );
};

const InitiativesGrid = () => {
  const navigate = useNavigate();

  return (
    <section id="initiatives" data-testid="initiatives-section" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-pink-500 mb-2">
            Instituições que apoiamos
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Conheça as organizações que fazem a diferença
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {initiatives.map((initiative) => (
            <InitiativeCard 
              key={initiative.id} 
              initiative={initiative} 
              onClick={() => navigate(`/instituicao/${initiative.slug}`)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativesGrid;
