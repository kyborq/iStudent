import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Header } from '../../components/Header';
import { useAppDispatch } from '../../redux/store';
import { RootStackParamList } from '../../components/navigation/Navigation';
import { Select } from '../../components/inputs/Select';

export const EditEvent = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'EditEvent'>>();
  const id = route?.params?.id;
  const date = route?.params?.date;

  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handleBack = () => {
    navigation.goBack();
  };

  const title = !!id ? 'Изменить расписание' : 'Добавить в расписание';

  return (
    <View style={styles.container}>
      <Header title={title} rightIcon="clear" onRight={handleBack} />
      <ScrollView contentContainerStyle={styles.content}>
        <Select
          items={[
            { title: 'Математика', value: '123' },
            { title: 'Русский', value: '123' },
          ]}
          label="Выберите предмет"
          value="Математика"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    flexGrow: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    overflow: 'visible',
    paddingBottom: 8,
    marginBottom: -16,
    paddingTop: 12,
    marginTop: -12,
  },
});
