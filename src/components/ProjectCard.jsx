import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';

import { useTranslation } from 'react-i18next';

function ProjectCard({ title, description, image, technologies, link, github }) {
  const [ref, isVisible] = useScrollAnimation();
  const [imageError, setImageError] = useState(false);
  const { t } = useTranslation();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      ref={ref}
      className={`card group transform transition-all duration-700 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      }`}>
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-video bg-gray-700">
        {!imageError ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span>{title}</span>
          </div>
        )}
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm sm:text-base mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs sm:text-sm bg-blue-600/20 text-blue-400 rounded-full">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="button-primary inline-block w-full sm:w-auto text-center">
          {t('Projects.ViewProject')}
        </a>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary inline-block w-full sm:w-auto text-center">
            {t('Projects.ViewRepo')}
          </a>
        )}
      </div>
    </div>
  );
}

export default ProjectCard;
