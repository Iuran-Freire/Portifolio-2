// Importa os dados técnicos dos projetos.
import { projects } from "@/data/projects";
import type { pt } from "@/dictionaries/pt";
import { Reveal } from "@/components/animations/Reveal";
import { ProjectCarousel } from "@/components/projects/ProjectCarousel";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Astronaut } from "@/components/ui/Astronaut";
import styles from "./Projects.module.css";

type ProjectsProps = {
  content: typeof pt.projects;
};

export function Projects({ content }: ProjectsProps) {
  return (
    <section
      id="projetos"
      className={`${styles.section} px-4 py-20 sm:px-6 sm:py-24`}
    >
      <Astronaut />
      <div className={`${styles.content} mx-auto max-w-6xl`}>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            {content.introduction}
          </p>

          <h2 className="mt-4 text-[1.9rem] font-bold leading-tight tracking-tight sm:text-5xl">
            {content.title}
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            {content.description}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ProjectCarousel
            previousLabel={content.previousProject}
            nextLabel={content.nextProject}
            carouselLabel={content.carouselLabel}
          >
            {projects.map((project) => {
              // Usa a chave do projeto para encontrar sua tradução.
              const projectContent = content.items[project.key];

              return (
                <div key={project.id}>
                  <ProjectCard
                    projectId={project.id}
                    number={`${content.projectLabel} ${String(project.id).padStart(2, "0")}`}
                    title={projectContent.title}
                    category={projectContent.category}
                    description={projectContent.description}
                    features={projectContent.features}
                    highlight={projectContent.highlight}
                    technologies={project.technologies}
                    image={project.image}
                    projectUrl={project.projectUrl}
                    buttonLabel={
                      project.linkType === "repository"
                        ? content.viewRepository
                        : content.viewDashboard
                    }
                  />
                </div>
              );
            })}
          </ProjectCarousel>
        </Reveal>
      </div>
    </section>
  );
}

