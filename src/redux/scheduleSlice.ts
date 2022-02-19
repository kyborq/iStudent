import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TEvent = {
  id: string;
  title: string;
  date: string;
  time: {
    start: string;
    end: string;
  };
  subject?: string;
  task?: string;
  repeat?: number;
};

interface IScheduleSclice {
  schedule: TEvent[];
}

const initialState: IScheduleSclice = {
  schedule: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<TEvent>) {
      // ...
      state.schedule = [...state.schedule, action.payload];
    },
  },
});

export const { addEvent } = scheduleSlice.actions;

export default scheduleSlice.reducer;
