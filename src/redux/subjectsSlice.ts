import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';
import { getRandomColor } from '../utils';
import { RootState } from './store';

export type TSubject = {
  id: string;
  title: string;
  teacher?: string;
  link?: string;
  created?: string;
  color?: string;
  archived?: boolean;
  viewed?: number;
};

interface ISubjectSlice {
  subjects: TSubject[];
}

const initialState: ISubjectSlice = {
  subjects: [],
};

export const subjectSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    addSubject(state, action: PayloadAction<TSubject>) {
      const subject: TSubject = {
        ...action.payload,
        created: moment().format('DD.MM.YYYY HH:mm:ss'),
        color: getRandomColor(),
        viewed: 0,
      };

      state.subjects = [...state.subjects, subject];
    },
    editSubject(state, action: PayloadAction<TSubject>) {
      const subject = action.payload;
      state.subjects = state.subjects.map((s) =>
        s.id === subject.id ? subject : s,
      );
    },
    deleteSubject(state, action: PayloadAction<string>) {
      state.subjects = state.subjects.filter((s) => s.id !== action.payload);
    },
    addViewsToSubject(state, action: PayloadAction<string>) {
      const id = action.payload;
      state.subjects = state.subjects.map((s) =>
        s.id === id ? { ...s, viewed: (s.viewed || 0) + 1 || 0 } : s,
      );
    },
  },
});

export const { editSubject, addSubject, deleteSubject, addViewsToSubject } =
  subjectSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default subjectSlice.reducer;
