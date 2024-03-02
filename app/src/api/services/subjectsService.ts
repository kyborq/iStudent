import { api } from '../api';
import { CreateSubject, Subject } from '../models/subjectModel';

export const createSubject = async (subject: CreateSubject) => {
  try {
    await api.post('/subjects', subject);
  } catch (e) {
    console.error(e);
  }
};

export const getSubjects = async () => {
  try {
    const { data: subjects } = await api.get<Subject[]>('/subjects');
    return subjects;
  } catch (e) {
    console.error(e);
  }
};
