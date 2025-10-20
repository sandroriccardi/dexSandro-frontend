import React, { useState } from 'react';
import './Tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Setup React project', completed: true },
    { id: 2, text: 'Create Header component', completed: true },
    { id: 3, text: 'Create Footer component', completed: true },
    { id: 4, text: 'Add Tasks functionality', completed: false },
    { id: 5, text: 'Style the application', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="tasks-container">
      <h2>Task Manager</h2>
      
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
          className="task-input"
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="add-btn">Add Task</button>
      </div>

      <div className="tasks-list">
        {tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="task-checkbox"
              />
              <span className="task-text">{task.text}</span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-btn"
              title="Delete task"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="task-stats">
        <p>Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length} | Remaining: {tasks.filter(t => !t.completed).length}</p>
      </div>
    </div>
  );
};

export default Tasks;