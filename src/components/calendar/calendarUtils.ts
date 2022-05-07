import {
  add,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

export const getWeek = (date: Date | number) => {
  const currentDate = new Date(date);
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(currentDate, { weekStartsOn: 1 });

  const week = [];
  let day = startDate;

  while (day <= endDate) {
    week.push(format(day, 'dd.MM.yyyy'));
    day = add(day, { days: 1 });
  }

  return week;
};

export const getMonth = (date: Date | number) => {
  const currentDate = new Date(date);

  const startDate = startOfMonth(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });

  const month = [];
  let weekDay = startDate;

  while (weekDay <= endDate) {
    const week = getWeek(weekDay);
    month.push(week);
    weekDay = add(weekDay, { weeks: 1 });
  }

  return month;
};
