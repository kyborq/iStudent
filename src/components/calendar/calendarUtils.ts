export const addDateDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);

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

export const getDate = (date: Date, format?: 'day' | 'month' | 'year') => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const year = date.getFullYear().toString();

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

export const getMonthArray = (date: Date) => {
  const newDate = new Date(date.valueOf());

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
    week.push(currentDate);
    currentDate = addDateDays(currentDate, 1);
    index++;
  }

  return month;
};
