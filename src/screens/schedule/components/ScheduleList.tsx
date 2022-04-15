import { getISODay, getISOWeek } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { Empty } from '../../../components/Empty';
import { useAppSelector } from '../../../redux/store';
import { uuid4 } from '../../../utils/uuid4';
import { ScheduleCard } from './ScheduleCard';

type Props = {
  date: number | Date;
};

export const ScheduleList = ({ date }: Props) => {
  const { schedule } = useAppSelector((state) => state.schedule);

  const weekDayNumber = getISODay(date);
  const weekPeriod = getISOWeek(date);

  // const len = schedule.filter(
  //   (s) => !!s.repeats && s.repeats.find((r) => r.index === weekDayNumber),
  // ).length;

  const scheduleList = schedule.map((s) => {
    // const repeated =
    // (!!s.repeats && s.repeats.find((r) => r.index === weekDayNumber)) || null;

    // const redWeek = repeated?.period === 2 && weekPeriod % 2 === 0;
    // const blueWeek = repeated?.period === 3 && weekPeriod % 3 === 0;

    // if (repeated)
    return (
      <ScheduleCard
        key={uuid4()}
        end={'00:00'}
        start={'00:00'}
        title={s.subject}
      />
    );
  });

  return (
    <View style={{ flex: 1 }}>
      {scheduleList}
      {/* {!len && <Empty text="Занятий на этот день нет" />} */}
    </View>
  );
};
