import React from 'react';
import { useData } from '../../context/DataContext';
import ProjectCard from '../Projects/ProjectCard';

const FeaturedProjects: React.FC = () => {
  const { state } = useData();
  const featuredProjects = state.projects.filter(project => project.featured).slice(0, 3);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {featuredProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default FeaturedProjects;