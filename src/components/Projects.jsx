import ProjectCard from './ProjectCard';
import projectsData from '../assets/projects.json';

function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">Мои Проекты</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.projects.map((project, _index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project.image}
              technologies={project.technologies}
              link={project.demo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
