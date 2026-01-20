import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React", completed: true },
    { id: 2, title: "Build a Todo App", completed: false },
  ]);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  const updateTodo = (id, updatedFields) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
  };

  const addTodo = () => {
    if (!newTodoTitle.trim()) return;

    setTodos(prev => [
      ...prev,
      { id: Date.now(), title: newTodoTitle, completed: false }
    ]);

    setNewTodoTitle("");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setNewTodoTitle("");
        inputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="todo-app">
      <h1>To Do List</h1>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input 
              type="checkbox" 
              checked={todo.completed}
              onChange={() => {
                updateTodo(todo.id, { completed: !todo.completed });
              }}
            />
            <span className={todo.completed ? 'completed' : ''}>
              {todo.title}
            </span>
          </li>
        ))}

        <li>
          <input
            type="text"
            ref={inputRef}
            value={newTodoTitle}
            aria-label="New todo title"
            placeholder="Add a new todo..."
            onChange={e => setNewTodoTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') addTodo();
            }}
          />
        </li>

      </ul>
    </div>
  );
}

export default App;
