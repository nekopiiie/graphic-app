import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo } from '../store/todosSlice';
import { format, parseISO, isPast, differenceInHours } from 'date-fns';
import { motion } from 'framer-motion';

interface TodoItemProps {
  todo: {
    id: string;
    text: string;
    completed: boolean;
    deadline?: string;
    completedAt?: string;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing && editedText.trim()) {
      dispatch(editTodo({ id: todo.id, newText: editedText }));
    }
    setIsEditing(!isEditing);
  };

  const getDeadlineColor = () => {
    if (!todo.deadline || todo.completed) return 'gray';
    const deadlineDate = parseISO(todo.deadline);
    if (isPast(deadlineDate)) return 'red';
    const hoursLeft = differenceInHours(deadlineDate, new Date());
    return hoursLeft <= 24 ? 'orange' : 'green';
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      style={{ overflow: 'hidden', margin: '8px 0' }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px',
          background: '#f9f9f9',
          borderRadius: '8px',
        }}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          style={{ marginRight: '12px' }}
        />

        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEdit}
            onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
            autoFocus
            style={{ flex: 1, padding: '8px', border: '1px solid #ddd' }}
          />
        ) : (
          <div
            style={{
              flex: 1,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#aaa' : '#333',
              cursor: 'pointer',
            }}
            onDoubleClick={() => !todo.completed && setIsEditing(true)}
          >
            {todo.text}
            {todo.deadline && (
              <div style={{ fontSize: '12px', color: getDeadlineColor(), marginTop: '4px' }}>
                {todo.completed 
                  ? `Completed: ${todo.completedAt}` 
                  : `Deadline: ${todo.deadline}`}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TodoItem;
