import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getKeyByValue, sort } from '../utils';
import { RootState } from './store';

export enum ETaskSorting {
  label = 'По названию',
  status = 'По состоянию',
}

export enum EPriority {
  high = 0,
  medium = 1,
  low = 2,
  none = 3,
}

export type TTask = {
  id: string;
  label: string;
  description?: string;
  status: boolean;
  deleted?: boolean;
  priority: EPriority;
};

interface ITasksSlice {
  tasks: TTask[];
  sorting: ETaskSorting;
}

const initialState: ITasksSlice = {
  tasks: [],
  sorting: ETaskSorting.label,
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
    completeTask(state, action: PayloadAction<{ id: string; value: boolean }>) {
      const { id, value } = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, status: value } : t,
      );
    },
    changeTaskSorting(state, action: PayloadAction<ETaskSorting>) {
      const sorting = action.payload;
      state.sorting = sorting;
    },
    setTaskPriority(
      state,
      action: PayloadAction<{ id: string; priority: EPriority }>,
    ) {
      const { id, priority } = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, priority } : t,
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
  changeTaskSorting,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
