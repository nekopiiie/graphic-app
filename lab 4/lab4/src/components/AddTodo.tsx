import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todosSlice';
import { motion } from 'framer-motion';

const AddTodo: React.FC = () => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text, deadline }));
      setText('');
      setDeadline('');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ marginBottom: '24px' }}
    >
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter task..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }}
        />
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          style={{ padding: '10px', border: '1px solid #ddd' }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: '10px 16px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Add
        </motion.button>
      </div>
    </motion.form>
  );
};

export default AddTodo;
