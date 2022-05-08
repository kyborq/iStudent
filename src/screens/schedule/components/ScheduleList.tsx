import { CommonActions, useNavigation } from '@react-navigation/native';
import { getISODay, getISOWeek } from 'date-fns';
import React from 'react';
import { View } from 'react-native';
import { Empty } from '../../../components/Empty';
import { strings } from '../../../localizations/localization';
import { useAppSelector } from '../../../redux/store';
import { isDateEven } from '../../../utils/date';
import { uuid4 } from '../../../utils/uuid4';
import {
  isEventExpired,
  isEventGoing,
  isEventNotStarted,
  isScheduleToday,
  sortEvents,
} from '../scheduleUtils';
import { ScheduleCard } from './ScheduleCard';

type Props = {
  date: number | Date;
};

export const ScheduleList = ({ date }: Props) => {
  const navigation = useNavigation();
  const { schedule } = useAppSelector((state) => state.schedule);
  const { subjects } = useAppSelector((state) => state.subjects);

  const weekDayNumber = getISODay(date);
  const weekType = isDateEven(date, 'week') ? 2 : 3;

  const filteredSchedule = schedule.filter((s) => {
    const isCurrentWeek = s.repeats?.index == weekDayNumber;
    const isCurrentType =
      s.repeats?.period !== 1 &&
      s.repeats?.period &&
      s.repeats?.period % weekType == 0;
    if (isCurrentWeek && (s.repeats?.period === 1 || isCurrentType)) return s;
  });

  const sortedSchedule = sortEvents(filteredSchedule);

  const handleViewSchedule = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewEvent',
        params: {
          id: id,
        },
      }),
    );
  };

  const scheduleList = sortedSchedule.map((s) => {
    const subject = subjects.find((sub) => sub.id === s.subject);
    const isWait = isEventNotStarted(s) && 'wait';
    const isGoing = isEventGoing(s) && 'going';
    const isEnded = isEventExpired(s) && 'ended';

    const status = [isWait, isGoing, isEnded].find((i) => !!i) as
      | 'going'
      | 'wait'
      | 'ended';

    return (
      <ScheduleCard
        key={uuid4()}
        end={s.repeats?.time?.end || '00:00'}
        start={s.repeats?.time?.start || '00:00'}
        title={subject?.title || s.subject}
        teacher={subject?.teacher}
        room={s.room}
        status={(isScheduleToday(s) && status) || 'wait'}
        onPress={() => handleViewSchedule(s.id)}
      />
    );
  });

  return (
    <View style={{ flex: 1 }}>
      {scheduleList}
      {!filteredSchedule.length && <Empty text={strings.empty} />}
    </View>
  );
};
