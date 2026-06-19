// src/features/tasks/tasksSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { getTasks, type Task } from './taskService';

const NEXT: Record<Task['status'], Task['status']> = {
  todo: 'in-progress',
  'in-progress': 'done',
  done: 'todo',
};

interface TasksState {
  items: Task[];
  loading: boolean;
  error: string | null;
}
const initialState: TasksState = { items: [], loading: false, error: null };

export const fetchTasks = createAsyncThunk('tasks/fetch', () => getTasks());

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleStatus: (state, action: PayloadAction<number>) => {
      const t = state.items.find((x) => x.id === action.payload);
      if (t) t.status = NEXT[t.status];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to load tasks';
      });
  },
});

export const { toggleStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
