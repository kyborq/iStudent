export const toTime = (s: number, addSecond?: boolean) => {
  const hours = `${Math.floor(s / 3600)}`.padStart(2, '0');
  const minutes = `${Math.floor((s % 3600) / 60)}`.padStart(2, '0');
  const seconds = `${Math.floor((s % 3600) % 60)}`.padStart(2, '0');

  return addSecond ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
};

export const getTime = (s: number) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.floor((s % 3600) % 60);
  return { hours, minutes, seconds };
};

export const getTimeString = (s: number, d?: string) => {
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = Math.floor((s % 3600) % 60);

  const hString = !!hours && hours > 0 ? `${hours}ч` : '';
  const mString = !!minutes && minutes > 0 ? `${minutes}м` : '';
  const sString = !!seconds && seconds > -1 ? `${seconds}с` : '';
  const dString = !!d && d !== '' ? d : '';

  const arr = [dString, hString, mString, sString];

  return arr.filter((str) => str !== '').join(' ');
};
