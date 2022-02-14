import { TEvent } from '../../redux/scheduleSlice';

export const sortEvents = (events: TEvent[]): TEvent[] => {
  const sortedTasks = events.slice().sort((a, b) => {
    if (!a.time.start && !b.time.start) {
      return -1;
    }
    if (a.time.start > b.time.start) {
      return 1;
    }
    if (a.time.start < b.time.start) {
      return -1;
    }

    return 0;
  });

  return sortedTasks;
};
