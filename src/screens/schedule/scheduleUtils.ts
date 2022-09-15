import { add, differenceInMinutes, format, getISODay, parse } from 'date-fns';
import { strings } from '../../locales';
import { TSchedule } from '../../redux/scheduleSlice';
import { isDateEven } from '../../utils/date';

export const sortEvents = (events: TSchedule[]): TSchedule[] => {
  const sortedTasks = events.slice().sort((a, b) => {
    const startA = a.repeats?.time?.start;
    const startB = b.repeats?.time?.start;

    if (!startA && !startB) {
      return -1;
    }
    if (startA && startB && startA > startB) {
      return 1;
    }
    if (startA && startB && startA < startB) {
      return -1;
    }

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

export const getScheduleTiming = (schedule?: TSchedule) => {
  const timeNow = format(new Date(), 'HH:mm');

  if (
    schedule &&
    schedule.repeats &&
    schedule.repeats.time &&
    timeNow > schedule.repeats?.time?.start &&
    timeNow < schedule.repeats?.time?.end
  )
    return strings.going;

  if (
    schedule &&
    schedule.repeats &&
    schedule.repeats.time &&
    timeNow < schedule.repeats?.time?.start
  )
    return strings.notStarted;

  if (
    schedule &&
    schedule.repeats &&
    schedule.repeats.time &&
    timeNow > schedule.repeats?.time?.end
  )
    return strings.ended;
};

export const isEventGoing = (schedule?: TSchedule) => {
  if (schedule && schedule.repeats && schedule.repeats.time) {
    const timeNow = format(new Date(), 'HH:mm');
    if (
      timeNow > schedule.repeats?.time?.start &&
      timeNow < schedule.repeats?.time?.end
    )
      return true;
  }
  return false;
};

export const isEventExpired = (schedule?: TSchedule) => {
  if (schedule && schedule.repeats && schedule.repeats.time) {
    const timeNow = format(new Date(), 'HH:mm');
    if (timeNow > schedule.repeats?.time?.end) return true;
  }
  return false;
};

export const isEventNotStarted = (schedule?: TSchedule) => {
  if (schedule && schedule.repeats && schedule.repeats.time) {
    const timeNow = format(new Date(), 'HH:mm');
    if (timeNow < schedule.repeats?.time?.start) return true;
  }
  return false;
};

export const isScheduleToday = (schedule?: TSchedule) => {
  if (schedule) {
    const date = new Date();
    const weekDayNumber = getISODay(date);
    const weekType = isDateEven(date, 'week') ? 2 : 3;
    const isCurrentWeek = schedule.repeats?.index == weekDayNumber;
    const isCurrentType =
      schedule.repeats?.period !== 1 &&
      schedule.repeats?.period &&
      schedule.repeats?.period % weekType == 0;
    if (isCurrentWeek && (schedule.repeats?.period === 1 || isCurrentType))
      return true;
  }
  return false;
};

export const getCurrentSchedule = (schedule: TSchedule[], date: string) => {
  const parsedDate = parse(date, 'dd.MM.yyyy', new Date());
  const weekDayNumber = getISODay(parsedDate);
  const weekType = isDateEven(parsedDate, 'week') ? 2 : 3;

  const todaySchedule = schedule.filter((s) => {
    const isCurrentWeek = s.repeats?.index == weekDayNumber;
    const isCurrentType =
      s.repeats?.period !== 1 &&
      s.repeats?.period &&
      s.repeats?.period % weekType == 0;
    if (isCurrentWeek && (s.repeats?.period === 1 || isCurrentType)) return s;
  });

  return sortEvents(todaySchedule);
};

export const getNextEvent = (schedule: TSchedule[], time: string) => {
  const event = schedule.find((s) => {
    if (s.repeats?.time && time < s.repeats?.time?.start) {
      return s;
    }
  });

  return event;
};

export const timeDiff = (start: string, end: string) => {
  const timeStart = parse(start, 'HH:mm', new Date());
  const timeEnd = parse(start, 'HH:mm', new Date());

  const diff = differenceInMinutes(timeStart, timeEnd);

  return diff;
};
