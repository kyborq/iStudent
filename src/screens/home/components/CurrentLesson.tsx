import { format, getISODay } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../colors';
import { strings } from '../../../localizations/localization';
import { TSchedule } from '../../../redux/scheduleSlice';
import { useAppSelector } from '../../../redux/store';
import { getTextLetters } from '../../../utils';
import { isDateEven } from '../../../utils/date';
import { ILocaleIterator } from '../../schedule/components/DateSelect';
import {
  isEventExpired,
  isEventGoing,
  isEventNotStarted,
  sortEvents,
} from '../../schedule/scheduleUtils';

export const CurrentLesson = () => {
  const date = new Date();

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

  const currentSchedule = sortedSchedule.filter((s, i) => {
    return s;
  });

  const locale: ILocaleIterator = {
    en_US: enUS,
    ru_RU: ru,
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 12,
            marginBottom: 8,
            textTransform: 'capitalize',
          }}>
          {format(date, 'iiii', { locale: locale[strings.getLanguage()] })}
        </Text>
        {currentSchedule.map((s, i) => {
          const number = i + 1;
          const subject = subjects.find((sub) => sub.id === s.subject);

          const title =
            subject?.title && subject?.title.split(' ').length > 1
              ? getTextLetters(subject?.title)
              : subject?.title;

          const time =
            s.repeats && `${s.repeats.time?.start}-${s.repeats.time?.end}`;

          const isWait = isEventNotStarted(s) && 'wait';
          const isGoing = isEventGoing(s) && 'going';
          const isEnded = isEventExpired(s) && 'ended';

          const status = [isWait, isGoing, isEnded].find((i) => !!i) as
            | 'going'
            | 'wait'
            | 'ended';

          return (
            <View
              style={{
                marginBottom: i !== currentSchedule.length - 1 ? 4 : 0,
              }}>
              <Text
                style={[
                  status === 'wait' && { color: '#000', fontWeight: 'bold' },
                  status === 'ended' && {
                    color: '#c7c7c7',
                    textDecorationLine: 'line-through',
                    fontWeight: 'bold',
                  },
                  status === 'going' && {
                    fontWeight: 'bold',
                    color: COLORS.primary5A9EEE,
                  },
                ]}>{`${number}. ${time} ${title}`}</Text>
            </View>
          );
        })}
        {currentSchedule.length === 0 && (
          <Text style={{ fontSize: 14, color: '#c7c7c7' }}>
            {strings.empty}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  card: {
    flex: 1,
    padding: 16,
    marginTop: 8,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  time: {
    fontSize: 12,
    color: '#c7c7c7',
  },
});
