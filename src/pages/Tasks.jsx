function Tasks() {
  const tasks = [
    { id: 1, title: "Learn Spring Security", status: "IN_PROGRESS" },
    { id: 2, title: "Build React UI", status: "TODO" },
  ];

  return (
    <div>
      <h2>My Tasks</h2>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title} — {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
