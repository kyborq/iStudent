import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';
import { TOUCHABLE_COLOR } from '../../../colors';
import { CardBase } from '../../../components/CardBase';
import { Icon } from '../../../components/Icon';
import { useAppSelector } from '../../../redux/store';
import { TSubject } from '../../../redux/subjectsSlice';
import { SubjectIcon } from './SubjectIcon';

type Props = {
  subject: TSubject;
  last?: boolean;
  onPress?: () => void;
};

export const SubjectCard = ({ subject, last, onPress }: Props) => {
  return (
    <View style={styles.ripple}>
      <TouchableNativeFeedback background={TOUCHABLE_COLOR} onPress={onPress}>
        <View>
          <View style={styles.container}>
            <SubjectIcon
              label={subject.title}
              background={subject.archived ? '#fafafa' : subject.color}
              color={subject.archived ? '#c7c7c7' : '#fff'}
            />
            <View style={styles.info}>
              <Text
                style={[
                  styles.label,
                  subject.archived && {
                    textDecorationLine: 'line-through',
                    color: '#c7c7c7',
                  },
                ]}>
                {subject.title}
              </Text>
              {!!subject.teacher && (
                <Text style={styles.teacher}>{subject.teacher}</Text>
              )}
            </View>
          </View>
          {!last && (
            <View
              style={{
                height: 1,
                backgroundColor: '#fafafa',
                marginHorizontal: 20,
              }}
            />
          )}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  ripple: {},
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  info: {
    marginLeft: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teacher: {
    fontSize: 12,
    marginTop: 4,
    color: '#c7c7c7',
  },
});
