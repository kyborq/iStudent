export const getTime = (s: number) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.floor((s % 3600) % 60);
  return { hours, minutes, seconds };
};

export const getTimes = (s: number) => {
  const { hours, minutes, seconds } = getTime(s);
  const sHours = `${hours}`.padStart(2, '0');
  const sMinutes = `${minutes}`.padStart(2, '0');
  const sSeconds = `${seconds}`.padStart(2, '0');

  return { hours: sHours, minutes: sMinutes, seconds: sSeconds };
};

export const getTimeString = (s: number) => {
  const { hours, minutes, seconds } = getTimes(s);

  const arr = [hours, minutes];

  return arr.filter((str) => str !== '').join(':');
};

export const getTimeOfTime = (s1: number = 0, s2: number = 0) => {
  const time1 = getTimes(s1);
  const time2 = getTimes(s2);

  const arr1 = [time1.hours, time1.minutes];
  const arr2 = [time2.hours, time2.minutes];

  const str1 = arr1.join(':');
  const str2 = arr2.join(':');

  return `${str1} / ${str2}`;
};
