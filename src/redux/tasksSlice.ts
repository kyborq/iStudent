import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getKeyByValue, sort } from '../utils';
import { RootState } from './store';

export enum ETaskSorting {
  label = 'По названию',
  status = 'По состоянию',
  priority = 'По важности',
}

export enum EPriority {
  high = 0,
  medium = 1,
  low = 2,
  none = 3,
}

export type TSorting = {
  sorting: ETaskSorting;
  direction: 1 | -1;
};

export type TTask = {
  id: string;
  label: string;
  description?: string;
  status: boolean;
  deleted?: boolean;
  priority: boolean;
};

interface ITasksSlice {
  tasks: TTask[];
  sorting: TSorting;
}

const initialState: ITasksSlice = {
  tasks: [],
  sorting: {
    sorting: ETaskSorting.label,
    direction: 1,
  },
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
    changeTaskSorting(state, action: PayloadAction<TSorting>) {
      const { sorting, direction } = action.payload;
      state.sorting = { sorting, direction };
    },
    setTaskPriority(
      state,
      action: PayloadAction<{ id: string; priority: boolean }>,
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
  setTaskPriority,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
