/**
 * @fileoverview Главная страница портфолио
 */

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProfile } from '../store/slices/profileSlice';
import { fetchResume } from '../store/slices/resumeSlice';
import { FaFileDownload, FaExternalLinkAlt, FaArrowDown } from 'react-icons/fa';

/**
 * Компонент кнопок резюме
 */
function ResumeButtons() {
  const dispatch = useAppDispatch();
  const resume = useAppSelector((state) => state.resume);

  useEffect(() => {
    dispatch(fetchResume());
  }, [dispatch]);

  if (!resume.file && !resume.fileUrl && !resume.externalLink) {
    return null;
  }

  return (
    <div className="flex gap-2 justify-center md:justify-start items-center mt-3">
      {(resume.file || resume.fileUrl) && (
        <a
          href={resume.file || resume.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-md transition-all duration-200 backdrop-blur-sm"
          title="Скачать резюме"
        >
          <FaFileDownload className="text-xs" />
          <span>Резюме</span>
        </a>
      )}
      {resume.externalLink && (
        <a
          href={resume.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-md transition-all duration-200 backdrop-blur-sm"
          title="Посмотреть резюме"
        >
          <FaExternalLinkAlt className="text-xs" />
          <span>Резюме</span>
        </a>
      )}
    </div>
  );
}

function Home() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const profilePhoto = profile.profilePhoto || 'https://keephere.ru/get/HNAULXgZxfX/o/photo.jpg';
  const profilePhotoAlt = profile.profilePhotoAlt || 'Фото профиля';

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/3 rounded-full blur-3xl"></div>
      </div>

      {/* Сетка фона */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Левая колонка - Текст */}
          <div className="text-center lg:text-left space-y-8 z-10">
            {/* Приветствие */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">
                  Привет, я
                </span>
                <span className="block bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                  Frontend-разработчик
                </span>
              </h1>
            </div>

            {/* Описание */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Загрузка...
            </p>

            {/* Кнопки действий */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-4">
              <a 
                href="#projects" 
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 flex items-center gap-2"
              >
                <span>Посмотреть проекты</span>
                <FaArrowDown className="group-hover:translate-y-1 transition-transform duration-300" />
              </a>
              <a 
                href="#contact" 
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-all duration-300 backdrop-blur-sm hover:border-white/20"
              >
                Связаться со мной
              </a>
            </div>

            {/* Кнопки резюме */}
            <ResumeButtons />
          </div>

          {/* Правая колонка - Фото */}
          <div className="relative flex justify-center lg:justify-end z-10">
            <div className="relative">
              {/* Декоративные элементы вокруг фото */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full"></div>
              
              {/* Фото */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
                <img
                  src={profilePhoto}
                  alt={profilePhotoAlt}
                  className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl ring-4 ring-blue-500/20"
                />
                {/* Декоративное кольцо */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse"></div>
              </div>

              {/* Плавающие элементы */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Индикатор прокрутки */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:block">
          <a href="#about" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors group">
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <FaArrowDown className="animate-bounce text-sm" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Home;
