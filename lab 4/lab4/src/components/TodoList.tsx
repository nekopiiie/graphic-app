import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import TodoItem from './TodoItem';
import { format, parseISO } from 'date-fns';
import { AnimatePresence } from 'framer-motion';

const TodoList: React.FC = () => {
  const { items, filter } = useSelector((state: RootState) => state.todos);

  const filteredTodos = items.filter((todo) => {
    if (filter === 'all') return true;
    return filter === 'active' ? !todo.completed : todo.completed;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return parseISO(a.deadline).getTime() - parseISO(b.deadline).getTime();
  });

  const groupedTodos = sortedTodos.reduce<Record<string, typeof sortedTodos>>(
    (acc, todo) => {
      const dateKey = format(parseISO(todo.createdAt), 'yyyy-MM-dd');
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(todo);
      return acc;
    }, {}
  );

  return (
    <div style={{ marginTop: '20px' }}>
      {Object.entries(groupedTodos).map(([date, todos]) => (
        <div key={date}>
          <h3 style={{ color: '#666', margin: '16px 0 8px' }}>{date}</h3>
          <AnimatePresence>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
