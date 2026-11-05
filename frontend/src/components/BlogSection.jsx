import React, { useState } from 'react';
import { blogPosts } from '../mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const BlogSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= blogPosts.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 ? Math.max(0, blogPosts.length - itemsPerView) : prev - itemsPerView
    );
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-32 h-48 md:w-48 md:h-64 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-48 h-64 md:w-64 md:h-80 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 opacity-25"></div>
      <div className="absolute top-1/2 right-10 w-40 h-56 md:w-56 md:h-72 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-12 space-y-4 md:space-y-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            <span className="text-gray-800">Para Quem Doar</span>
            <span className="text-pink-500">Blog</span>
          </h2>
          <Button
            className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-6 py-3 font-semibold transition-all duration-300 text-sm md:text-base"
            onClick={() => navigate('/doacao')}
          >
            Ler todos os artigos
          </Button>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-2 md:-left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 z-10 shadow-lg"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-2 md:-right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 z-10 shadow-lg"
            disabled={currentIndex + itemsPerView >= blogPosts.length}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {visiblePosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
                onClick={() => navigate(`/blog/${post.slug}`)}
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <button 
                    className="text-pink-500 font-semibold hover:text-pink-600 transition-colors duration-300 flex items-center space-x-2 text-sm md:text-base"
                    onClick={(e) => { e.stopPropagation(); navigate(`/blog/${post.slug}`); }}
                  >
                    <span>Saiba mais</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;