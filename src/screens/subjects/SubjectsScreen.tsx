import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { FloatingButton } from '../../components/FloatingButton';
import { Header } from '../../components/Header';
import { strings } from '../../localizations/localization';
import { SubjectList } from './components/SubjectList';

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
        <Header title={strings.subjects} rightIcon="search" />
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
