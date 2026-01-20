import { useState, useEffect, useRef } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Build a Todo App", completed: false },
  ]);
  const [addNew, setAddNew] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  let addButtonText = addNew ? "Cancel" : "+ Add";

  const addTodo = (title) => {
    if (!title.trim()) return;
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
    setAddNew(false);
  };

  const toggleAddNew = () => {
    setAddNew(!addNew);
  };

  const handleInputChange = (title) => {
    setNewTodoTitle(title);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        setAddNew(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === 'Escape') {
        setAddNew(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="todo-app">
      <h1>To Do List</h1>
      <button onClick={toggleAddNew}>{addButtonText}</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title}</li>
        ))}
        {addNew && (<li>
            <input ref={inputRef} type="text" placeholder="Add a new todo" value={newTodoTitle} 
                onChange={(e) => handleInputChange(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTodo(newTodoTitle)} />
            <button onClick={() => addTodo(newTodoTitle)}>Ok</button>
        </li>)}
      </ul>
    </div>
  );
}

export default App;