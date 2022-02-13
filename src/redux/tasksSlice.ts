import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { getKeyByValue, sort } from '../utils';
import { RootState } from './store';

export enum ETaskSorting {
  title = 'По названию',
  completed = 'По состоянию',
  created = 'По добавлению',
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
  title: string;
  completed: boolean;
  archived?: boolean;
  priority?: boolean;
  created?: string;
  deadline?: string;
  estimate?: number;
  spended?: number;
  subject?: string;
};

interface ITasksSlice {
  tasks: TTask[];
  sorting: ETaskSorting;
}

const initialState: ITasksSlice = {
  tasks: [],
  sorting: ETaskSorting.title,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    // Действия с задачами
    addTask(state, action: PayloadAction<TTask>) {
      const task: TTask = {
        ...action.payload,
        created: moment().format('DD.MM.YYYY HH:mm:ss'),
      };

      state.tasks = [...state.tasks, task];
    },
    editTask(state, action: PayloadAction<TTask>) {
      const task = action.payload;
      state.tasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    },
    archiveTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === id ? { ...t, archived: !t.archived } : t,
      );
    },
    archiveTasks(state, action: PayloadAction<string[]>) {
      const ids = action.payload;
      state.tasks = state.tasks.map((t) =>
        ids.includes(t.id) ? { ...t, archived: !t.archived } : t,
      );
    },
    deleteTask(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    // Действия с таймером
    setTimer(
      state,
      action: PayloadAction<{
        task: string;
        estimated: number;
        spended: number;
      }>,
    ) {
      const { spended, estimated, task } = action.payload;
      state.tasks = state.tasks.map((t) =>
        t.id === task ? { ...t, spended, estimate: estimated } : t,
      );
    },

    // Действия с сортировкой
    changeTaskSorting(state, action: PayloadAction<ETaskSorting>) {
      const sorting = action.payload;
      state.sorting = sorting;
    },
    sortTasks(state) {
      const key = getKeyByValue(ETaskSorting, state.sorting);
      state.tasks = sort(state.tasks, key, false);
    },
  },
});

export const {
  addTask,
  archiveTask,
  deleteTask,
  editTask,
  changeTaskSorting,
  sortTasks,
  setTimer,
  archiveTasks,
} = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
