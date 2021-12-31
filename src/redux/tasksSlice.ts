import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type TStep = {
  id: string;
  label: string;
  status: boolean;
  taskId?: string;
};

export type TTask = {
  id: string;
  label: string;
  description?: string;
  status: boolean;
  deleted?: boolean;
};

interface ITasksSlice {
  tasks: TTask[];
  steps: TStep[];
}

const initialState: ITasksSlice = {
  tasks: [],
  steps: [],
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
    addTaskStep(state, action: PayloadAction<TStep>) {
      const step = action.payload;
      state.steps = [...state.steps, step];
    },
    deleteTaskStep(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.steps = state.steps.filter((step) => step.id !== id);
    },
    completeTaskStep(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.steps = state.steps.map((step) =>
        step.id === id ? { ...step, status: !step.status } : step,
      );
    },
    deleteAllTaskSteps(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.steps = state.steps.filter((step) => step.taskId !== id);
    },
  },
});

export const {
  addTask,
  completeTask,
  deleteTask,
  permanentDeleteTask,
  editTask,
  addTaskStep,
  deleteTaskStep,
  completeTaskStep,
  deleteAllTaskSteps,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
