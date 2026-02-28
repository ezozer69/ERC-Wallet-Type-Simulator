import { useState, useCallback } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { ERCShowcase } from './sections/ERCShowcase';
import { SolutionsCarousel } from './sections/SolutionsCarousel';
import { SecuritySection } from './sections/SecuritySection';
import { News } from './sections/News';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-[#141414] ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <ERCShowcase />
          <SolutionsCarousel />
          <SecuritySection />
          <News />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
