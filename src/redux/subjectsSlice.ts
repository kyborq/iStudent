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
  },
});

export const { editSubject, addSubject, deleteSubject } = subjectSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default subjectSlice.reducer;
