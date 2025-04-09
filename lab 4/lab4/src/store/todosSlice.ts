import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';

type FilterType = 'all' | 'active' | 'completed';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  deadline?: string;
  completedAt?: string;
  createdAt: string;
}

interface TodosState {
  items: Todo[];
  filter: FilterType;
}

const initialState: TodosState = {
  items: [],
  filter: 'all',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ text: string; deadline?: string }>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: action.payload.text,
        completed: false,
        deadline: action.payload.deadline,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm'),
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        todo.completedAt = todo.completed ? format(new Date(), 'yyyy-MM-dd HH:mm') : undefined;
      }
    },
    editTodo: (state, action: PayloadAction<{ id: string; newText: string }>) => {
      const todo = state.items.find((t) => t.id === action.payload.id);
      if (todo) todo.text = action.payload.newText;
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

export const { addTodo, toggleTodo, editTodo, setFilter } = todosSlice.actions;
export default todosSlice.reducer;
