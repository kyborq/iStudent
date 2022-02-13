import moment from 'moment';

export const getWeek = (date: string) => {
  const currentDate = moment(date, 'DD.MM.YYYY');
  const startDate = currentDate.clone().startOf('isoWeek');
  const endDate = currentDate.clone().endOf('isoWeek');

  const week = [];
  let day = startDate;

  while (day <= endDate) {
    week.push(day.format('DD.MM.YYYY'));
    day = day.clone().add(1, 'd');
  }

  return week;
};

export const getMonth = (date: string) => {
  const currentDate = moment(date, 'DD.MM.YYYY');

  const startDate = currentDate.clone().startOf('month').startOf('isoWeek');
  const endDate = currentDate.clone().endOf('month').endOf('isoWeek');

  const month = [];
  let weekDay = startDate;

  while (weekDay <= endDate) {
    const week = getWeek(weekDay.format('DD.MM.YYYY'));
    month.push(week);
    weekDay = weekDay.clone().add(1, 'w');
  }

  return month;
};
