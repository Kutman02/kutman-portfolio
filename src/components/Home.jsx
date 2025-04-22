function Home() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            <span className="block">Привет, я</span>
            <span className="block text-blue-500 mt-2">Веб-разработчик</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto">
            Создаю современные и отзывчивые веб-приложения
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#projects" className="button-primary w-full sm:w-auto">
              Мои проекты
            </a>
            <a href="#contact" className="button-secondary w-full sm:w-auto">
              Связаться со мной
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
