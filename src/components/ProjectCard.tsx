/**
 * @fileoverview Компонент карточки проекта
 */

import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import type { ProjectCardProps } from '../types/components';

/**
 * Компонент карточки проекта
 */
function ProjectCard({ id, title, description, image, technologies, link, github }: ProjectCardProps) {
  const [ref, isVisible] = useScrollAnimation();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { t } = useTranslation();

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      } ${isHovered ? 'shadow-2xl shadow-blue-500/10 border-white/10 -translate-y-2' : 'shadow-lg'}`}
    >
      {/* Декоративный градиент при hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-600/0 to-purple-600/0 transition-opacity duration-500 ${isHovered ? 'opacity-10' : 'opacity-0'}`}></div>

      {/* Изображение */}
      <Link to={`/project/${id}`} className="block relative overflow-hidden">
        <div className="relative aspect-video bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
          {!imageError ? (
            <>
              <img
                src={image}
                alt={title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isHovered ? 'scale-110 brightness-110' : 'scale-100 brightness-90'
                }`}
                onError={handleImageError}
              />
              {/* Overlay при hover */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
              {/* Иконка просмотра */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="bg-white/10 backdrop-blur-md rounded-full p-4 border border-white/20">
                  <FaArrowRight className="text-white text-2xl" />
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">📄</div>
                <span className="text-sm">{title}</span>
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Контент карточки */}
      <div className="p-6 space-y-4 relative z-10">
        {/* Заголовок */}
        <div>
          <Link to={`/project/${id}`}>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {title}
            </h3>
          </Link>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Технологии */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.slice(0, 4).map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 rounded-md transition-all duration-200 backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="px-3 py-1 text-xs font-medium bg-white/5 border border-white/10 text-gray-400 rounded-md">
                +{technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            to={`/project/${id}`}
            className="group/btn flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40"
          >
            <span>{t('Projects.ViewProject')}</span>
            <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Link>
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white text-sm font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm"
            >
              <FaGithub />
              <span>{t('Projects.ViewRepo')}</span>
            </a>
          )}
        </div>
      </div>

      {/* Декоративная линия внизу */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-transform duration-500 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}></div>
    </div>
  );
}

export default ProjectCard;
