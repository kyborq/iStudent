import { ETaskSorting, TTask } from '../../redux/tasksSlice';
import { getKeyByValue, sort } from '../../utils';

export const sortTasks = (tasks: TTask[], sorting: ETaskSorting): TTask[] => {
  const key = getKeyByValue(ETaskSorting, sorting);
  const sortedTasks = sort(tasks, key, false);
  return sortedTasks;
};
