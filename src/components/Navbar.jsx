import { useState } from 'react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-gray-900/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#home" className="text-xl font-bold">
              Portfolio
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
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
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="#home" className="nav-link">
              Главная
            </a>
            <a href="#about" className="nav-link">
              Обо мне
            </a>
            <a href="#projects" className="nav-link">
              Проекты
            </a>
            <a href="#contact" className="nav-link">
              Контакты
            </a>
          </div>
        </div>

        {/* Mobile menu panel */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="nav-link block px-3 py-2 rounded-md">
                Главная
              </a>
              <a href="#about" className="nav-link block px-3 py-2 rounded-md">
                Обо мне
              </a>
              <a href="#projects" className="nav-link block px-3 py-2 rounded-md">
                Проекты
              </a>
              <a href="#contact" className="nav-link block px-3 py-2 rounded-md">
                Контакты
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
