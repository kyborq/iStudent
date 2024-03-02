import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { IconButton } from '../../components/IconButton';
import { AppParamList } from '../../components/navigation/Navigator';
import { PlusIcon } from '../../icons';

type ScreenProps = NativeStackScreenProps<AppParamList>;

export const NewSubjectScreen = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Новый предмет" onBack={() => navigation.pop()} />

      <ScrollView contentContainerStyle={{ gap: 12, flexGrow: 1 }}>
        <Form>
          <Text style={styles.title}>Общая информация</Text>
          <View style={styles.fields}>
            <Field placeholder="Название" />
            <Field placeholder="Аудитория / Корпус" />
          </View>
        </Form>

        <Form>
          <Text style={styles.title}>Преподаватели</Text>
          <View style={styles.fields}>
            <View>
              <IconButton icon={<PlusIcon />} />
            </View>
          </View>
        </Form>

        <Form>
          <Text style={styles.title}>Расписание</Text>
          <View style={styles.fields}>
            <View>
              <IconButton icon={<PlusIcon />} />
            </View>
          </View>
        </Form>
      </ScrollView>

      <Button text="Сохранить" isPrimary />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 20,
    paddingVertical: 32,
    flexGrow: 1,
    gap: 24,
  },
  title: {
    color: '#212529',
    fontFamily: 'Golos-Bold',
    lineHeight: 20,
  },
  fields: {
    gap: 4,
  },
});
