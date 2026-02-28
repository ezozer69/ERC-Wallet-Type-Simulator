import { useState, useEffect, useRef } from 'react';
import { Lock, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { securityConfig } from '../config';

// Icon lookup map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lock, Users, CheckCircle,
};

export function SecuritySection() {
  // Null check
  if (!securityConfig.mainTitle || securityConfig.tabs.length === 0) return null;

  const [activeTab, setActiveTab] = useState(securityConfig.tabs[0]?.id || '');
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

  const activeTabData = securityConfig.tabs.find((t) => t.id === activeTab);

  return (
    <section
      id="security"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #d2a855 1px, transparent 1px), linear-gradient(to bottom, #d2a855 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <div className="fade-up text-center mb-16">
          <span className="font-script text-3xl text-gold-400 block mb-2">{securityConfig.scriptText}</span>
          <span className="text-gold-500 text-xs uppercase tracking-[0.2em] mb-4 block">
            {securityConfig.subtitle}
          </span>
          <h2 className="font-serif text-h1 text-white whitespace-pre-line">{securityConfig.mainTitle}</h2>
          <p className="text-white/70 max-w-2xl mx-auto mt-6">{securityConfig.introText}</p>
        </div>

        {/* Timeline */}
        <div className="fade-up mb-16" style={{ transitionDelay: '0.1s' }}>
          <div className="flex flex-wrap justify-center gap-8">
            {securityConfig.timeline.map((item, index) => (
              <div key={index} className="text-center">
                <div className="font-serif text-2xl text-gold-500">{item.year}</div>
                <div className="text-white/60 text-sm mt-1">{item.event}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Tabs */}
          <div className="slide-in-left lg:col-span-1">
            <div className="space-y-3">
              {securityConfig.tabs.map((tab) => {
                const IconComponent = iconMap[tab.icon] || Lock;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-300 text-left ${
                      activeTab === tab.id
                        ? 'bg-gold-500/20 border border-gold-500/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      activeTab === tab.id ? 'bg-gold-500' : 'bg-white/10'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${activeTab === tab.id ? 'text-white' : 'text-gold-500'}`} />
                    </div>
                    <span className={`font-serif text-lg ${activeTab === tab.id ? 'text-white' : 'text-white/70'}`}>
                      {tab.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Year Badge */}
            <div className="mt-8 p-6 bg-white/[0.03] rounded-lg border border-white/10 text-center">
              <div className="font-serif text-4xl text-gold-500">{securityConfig.yearBadge}</div>
              <div className="text-white/50 text-sm mt-1">{securityConfig.yearBadgeLabel}</div>
            </div>

            {/* Opening Hours */}
            <div className="mt-4 p-4 bg-gold-500/10 rounded-lg border border-gold-500/20 text-center">
              <div className="text-gold-500 text-sm">{securityConfig.openingHoursLabel}</div>
              <div className="text-white font-serif text-lg">{securityConfig.openingHours}</div>
            </div>
          </div>

          {/* Center: Image */}
          <div className="fade-up lg:col-span-1" style={{ transitionDelay: '0.2s' }}>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {securityConfig.tabs.map((tab) => (
                <img
                  key={tab.id}
                  src={tab.image}
                  alt={tab.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    activeTab === tab.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/40 to-transparent" />
            </div>
          </div>

          {/* Right: Content */}
          <div className="slide-in-right lg:col-span-1">
            {activeTabData && (
              <div className="h-full flex flex-col">
                <div className="flex-1">
                  <h3 className="font-serif text-h3 text-white mb-4">{activeTabData.content.title}</h3>
                  <div className="w-16 h-px bg-gold-500 mb-6" />
                  <p className="text-white/70 leading-relaxed mb-6">{activeTabData.content.description}</p>
                  
                  <div className="p-4 bg-gold-500/10 rounded-lg border border-gold-500/20">
                    <span className="text-gold-500 text-xs uppercase tracking-wider">Key Feature</span>
                    <p className="text-white font-serif text-lg mt-1">{activeTabData.content.highlight}</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn-primary rounded-sm flex items-center gap-2 group mt-8"
                >
                  {securityConfig.ctaButtonText}
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quote */}
        {securityConfig.quote.text && (
          <div className="fade-up mt-16 max-w-3xl mx-auto text-center" style={{ transitionDelay: '0.3s' }}>
            {securityConfig.quote.prefix && (
              <span className="font-script text-3xl text-gold-400 block mb-4">{securityConfig.quote.prefix}</span>
            )}
            <blockquote className="text-white/80 text-lg italic leading-relaxed">
              "{securityConfig.quote.text}"
            </blockquote>
            {securityConfig.quote.attribution && (
              <cite className="text-gold-500 text-sm mt-4 block not-italic">
                — {securityConfig.quote.attribution}
              </cite>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
