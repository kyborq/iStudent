export const addDateDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

export const addDateMonth = (date: Date, months: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setMonth(newDate.getMonth() + months);

  return newDate;
};

export const dateRange = (startDate: Date, endDate: Date, step: number = 1) => {
  const dateArray = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate = addDateDays(currentDate, step);
  }

  return dateArray;
};

export const getDate = (date: number, format?: 'day' | 'month' | 'year') => {
  const day = new Date(date).getDate().toString().padStart(2, '0');
  const month = `${new Date(date).getMonth() + 1}`.padStart(2, '0');
  const year = new Date(date).getFullYear().toString();

  if (format === 'day') return day;
  if (format === 'month') return month;
  if (format === 'year') return year;

  return `${day}.${month}.${year}`;
};

export const endOfWeek = (date: Date) => {
  const newDate = new Date(date.valueOf());
  const days = 7 - newDate.getDay();
  newDate.setDate(newDate.getDate() + days);

  return newDate;
};

export const startOfWeek = (date: Date) => {
  const newDate = new Date(date.valueOf());
  const days = newDate.getDay() - 1;
  newDate.setDate(newDate.getDate() - days);

  return newDate;
};

export const startOfMonth = (date: Date) => {
  const newDate = new Date(date.valueOf());
  const y = newDate.getFullYear();
  const m = newDate.getMonth();

  return new Date(y, m, 1);
};

export const endOfMonth = (date: Date) => {
  const newDate = new Date(date.valueOf());
  const y = newDate.getFullYear();
  const m = newDate.getMonth();

  return new Date(y, m + 1, 0);
};

export const getWeekArray = (date: number) => {
  const newDate = new Date(date);

  const start = startOfWeek(newDate);
  const end = endOfWeek(newDate);

  let currentDate = new Date(start.valueOf());

  let index = 0;
  let week = [];

  while (currentDate <= end) {
    week.push(currentDate.valueOf());
    currentDate = addDateDays(currentDate, 1);
    index++;
  }

  return week;
};

export const getMonthArray = (date: number) => {
  const newDate = new Date(date);

  const start = startOfWeek(startOfMonth(newDate));
  const end = addDateDays(endOfWeek(endOfMonth(newDate)), 1);

  let currentDate = addDateDays(new Date(start.valueOf()), -1);
  let index = 0;

  let week = [];
  let month = [];

  while (currentDate <= end) {
    if (index !== 0 && index % 7 === 0) {
      month.push(week);
      week = [];
    }
    week.push(currentDate.valueOf());
    currentDate = addDateDays(currentDate, 1);
    index++;
  }

  return month;
};

export const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const getMonthName = (date: number) => {
  const newDate = new Date(date).getMonth();
  return monthNames[newDate];
};

export const weekNames = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

export const getWeekName = (date: number) => {
  const newDate = new Date(date).getDay();
  return weekNames[newDate];
};
