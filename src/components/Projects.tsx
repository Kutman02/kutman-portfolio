/**
 * @fileoverview Компонент секции проектов
 */

import { useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchProjects } from '../store/slices/projectsSlice';

/**
 * Компонент секции проектов
 */
function Projects() {
  const dispatch = useAppDispatch();
  const { items: projects, loading } = useAppSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-gray-400 text-lg">Загрузка проектов...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      {/* Фоновые декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок секции */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm md:text-base font-medium text-blue-400 tracking-wider uppercase">
              Портфолио
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              Мои проекты
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
              <p className="text-gray-400 text-lg">Проекты пока не добавлены</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project._id || project.id}
                id={project._id || project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.technologies}
                github={project.github}
                link={project.demo}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Projects;
