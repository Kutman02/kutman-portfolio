import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
//import Test from './components/Test';
import './App.css';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-900 overflow-x-hidden">
        <Navbar />
        {/*<Test />*/}
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
    </LanguageProvider>
  );
}

export default App;
