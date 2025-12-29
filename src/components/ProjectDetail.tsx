/**
 * @fileoverview Компонент детальной страницы проекта
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjectById, clearCurrentProject } from '../store/slices/projectsSlice';
import Navbar from './Navbar';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaPlay, FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';

/**
 * Компонент детальной страницы проекта
 */
function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { currentProject: project, loading } = useAppSelector((state) => state.projects);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    }
    return () => {
      dispatch(clearCurrentProject());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (project?.images && project.images.length > 0) {
      setSelectedImage(0);
    }
  }, [project]);

  useEffect(() => {
    // Закрытие полноэкранного режима по ESC
    const handleEscape = (e) => {
      if (e.key === 'Escape' && fullscreenImage !== null) {
        setFullscreenImage(null);
      }
    };

    if (fullscreenImage !== null) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenImage]);

  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return null;
    // Параметры для воспроизведения inline на мобильных устройствах
    const params = new URLSearchParams({
      playsinline: '1',        // Воспроизведение inline на iOS
      enablejsapi: '1',        // Включить JavaScript API
      rel: '0',                // Не показывать похожие видео
      modestbranding: '1',     // Минимальный брендинг
      controls: '1',           // Показать контролы
      fs: '1',                 // Разрешить полноэкранный режим
      iv_load_policy: '3',     // Не показывать аннотации
      cc_load_policy: '0',     // Не показывать субтитры по умолчанию
      origin: window.location.origin
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
  };

  const openFullscreen = (index) => {
    setFullscreenImage(index);
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
  };

  const nextImage = () => {
    const allImages = project?.images && project.images.length > 0 
      ? [project.image, ...project.images]
      : [project?.image];
    setFullscreenImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    const allImages = project?.images && project.images.length > 0 
      ? [project.image, ...project.images]
      : [project?.image];
    setFullscreenImage((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">Проект не найден</div>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }

  const allImages = project.images && project.images.length > 0 
    ? [project.image, ...project.images]
    : [project.image];
  
  const youtubeEmbedUrl = getYouTubeEmbedUrl(project.youtubeVideo);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      {/* Back Button - Inside content with top padding for navbar */}
      <div className="pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-gray-800">
          <button
            onClick={() => navigate('/#projects')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <FaArrowLeft />
            <span>Назад к проектам</span>
          </button>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{project.title}</h1>

        {/* Desktop Layout: Left (Media) / Right (Content) */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Left Side - Media (Desktop) / Top (Mobile) */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6 mb-8 lg:mb-0" style={{ zIndex: 1 }}>
            {/* Main Image Gallery */}
            <div>
              <div className="relative w-full h-64 sm:h-96 md:h-[500px] rounded-lg overflow-hidden bg-gray-800 mb-4 group">
                {allImages[selectedImage] && !imageError ? (
                  <>
                    <img
                      src={allImages[selectedImage]}
                      alt={`${project.title} - Image ${selectedImage + 1}`}
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-300 group-hover:scale-105"
                      onError={() => setImageError(true)}
                      onClick={() => openFullscreen(selectedImage)}
                    />
                    <button
                      onClick={() => openFullscreen(selectedImage)}
                      className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Полноэкранный режим"
                    >
                      <FaExpand />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Изображение не загружено
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedImage(index);
                        setImageError(false);
                      }}
                      className={`flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-500 scale-105'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* YouTube Video */}
            {youtubeEmbedUrl && (
              <div className="w-full">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <FaPlay className="text-red-500" />
                  Видео о проекте
                </h2>
                <div 
                  className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    isolation: 'isolate'
                  }}
                >
                  <iframe
                    src={youtubeEmbedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                    className="absolute inset-0 w-full h-full"
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                      pointerEvents: 'auto',
                      touchAction: 'manipulation'
                    }}
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Content (Desktop) / Bottom (Mobile) */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">Описание</h2>
              <p className="text-gray-300 text-base leading-relaxed">{project.description}</p>
            </div>

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Технологии</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-600/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-3">Особенности</h2>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="text-blue-500 mt-1.5">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                >
                  <FaExternalLinkAlt />
                  <span>Посмотреть сайт</span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                >
                  <FaGithub />
                  <span>GitHub репозиторий</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl z-10"
            aria-label="Закрыть"
          >
            <FaTimes />
          </button>
          
          {allImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 text-white hover:text-gray-300 text-2xl z-10 bg-black/50 p-3 rounded-full"
                aria-label="Предыдущее изображение"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 text-white hover:text-gray-300 text-2xl z-10 bg-black/50 p-3 rounded-full"
                aria-label="Следующее изображение"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          <div 
            className="max-w-7xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={allImages[fullscreenImage]}
              alt={`${project.title} - Fullscreen ${fullscreenImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {fullscreenImage + 1} / {allImages.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectDetail;
