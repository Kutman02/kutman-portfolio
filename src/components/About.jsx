import aboutData from '../assets/about.json';
import SkillBadge from './SkillBadge';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

function About() {
  const { t } = useTranslation();
  const [leftRef, isLeftVisible] = useScrollAnimation();
  const [rightRef, isRightVisible] = useScrollAnimation(0.2);

  // Преобразуем массив навыков в плоский массив
  const flattenedSkills = aboutData.skills.reduce((acc, skillGroup) => {
    return [...acc, ...skillGroup.technologies];
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t('about.title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <div
            ref={leftRef}
            className={`space-y-4 sm:space-y-6 transform transition-all duration-700 ${
              isLeftVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {t('about.description')}
            </p>
            <a href={aboutData.resumeLink} className="button-primary inline-block">
              {t('about.downloadResume')}
            </a>
          </div>

          <div
            ref={rightRef}
            className={`transform transition-all duration-700 ${
              isRightVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 md:mb-6">{t('about.skills')}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
              {flattenedSkills.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
