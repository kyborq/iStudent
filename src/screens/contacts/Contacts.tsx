import { CommonActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../../components/UI/Header';

export const Contacts = () => {
  const navigation = useNavigation();

  const handleAddContact = () =>
    navigation.dispatch(
      CommonActions.navigate({
        name: 'EditContact',
        params: {},
      }),
    );

  return (
    <View style={styles.container}>
      <Header
        title="Контакты"
        // primaryActionIcon="search"
        // primaryAction={() => {}}
        secondaryActionIcon="addSquare"
        secondaryAction={handleAddContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    flex: 1,
  },
});
