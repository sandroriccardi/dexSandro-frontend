import React, { useState, useEffect } from 'react';
import { tasksApiService } from '../services';
import './AllTasks.css';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllTasks = async () => {
      try {
        setLoading(true);
        const data = await tasksApiService.getAllTasks();
        setTasks(data);
      } catch (err) {
        setError('Failed to fetch tasks');
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTasks();
  }, []);

  if (loading) {
    return (
      <div className="all-tasks-container">
        <div className="loading">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="all-tasks-container">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="all-tasks-container">
      <div className="all-tasks-header">
        <h1>All Tasks</h1>
        <p>Total tasks: {tasks.length}</p>
      </div>
      
      {tasks.length === 0 ? (
        <div className="no-tasks">
          <p>No tasks available.</p>
        </div>
      ) : (
        <div className="tasks-table-container">
          <table className="tasks-table">
            <thead>
              <tr>
                {/* <th>ID</th> */}
                <th>Title</th>
                <th>Description</th>
                <th>Completed</th>
                <th>Priority</th>
                <th>Created Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className={`task-row priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'}`}>
                  {/* <td>{task.id}</td> */}
                  <td className="task-title">{task.title || 'No title'}</td>
                  <td className="task-description">{task.description || 'No description'}</td>
                  <td>
                    <span className={`status-badge status-${task.isCompleted ? task.isCompleted.toString().toLowerCase() : 'unknown'}`}>
                      {task.isCompleted ? 'Completed' : 'Not Completed'}
                    </span>
                  </td>
                  <td>
                    <span className={`priority-badge priority-${task.priority ? task.priority.toString().toLowerCase() : 'none'}`}>
                      {task.priority || 'None'}
                    </span>
                  </td>
                  <td>{task.createdAt ? new Date(task.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllTasks;