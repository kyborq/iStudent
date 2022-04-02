import { getISODay } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../../../redux/store';
import { ScheduleCard } from './ScheduleCard';

type Props = {
  date: number | Date;
};

export const ScheduleList = ({ date }: Props) => {
  const { schedule } = useAppSelector((state) => state.schedule);

  const weekDayNumber = getISODay(date);

  const scheduleList = schedule.map((s) => {
    const repeated =
      (!!s.repeats && s.repeats.find((r) => r.index === weekDayNumber)) || null;

    if (repeated)
      return (
        <ScheduleCard
          end={repeated?.time.end || '00:00'}
          start={repeated?.time.start || '00:00'}
          title={s.subject}
        />
      );
  });

  return <View>{scheduleList}</View>;
};
