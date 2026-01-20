const TODOS_KEY = 'todos';

export const saveTodosToLocalStorage = (todos) => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Failed to save todos to localStorage:', error);
  }
};

export const loadTodosFromLocalStorage = () => {
  try {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error);
    return [];
  }
};

export const addTodoToStorage = (todos, newTodo) => {
  const todoWithDate = { ...newTodo, date: new Date().toISOString() };
  const updatedTodos = [...todos, todoWithDate];
  saveTodosToLocalStorage(updatedTodos);
  return updatedTodos;
};

export const updateTodoInStorage = (todos, id, updatedFields) => {
  const updatedTodos = todos.map(todo =>
    todo.id === id ? { ...todo, ...updatedFields } : todo
  );
  saveTodosToLocalStorage(updatedTodos);
  return updatedTodos;
};

export const deleteTodoFromStorage = (todos, id) => {
  const updatedTodos = todos.filter(todo => todo.id !== id);
  saveTodosToLocalStorage(updatedTodos);
  return updatedTodos;
};
