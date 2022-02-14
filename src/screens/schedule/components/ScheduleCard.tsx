import React from 'react';
import { Text, View } from 'react-native';
import { TEvent } from '../../../redux/scheduleSlice';

type Props = {
  event: TEvent;
  current?: boolean;
  past?: boolean;
};

export const ScheduleCard = ({ event, current, past }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 12,
        padding: 12,
        paddingHorizontal: 16,
        borderColor: current ? '#000' : '#f2f2f2',
        borderRadius: 12,
        borderWidth: 1,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
        }}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: past ? '#c7c7c7' : '#000',
          }}>
          {event.time.start}
        </Text>
        <View
          style={{
            marginVertical: 4,
            width: 16,
            backgroundColor: '#f2f2f2',
            height: 4,
            borderRadius: 2,
          }}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: past ? '#c7c7c7' : '#000',
          }}>
          {event.time.end}
        </Text>
      </View>
      <View style={{ paddingLeft: 8, paddingTop: 4 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: past ? '#c7c7c7' : '#000',
          }}>
          {event.title}
        </Text>
      </View>
    </View>
  );
};
