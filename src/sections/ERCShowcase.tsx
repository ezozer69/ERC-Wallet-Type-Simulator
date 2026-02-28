import { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Layers, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { ercShowcaseConfig } from '../config';

// Icon lookup map for dynamic icon resolution from config strings
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Zap, Layers,
};

export function ERCShowcase() {
  // Null check: if config is empty, render nothing
  if (!ercShowcaseConfig.mainTitle || ercShowcaseConfig.standards.length === 0) return null;

  const [activeStandard, setActiveStandard] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const elements = sectionRef.current?.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const standards = ercShowcaseConfig.standards;
  const features = ercShowcaseConfig.features;
  const quote = ercShowcaseConfig.quote;
  const standard = standards[activeStandard];

  const nextStandard = () => setActiveStandard((prev) => (prev + 1) % standards.length);
  const prevStandard = () => setActiveStandard((prev) => (prev - 1 + standards.length) % standards.length);

  return (
    <section
      id="standards"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #d2a855 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Section Title */}
        <div className="fade-up text-center mb-16">
          <span className="font-script text-3xl text-gold-400 block mb-2">{ercShowcaseConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {ercShowcaseConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{ercShowcaseConfig.mainTitle}</h2>
        </div>

        {/* Standard Tabs */}
        <div className="fade-up flex flex-wrap justify-center gap-2 mb-16" style={{ transitionDelay: '0.1s' }}>
          {standards.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActiveStandard(i)}
              className={`px-4 py-2 rounded-sm text-sm transition-all duration-300 ${
                i === activeStandard
                  ? 'bg-gold-500 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: Standard Info */}
          <div className="slide-in-left lg:col-span-2 order-2 lg:order-1">
            {/* Year + Name */}
            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-serif text-5xl lg:text-6xl text-gold-500/30 leading-none">{standard.year}</span>
                <div>
                  <h2 className="font-serif text-h3 text-white leading-tight">{standard.name}</h2>
                  <span className="font-script text-xl text-gold-400">{standard.subtitle}</span>
                </div>
              </div>
              <div className="w-16 h-px bg-gold-500 mt-4" />
            </div>

            {/* Description */}
            <p className="text-white/85 leading-relaxed mb-6">{standard.description}</p>

            {/* Key Features */}
            <div className="mb-6">
              <h4 className="text-gold-500 text-xs uppercase tracking-wider mb-3">Key Functions</h4>
              <pre className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap font-mono bg-white/5 p-4 rounded-lg border border-white/10">
                {standard.keyFeatures}
              </pre>
            </div>

            {/* Use Cases */}
            <div className="mb-6">
              <h4 className="text-gold-500 text-xs uppercase tracking-wider mb-2">Common Use Cases</h4>
              <p className="text-white/65 text-sm leading-relaxed">{standard.useCases}</p>
            </div>

            {/* Developer Note */}
            <div className="p-4 bg-gold-500/10 rounded-lg border border-gold-500/20 mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-gold-500 text-xs uppercase tracking-wider">Developer Note</span>
              </div>
              <p className="text-white/70 text-sm italic">{standard.developerNote}</p>
            </div>

            {/* CTA */}
            <a
              href={`https://eips.ethereum.org/EIPS/eip-${standard.name.toLowerCase().replace('erc-', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary rounded-sm flex items-center gap-2 group inline-flex"
            >
              View Official EIP
              <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Center: Standard Image */}
          <div className="lg:col-span-1 order-1 lg:order-2 flex justify-center">
            <div className="relative" style={{ width: '280px', height: '380px' }}>
              {/* Glow */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none`}>
                <div className={`w-48 h-48 ${standard.glowColor} rounded-full blur-3xl transition-colors duration-700`} />
              </div>

              {/* Images */}
              {standards.map((s, i) => (
                <img
                  key={s.id}
                  src={s.image}
                  alt={`${s.name} - ${s.subtitle}`}
                  loading={i === 0 ? undefined : 'lazy'}
                  style={s.filter ? { filter: s.filter } : undefined}
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg z-10 drop-shadow-2xl transition-all duration-700 ${
                    i === activeStandard
                      ? 'opacity-100 scale-100 translate-y-0'
                      : i < activeStandard
                        ? 'opacity-0 scale-90 -translate-y-6 pointer-events-none'
                        : 'opacity-0 scale-90 translate-y-6 pointer-events-none'
                  }`}
                />
              ))}

              {/* Switcher Arrows */}
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
                <button
                  onClick={prevStandard}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Previous standard"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-white/50 font-serif tabular-nums whitespace-nowrap">
                  {activeStandard + 1} / {standards.length}
                </span>
                <button
                  onClick={nextStandard}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-gold-500 hover:border-gold-500 transition-all duration-300"
                  aria-label="Next standard"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right: Features + Quote */}
          <div className="slide-in-right lg:col-span-2 order-3">
            <div className="space-y-6">
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon] || Shield;
                return (
                  <div
                    key={feature.title}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-gold-500/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-gold-500" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-white mb-1">{feature.title}</h3>
                      <p className="text-sm text-white/65 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quote */}
            {quote.text && (
              <div className="mt-10 p-6 bg-white/[0.03] rounded-lg border-l-2 border-gold-500/50">
                {quote.prefix && <p className="font-script text-2xl text-gold-400 mb-2">{quote.prefix}</p>}
                <p className="text-white/70 text-sm italic leading-relaxed">
                  "{quote.text}"
                </p>
                {quote.attribution && <p className="text-gold-500 text-xs mt-3">— {quote.attribution}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
