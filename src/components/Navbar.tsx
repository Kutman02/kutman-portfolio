import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll(); // вызов сразу при монтировании
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-none flex items-center space-x-4">
            <a
              href="#home"
              className="text-xl sm:text-2xl font-bold hover:text-blue-400 transition-colors">
              KutSoft
            </a>
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors">
              {i18n.language === 'ru' ? 'EN' : 'RU'}
            </button>
          </div>

          {/* Mobile menu button - фиксированная ширина и позиционирование */}
          <div className="md:hidden flex-none w-12">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none transition-colors"
              aria-label="Открыть меню">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8 flex-none">
            <a href="#home" className="nav-link">
              {t('nav.home')}
            </a>
            <a href="#about" className="nav-link">
              {t('nav.about')}
            </a>
            <a href="#projects" className="nav-link">
              {t('nav.projects')}
            </a>
            <a href="#contact" className="nav-link">
              {t('nav.contact')}
            </a>
          </div>
        </div>

        {/* Mobile menu panel */}
        <div
          className={`md:hidden fixed left-0 right-0 transition-all duration-300 px-4 ${
            isMenuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}>
          <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg mt-2">
            <div className="py-2 space-y-1">
              <a href="#home" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                {t('nav.home')}
              </a>
              <a href="#about" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                {t('nav.about')}
              </a>
              <a href="#projects" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                {t('nav.projects')}
              </a>
              <a href="#contact" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                {t('nav.contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
