import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

type TSubject = {
  id: string;
  title: string;
  teacher?: string;
  link?: string;
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
  reducers: {},
});

// export const {} = rootSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default subjectSlice.reducer;
