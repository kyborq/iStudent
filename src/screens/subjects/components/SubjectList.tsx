import React from 'react';
import { View } from 'react-native';
import { useAppSelector } from '../../../redux/store';
import { uuid4 } from '../../../utils/uuid4';
import { SubjectCard } from './SubjectCard';

export const SubjectList = () => {
  const { subjects } = useAppSelector((state) => state.subjects);

  return (
    <View>
      {subjects.map((s, i) => {
        return (
          <SubjectCard
            key={uuid4()}
            subject={s}
            last={i === subjects.length - 1}
          />
        );
      })}
    </View>
  );
};
