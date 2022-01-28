import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

interface IRootSlice {
  date: number;
}

const initialState: IRootSlice = {
  date: new Date().valueOf(),
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {},
});

// export const {} = rootSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export default rootSlice.reducer;
