import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TTimeRange = {
  start: string;
  end: string;
};

export type TSchedule = {
  id: string;
  subject: string; // id предмета
  teacher: string; // id преподавателя
  time: TTimeRange; // время начала и конца 08:00-09:45
  date?: string; // дата проведения, может и не быть если установлены повторения
  repeats?: number; // индексы повторений: 1, 2, 3, 4, 5, 6, 7 по дням недели
};

interface IScheduleSclice {
  schedule: TSchedule[];
}

const initialState: IScheduleSclice = {
  schedule: [],
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addEvent(state, action: PayloadAction<TSchedule>) {
      state.schedule = [...state.schedule, action.payload];
    },
    deleteEvent(state, action: PayloadAction<string>) {
      state.schedule = state.schedule.filter(
        (event) => event.id !== action.payload,
      );
    },
    editEvent(state, action: PayloadAction<TSchedule>) {
      state.schedule = state.schedule.map((event) =>
        event.id === action.payload.id ? action.payload : event,
      );
    },
  },
});

export const { addEvent, deleteEvent, editEvent } = scheduleSlice.actions;

export default scheduleSlice.reducer;
