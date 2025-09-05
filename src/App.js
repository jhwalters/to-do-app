import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : []
  });
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");
  const editInputRef = useRef(null);
  

  //load tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(storedTasks);

  }, [])
  

  //save tasks to local storage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  
  useEffect(() => {
    if (editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingIndex])

  const addTask = () => {
    if (input.trim() !== "") {
      setTasks([...tasks, {text: input, completed: false}]);
      setInput('')
      
    }
  }

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  }

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  //EDIT TASK
  //get the index of the task to edit
  //get the text of the task 
  const editTask = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveEdit = (index) => {
    if (editingText.trim() !== '') {
      const newTasks = [...tasks];
      newTasks[index].text = editingText;
      setTasks(newTasks);
      setEditingIndex(null);
      setEditingText('');
    }
  }


  return (
    <div className="list-container">
      <h1>To-do List</h1>
      <div className="input-container">
        <input 
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            {editingIndex === index ? (
              <>
                <input 
                  ref={editInputRef}
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveEdit(index)}
                />
                <div className="btns">
                  <button onClick={() => saveEdit(index)} className="save-btn">Save</button>
                  <button onClick={() => setEditingIndex(null)} className="cancel-btn">Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span onClick={() => toggleTask(index)}>{task.text}</span>
                <div className="btns">
                  <button onClick={() => editTask(index)} className="edit-btn">Edit</button>
                  <button onClick={() => deleteTask(index)} className="delete-btn">Delete</button>
                </div>
              </>
            )}
            
          </li>
        ))}
      </ul>
    </div>
    
  )
}

export default App;