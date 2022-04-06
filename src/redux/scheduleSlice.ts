import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TTimeRange = {
  start: string;
  end: string;
};

export type TRepeats = {
  index: number; // индексы повторений: 1, 2, 3, 4, 5, 6, 7 по дням недели
  time: TTimeRange;
  period: 1 | 2 | 3; // четность: 1 - каждую неделю, 2 - в синюю неделю, 3 - в красную неделю
};

export type TSchedule = {
  id: string;
  subject: string; // id предмета
  time?: TTimeRange; // время начала и конца 08:00-09:45
  date?: string; // дата проведения, может и не быть если установлены повторения
  repeats?: TRepeats[];
};

interface IScheduleSclice {
  schedule: TSchedule[];
}

const initialState: IScheduleSclice = {
  schedule: [
    {
      id: '1',
      subject: 'Старостат',
      repeats: [
        {
          index: 3,
          time: {
            start: '13:00',
            end: '13:30',
          },
          period: 1,
        },
      ],
    },
    {
      id: '2',
      subject: 'Логика и теория алгоритмов',
      repeats: [
        {
          index: 4,
          time: {
            start: '15:15',
            end: '16:50',
          },
          period: 3,
        },
      ],
    },
    {
      id: '2',
      subject: 'Логика и теория алгоритмов',
      repeats: [
        {
          index: 4,
          time: {
            start: '17:00',
            end: '18:35',
          },
          period: 2,
        },
      ],
    },
  ],
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
