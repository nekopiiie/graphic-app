import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../store/todosSlice';
import { RootState } from '../store/store';

const FilterButtons: React.FC = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.todos.filter);

  return (
    <div style={{ margin: '10px 0' }}>
      <button 
        onClick={() => dispatch(setFilter('all'))} 
        style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
      >
        All
      </button>
      <button 
        onClick={() => dispatch(setFilter('active'))} 
        style={{ fontWeight: filter === 'active' ? 'bold' : 'normal', margin: '0 10px' }}
      >
        Active
      </button>
      <button 
        onClick={() => dispatch(setFilter('completed'))} 
        style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
      >
        Completed
      </button>
    </div>
  );
};

export default FilterButtons;
