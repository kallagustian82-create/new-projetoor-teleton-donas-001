import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { themes, regions } from '../mockData';
import { ArrowRight } from 'lucide-react';

const ProjectFinder = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (selectedTheme && selectedRegion) {
      setShowResults(true);
      setTimeout(() => {
        document.getElementById('initiatives')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <section className="relative py-16 md:py-24 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-48 h-64 md:w-80 md:h-96 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-25"></div>
      <div className="absolute bottom-20 left-20 w-64 h-80 md:w-96 md:h-[500px] rounded-full bg-gradient-to-br from-pink-400 to-red-500 opacity-20"></div>
      <div className="absolute top-1/3 right-1/4 w-40 h-52 md:w-56 md:h-72 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-25"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-44 md:w-48 md:h-60 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-2xl md:max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="text-pink-500">Quer encontrar projetos</span>
            <br />
            <span className="text-pink-500">com a sua cara?</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg mb-10 md:mb-12">
            Descubra em 2 perguntas quais iniciativas combinam mais com você:
          </p>

          <div className="space-y-6 md:space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <label className="text-base md:text-lg font-semibold text-gray-800">
                1. Quais temas mexem com você?
              </label>
              <Select onValueChange={setSelectedTheme} value={selectedTheme}>
                <SelectTrigger className="w-full h-12 md:h-14 text-base border-2 border-gray-300 hover:border-pink-400 transition-colors rounded-lg">
                  <SelectValue placeholder="Selecione um tema" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme} className="text-base">
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="text-base md:text-lg font-semibold text-gray-800">
                2. Gostaria de apoiar iniciativas de qual região?
              </label>
              <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                <SelectTrigger className="w-full h-12 md:h-14 text-base border-2 border-gray-300 hover:border-pink-400 transition-colors rounded-lg">
                  <SelectValue placeholder="Selecione uma região" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region} className="text-base">
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={!selectedTheme || !selectedRegion}
              className="bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full px-6 md:px-8 py-5 md:py-6 text-base font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Encontre sua iniciativa</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectFinder;