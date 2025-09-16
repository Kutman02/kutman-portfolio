import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  const [contactMethodsRef, isContactMethodsVisible] = useScrollAnimation();

  const contactMethods = [
    { platform: 'Email', icon: 'envelope', url: 'kutmank9@gmail.com' },
    { platform: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/kutmanbek-kubanychbek-uulu-623660303/' },
    { platform: 'GitHub', icon: 'github', url: 'https://github.com/Kutman02' },
    { platform: 'Telegram', icon: 'telegram', url: 'https://t.me/Kutmanbek_kg' },
  ];

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t('contact.title')}</h2>
        <div className="max-w-3xl mx-auto">
          <div
            ref={contactMethodsRef}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8 transform transition-all duration-700 ${
              isContactMethodsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}>
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:bg-gray-700/50 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/20">
                  <i className={`text-2xl text-blue-400 fas fa-${method.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{method.platform}</h3>
                  <p className="text-gray-300 text-sm">{method.url}</p>
                </div>
              </a>
            ))}
          </div>
        
          
        </div>
      </div>
    </section>
  );
}

export default Contact;
