import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    if (input.trim() !== '') {
      setTasks([...tasks, { text: input, completed: false }]);
      setInput('');
    }
  }

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  return (
    <div className='app'>
      <h1>To-Do List</h1>
      <div className='input-container'>
        <input 
          type='text'
          placeholder='Add a new task...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className='task-list'>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(index)}>{task.text}</span>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
