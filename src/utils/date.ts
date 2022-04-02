import {
  eachDayOfInterval,
  endOfISOWeek,
  format,
  getDate,
  getISODay,
  getISOWeek,
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
  if (date1 === date2) return 0;

  return 999;
};

export const isEqualDates = (
  firstDate: Date | number,
  secondDate: Date | number,
) => {
  const date1 = format(firstDate, 'dd.MM.yyyy');
  const date2 = format(secondDate, 'dd.MM.yyyy');
  return date1 === date2;
};

// export const getWeekType = (currentDate: number | Date) => {
//   const week = getISOWeek(currentDate);
//   return week % 2 === 0 ? 'blue' : 'red';
// };

export const isDateEven = (
  date: number | Date,
  type: 'day' | 'week' | 'month' | 'year',
) => {
  const evens = {
    day: getISODay(date) % 2 === 0,
    week: getISOWeek(date) % 2 === 0,
    month: getMonth(date) % 2 === 0,
    year: getYear(date) % 2 === 0,
  };

  return evens[type];
};
