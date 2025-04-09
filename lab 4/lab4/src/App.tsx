import React from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import FilterButtons from './components/FilterButtons';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Todo List ౨ৎ⋆ ˚｡⋆</h1>
      <AddTodo />
      <FilterButtons />
      <TodoList />
    </div>
  );
}

export default App;
