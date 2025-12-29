import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';

function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <Navbar />
      <main className="relative w-full">
        <Home />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-gray-800/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}

export default Portfolio;

