import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Empty } from '../../../components/Empty';
import { strings } from '../../../locales';
import { useAppSelector } from '../../../redux/store';
import { TSubject } from '../../../redux/subjectsSlice';
import { uuid4 } from '../../../utils/uuid4';
import { SubjectCard } from './SubjectCard';
import { SubjectsPanel } from './SubjectsPanel';

interface IFilter {
  [key: string]: TSubject[];
}

export const SubjectList = () => {
  const [filter, setFilter] = useState('ALL');
  const navigation = useNavigation();

  const { subjects } = useAppSelector((state) => state.subjects);

  const allSubjects = subjects.filter((s) => !s.archived);
  const archivedSubjects = subjects.filter((s) => s.archived);

  const filteredSubjects: IFilter = {
    ALL: allSubjects,
    ARCHIVED: archivedSubjects,
  };

  const subjectList = filteredSubjects[filter];

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
      <SubjectsPanel
        all={allSubjects.length}
        archived={archivedSubjects.length}
        filter={filter}
        onSetFilter={setFilter}
      />
      {subjectList.map((s, i) => {
        return (
          <SubjectCard
            key={uuid4()}
            subject={s}
            last={i === subjectList.length - 1}
            onPress={() => viewSubject(s.id)}
          />
        );
      })}
      {!subjects.length && <Empty text={strings.empty} />}
    </View>
  );
};
