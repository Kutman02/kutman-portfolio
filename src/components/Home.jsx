import { useTranslation } from 'react-i18next';
function Home() {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <img
              src={t('img.profilePhoto')}
              alt={t('img.profilePhotoAlt')}
              className="rounded-full object-cover w-full h-full shadow-2xl border-4 border-blue-500"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-6 md:space-y-8 flex-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
              <span className="block">{t('hero.greeting')}</span>
              <span className="block text-blue-500 mt-2">{t('hero.profession')}</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl max-w-2xl">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
              <a href="#projects" className="button-primary w-full sm:w-auto">
                {t('Projects.ViewProjects')}
              </a>
              <a href="#contact" className="button-secondary w-full sm:w-auto">
                {t('contact.title')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
