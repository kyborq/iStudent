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
