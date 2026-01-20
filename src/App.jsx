import "./App.css";
import { useState, useEffect, useRef } from "react";
import { loadTodosFromLocalStorage, addTodoToStorage, updateTodoInStorage } from "./helpers/todoStorage";

function App() {
  const [todos, setTodos] = useState(() => loadTodosFromLocalStorage());
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const inputRef = useRef(null);

  const updateTodo = (id, updatedFields) => {
    setTodos(prev => updateTodoInStorage(prev, id, updatedFields));
  };

  const addTodo = () => {
    if (!newTodoTitle.trim()) return;

    const newTodo = { id: Date.now(), title: newTodoTitle, completed: false };
    setTodos(prev => addTodoToStorage(prev, newTodo));

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
