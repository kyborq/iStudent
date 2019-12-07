import { getISODay, getISOWeek } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { Empty } from '../../../components/Empty';
import { useAppSelector } from '../../../redux/store';
import { isDateEven } from '../../../utils/date';
import { uuid4 } from '../../../utils/uuid4';
import { ScheduleCard } from './ScheduleCard';

type Props = {
  date: number | Date;
};

export const ScheduleList = ({ date }: Props) => {
  const { schedule } = useAppSelector((state) => state.schedule);
  const { subjects } = useAppSelector((state) => state.subjects);

  const weekDayNumber = getISODay(date);
  const weekType = isDateEven(date, 'week') ? 2 : 3;

  const sch = schedule.filter((s) => {
    const isCurrentWeek = s.repeats?.index == weekDayNumber;
    const isCurrentType =
      s.repeats?.period !== 1 &&
      s.repeats?.period &&
      s.repeats?.period % weekType == 0;
    if (isCurrentWeek && (s.repeats?.period === 1 || isCurrentType)) return s;
  });

  const scheduleList = schedule.map((s) => {
    const subject = subjects.find((sub) => sub.id === s.subject);

    const isCurrentWeek = s.repeats?.index == weekDayNumber;
    const isCurrentType =
      s.repeats?.period !== 1 &&
      s.repeats?.period &&
      s.repeats?.period % weekType == 0;

    if (isCurrentWeek && (s.repeats?.period === 1 || isCurrentType))
      return (
        <ScheduleCard
          key={uuid4()}
          end={s.repeats?.time?.end || '00:00'}
          start={s.repeats?.time?.start || '00:00'}
          title={subject?.title || s.subject}
          teacher={subject?.teacher}
          room={s.room}
        />
      );
  });

  return (
    <View style={{ flex: 1 }}>
      {scheduleList}
      {!sch.length && <Empty text="Занятий на этот день нет" />}
    </View>
  );
};
