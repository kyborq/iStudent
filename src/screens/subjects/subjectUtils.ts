import { TSubject } from '../../redux/subjectsSlice';
import { sort } from '../../utils';

export const toWordUppercase = (s: string = '') => {
  const str = s.toString();
  return str
    .split(' ')
    .map((w) => (!!w && w[0].toUpperCase() + w.slice(1, w.length)) || '')
    .join(' ');
};

export const sortSubjects = (
  subjects: TSubject[],
  key: string,
  reversed: boolean = false,
): TSubject[] => {
  const sortedSubjects = sort(subjects, key, reversed);
  return sortedSubjects;
};

export const filterSubjects = (subject: TSubject, type: string) => {
  switch (type) {
    case 'ALL':
      return !subject.archived;
    case 'ARCHIVED':
      return subject.archived;
    default:
      return false;
  }
};
