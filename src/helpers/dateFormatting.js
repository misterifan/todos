export const formatDateSubtitle = (date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday = 
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) return 'Today';
  if (isYesterday) return 'Yesterday';

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const year = date.getFullYear();

  const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
                 (day % 10 === 2 && day !== 12) ? 'nd' :
                 (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

  return `${dayName} ${day}${suffix}, ${year}`;
};

export const getDateKey = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

export const groupTodosByDate = (todos) => {
  const grouped = {};

  todos.forEach(todo => {
    const date = new Date(todo.date);
    const key = getDateKey(date);
    
    if (!grouped[key]) {
      grouped[key] = { date, todos: [] };
    }
    grouped[key].todos.push(todo);
  });

  // Sort by date descending (newest first)
  return Object.values(grouped).sort((a, b) => b.date - a.date);
};
