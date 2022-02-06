export const toWordUppercase = (s: string = '') => {
  const str = s.toString();
  return str
    .split(' ')
    .map((w) => (!!w && w[0].toUpperCase() + w.slice(1, w.length)) || '')
    .join(' ');
};
