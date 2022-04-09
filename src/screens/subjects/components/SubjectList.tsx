import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { Empty } from '../../../components/Empty';
import { useAppSelector } from '../../../redux/store';
import { uuid4 } from '../../../utils/uuid4';
import { SubjectCard } from './SubjectCard';
import { SubjectsPanel } from './SubjectsPanel';

export const SubjectList = () => {
  const navigation = useNavigation();

  const { subjects } = useAppSelector((state) => state.subjects);

  const viewSubject = (id: string) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'ViewSubject',
        params: { id },
      }),
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {!!subjects.length && (
        <SubjectsPanel
          all={0}
          archived={0}
          filter="ALL"
          onSetFilter={() => {}}
        />
      )}
      {subjects.map((s, i) => {
        return (
          <SubjectCard
            key={uuid4()}
            subject={s}
            last={i === subjects.length - 1}
            onPress={() => viewSubject(s.id)}
          />
        );
      })}
      {!subjects.length && <Empty text="Список предметов отсутствует" />}
    </View>
  );
};
