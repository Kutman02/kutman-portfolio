/**
 * @fileoverview Компонент секции контактов
 */

import { useEffect } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchContacts } from '../store/slices/contactsSlice';
import { fetchResume } from '../store/slices/resumeSlice';

// Иконки
import { 
  FaEnvelope, FaLinkedin, FaGithub, FaTelegram, 
  FaTwitter, FaInstagram, FaFacebook, FaWhatsapp,
  FaFileDownload, FaExternalLinkAlt
} from "react-icons/fa";

const iconMap = {
  FaEnvelope: FaEnvelope,
  FaLinkedin: FaLinkedin,
  FaGithub: FaGithub,
  FaTelegram: FaTelegram,
  FaTwitter: FaTwitter,
  FaInstagram: FaInstagram,
  FaFacebook: FaFacebook,
  FaWhatsapp: FaWhatsapp
};

/**
 * Компонент секции контактов
 */
function Contact() {
  const dispatch = useAppDispatch();
  const [contactMethodsRef, isContactMethodsVisible] = useScrollAnimation();
  const contacts = useAppSelector((state) => state.contacts.items);
  const resume = useAppSelector((state) => state.resume);

  useEffect(() => {
    dispatch(fetchContacts());
    dispatch(fetchResume());
  }, [dispatch]);

  const mappedContacts = contacts.map(contact => {
    const IconComponent = iconMap[contact.icon] || FaEnvelope;
    return {
      platform: contact.platform,
      icon: <IconComponent size={28} />,
      url: contact.url
    };
  });

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Связаться со мной</h2>

        <div className="max-w-3xl mx-auto">
          <div
            ref={contactMethodsRef}
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mb-8 transform transition-all duration-700 ${
              isContactMethodsVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          >
            {mappedContacts.map((method, index) => (
              <a
                key={index}
                href={method.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover:bg-gray-700/50 flex items-center gap-4 p-4 rounded-xl transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                  {method.icon}
                </div>

                <div>
                  <h3 className="text-lg font-semibold">{method.platform}</h3>
                  <p className="text-gray-300 text-sm break-all">{method.url}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Кнопки резюме */}
          {resume && (resume.file || resume.fileUrl || resume.externalLink) && (
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              {(resume.file || resume.fileUrl) && (
                <a
                  href={resume.file || resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <FaFileDownload />
                  <span>Скачать резюме</span>
                </a>
              )}
              {resume.externalLink && (
                <a
                  href={resume.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                >
                  <FaExternalLinkAlt />
                  <span>Посмотреть резюме</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contact;
