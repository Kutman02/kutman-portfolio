import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="pt-16">
        {' '}
        {/* Add padding-top to account for fixed navbar */}
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

export default App;
