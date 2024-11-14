import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');

  // Fetch tasks when the app loads
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  // Handle adding a task
  const addTask = () => {
    if (taskName.trim()) {
      axios.post('http://localhost:5000/tasks', { id: Date.now(), name: taskName })
        .then(response => {
          setTasks([...tasks, response.data]);
          setTaskName('');
        })
        .catch(error => console.error(error));
    }
  };

  // Handle deleting a task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(task => task.id !== id));
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="header-text">Task Manager</h1>
      </header>

      {/* Main Content */}
      <div className="container">
        <input
          type="text"
          placeholder="Enter a task"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="input"
        />
        <button onClick={addTask} className="button">Add Task</button>

        <div className="task-list">
          <h3 className="sub-header">Your Tasks</h3>
          <ul className="ul">
            {tasks.map(task => (
              <li key={task.id} className="li">
                <span className="task-text">{task.name}</span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Created with ❤️ by DevOps Engineer M</p>
      </footer>
    </div>
  );
}

export default App;
