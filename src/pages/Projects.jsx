function Projects() {
  const projects = [
    { id: 1, name: "Task Management System" },
    { id: 2, name: "JWT Auth Service" },
  ];

  return (
    <div>
      <h2>My Projects</h2>

      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;