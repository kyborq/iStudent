import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TTask = {
  id: string;
  label: string;
  description?: string;
  status: boolean;
  deleted?: boolean;
};

interface ITasksSlice {
  tasks: TTask[];
}

const initialState: ITasksSlice = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TTask>) {
      const task = action.payload;
      state.tasks = [...state.tasks, task];
    },
    editTask(state, action: PayloadAction<TTask>) {
      const task = action.payload;
      state.tasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    },
    deleteTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, deleted: !t.deleted } : t,
      );
    },
    permanentDeleteTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    completeTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: !t.status } : t,
      );
    },
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  permanentDeleteTask,
  editTask,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
