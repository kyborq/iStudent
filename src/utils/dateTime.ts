import {
  eachDayOfInterval,
  endOfISOWeek,
  format,
  getDate,
  getMonth,
  getYear,
  startOfISOWeek,
  toDate,
} from 'date-fns';
import { ru } from 'date-fns/locale';

type TDay = {
  day: number;
  month: number;
  year: number;
  full: string;
  week: string;
  date: Date;
};

export const convertToDay = (currentDate: number | Date) => {
  const dayObject: TDay = {
    day: getDate(currentDate),
    month: getMonth(currentDate) + 1,
    year: getYear(currentDate),
    full: format(currentDate, 'dd.MM.yyyy'),
    week: format(currentDate, 'EEEEEE', { locale: ru }).toLowerCase(),
    date: toDate(currentDate),
  };

  return dayObject;
};

export const getWeekArray = (currentDate: number | Date) => {
  const startDate = startOfISOWeek(currentDate);
  const endDate = endOfISOWeek(currentDate);

  const week = eachDayOfInterval({ start: startDate, end: endDate });

  return week.map((day) => convertToDay(day));
};

export const compareDates = (firstDate: Date, secondDate: Date) => {
  const date1 = format(firstDate, 'dd.MM.yyyy');
  const date2 = format(secondDate, 'dd.MM.yyyy');

  if (date1 > date2) return 1;
  if (date1 < date2) return -1;

  return 0;
};
