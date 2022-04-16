import { add, format, parse } from 'date-fns';
import { TSchedule } from '../../redux/scheduleSlice';

export const sortEvents = (events: TSchedule[]): TSchedule[] => {
  const sortedTasks = events.slice().sort((a, b) => {
    // if (!a.time.start && !b.time.start) {
    //   return -1;
    // }
    // if (a.time.start > b.time.start) {
    //   return 1;
    // }
    // if (a.time.start < b.time.start) {
    //   return -1;
    // }

    return 0;
  });

  return sortedTasks;
};

export const getCurrentTime = (date: Date | number) => {
  return format(date, 'HH:mm');
};

export const addToTime = (time: string, addition: string) => {
  const addTime = addition.split(':');
  const date = parse(time, 'HH:mm', new Date());

  const resTime = add(date, {
    hours: parseInt(addTime[0]),
    minutes: parseInt(addTime[1]),
  });

  return format(resTime, 'HH:mm');
};
