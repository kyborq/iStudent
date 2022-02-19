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
      state.schedule = [...state.schedule, action.payload];
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.schedule = state.schedule.filter(
        (event) => event.id !== action.payload,
      );
    },
    editEvent(state, action: PayloadAction<TEvent>) {
      state.schedule = state.schedule.map((event) =>
        event.id === action.payload.id ? action.payload : event,
      );
    },
  },
});

export const { addEvent, deleteEvent, editEvent } = scheduleSlice.actions;

export default scheduleSlice.reducer;
