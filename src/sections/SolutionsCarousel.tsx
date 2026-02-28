import { useState, useEffect, useRef, useCallback } from 'react';
import { MapPin, ArrowRight } from 'lucide-react';
import { solutionsCarouselConfig } from '../config';

export function SolutionsCarousel() {
  // Null check
  if (!solutionsCarouselConfig.mainTitle || solutionsCarouselConfig.slides.length === 0) return null;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const slides = solutionsCarouselConfig.slides;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  // Auto-advance slides
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAutoPlaying, nextSlide]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="fade-up mb-12">
          <span className="font-script text-3xl text-gold-400 block mb-2">{solutionsCarouselConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {solutionsCarouselConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{solutionsCarouselConfig.mainTitle}</h2>
        </div>

        {/* Location Tag */}
        <div className="fade-up flex items-center gap-2 mb-8" style={{ transitionDelay: '0.1s' }}>
          <MapPin className="w-4 h-4 text-gold-500" />
          <span className="text-white/60 text-sm">{solutionsCarouselConfig.locationTag}</span>
        </div>

        {/* Carousel */}
        <div className="fade-up relative" style={{ transitionDelay: '0.2s' }}>
          <div className="relative overflow-hidden rounded-lg">
            {/* Slides */}
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0"
                >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    {/* Image */}
                    <div className="relative aspect-video lg:aspect-[4/3] overflow-hidden rounded-lg">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        loading={index === 0 ? undefined : 'lazy'}
                        className="w-full h-full object-cover transition-transform duration-[6000ms] ease-out"
                        style={{
                          transform: activeSlide === index ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <div className="flex items-baseline gap-3 mb-4">
                        <span className="font-serif text-5xl text-gold-500/30">{slide.area}</span>
                        <span className="text-white/50 text-sm uppercase tracking-wider">{slide.unit}</span>
                      </div>
                      
                      <h3 className="font-serif text-h3 text-white mb-2">{slide.title}</h3>
                      <span className="font-script text-xl text-gold-400 block mb-6">{slide.subtitle}</span>
                      
                      <p className="text-white/70 leading-relaxed mb-8">{slide.description}</p>

                      <button 
                        onClick={() => {
                          const element = document.querySelector('#contact');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="btn-primary rounded-sm flex items-center gap-2 group"
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === activeSlide
                    ? 'w-8 bg-gold-500'
                    : 'w-4 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
