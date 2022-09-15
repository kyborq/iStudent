import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export type TSubject = {
  id: string;
  title: string;
  teacher?: string;
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
        archived: false,
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
    archiveSubject(state, action: PayloadAction<string>) {
      state.subjects = state.subjects.map((s) =>
        s.id === action.payload ? { ...s, archived: !s.archived } : s,
      );
    },
  },
});

export const { editSubject, addSubject, deleteSubject, archiveSubject } =
  subjectSlice.actions;

export const selectCurrentSubject = (state: RootState, id: string) =>
  state.subjects.subjects.find((s) => s.id === id);

export default subjectSlice.reducer;
