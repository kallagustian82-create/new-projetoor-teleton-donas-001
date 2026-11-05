import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../mockData';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const goToNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(goToNext, 10000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const slide = heroSlides[currentSlide];

  const handleButtonClick = () => {
    if (slide.buttonLink.startsWith('/')) {
      navigate(slide.buttonLink);
    } else {
      window.open(slide.buttonLink, '_blank');
    }
  };

  return (
    <section data-testid="hero-carousel" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background layer */}
      {heroSlides.map((s, idx) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 1,
          }}
        >
          {s.backgroundImage ? (
            <img src={s.backgroundImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: s.id === 1
                ? 'linear-gradient(to right, #0ea5e9, #06b6d4, #14b8a6)'
                : 'linear-gradient(to right, #3b82f6, #9333ea, #06b6d4)',
            }} />
          )}
        </div>
      ))}

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px 60px', width: '100%' }}>
          <div style={{ display: 'flex', flexDirection: slide.reversed ? 'row-reverse' : 'row', alignItems: 'center', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* Oval Image */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 'min(420px, 80vw)',
                height: 'min(420px, 80vw)',
              }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'opacity 0.5s' }}
                />
              </div>
            </div>

            {/* Text */}
            <div style={{ color: 'white', maxWidth: '500px', flex: 1, minWidth: '280px' }}>
              <h1 style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '16px',
              }}>
                {slide.title}
              </h1>
              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                fontWeight: 300,
                lineHeight: 1.5,
                marginBottom: '24px',
                opacity: 0.95,
              }}>
                {slide.description}
              </p>
              <button
                data-testid="hero-cta-button"
                onClick={handleButtonClick}
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '14px 40px',
                  borderRadius: '50px',
                  border: '2px solid white',
                  background: 'white',
                  color: '#db2777',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                {slide.buttonText}
              </button>

              {/* Navigation controls */}
              <div data-testid="carousel-controls" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '32px',
              }}>
                <button
                  data-testid="hero-prev-button"
                  onClick={goToPrev}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  <ChevronLeft size={22} />
                </button>

                {heroSlides.map((s, index) => (
                  <button
                    key={s.id}
                    data-testid={`hero-dot-${index}`}
                    onClick={() => setCurrentSlide(index)}
                    style={{
                      height: '12px',
                      width: currentSlide === index ? '40px' : '12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: currentSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                      flexShrink: 0,
                    }}
                  />
                ))}

                <button
                  data-testid="hero-next-button"
                  onClick={goToNext}
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.15)',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                >
                  <ChevronRight size={22} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
