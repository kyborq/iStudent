import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FloatingButton } from '../../components/FloatingButton';
import { Header } from '../../components/Header';
import { SubjectList } from './components/SubjectList';
import { SubjectsPanel } from './components/SubjectsPanel';

export const SubjectsScreen = () => {
  const navigation = useNavigation();

  const handleAddSubject = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditSubject',
      }),
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        stickyHeaderIndices={[0]}>
        <Header title="Предметы" rightIcon="search" />
        <SubjectList />
      </ScrollView>
      <FloatingButton icon="add" onPress={handleAddSubject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
