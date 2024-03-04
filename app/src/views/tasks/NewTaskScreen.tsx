import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '../../components/Button';
import { Field } from '../../components/Field';
import { Form } from '../../components/Form';
import { Header } from '../../components/Header';
import { ScreenProps } from '../../components/navigation/Navigator';

export const NewTaskScreen = ({ navigation }: ScreenProps) => {
  return (
    <SafeAreaView style={styles.root}>
      <Header title="Новая задача" onBack={() => navigation.pop()} />

      <ScrollView contentContainerStyle={styles.content}>
        <Form title="Информация по задаче">
          <View style={styles.fields}>
            <Field placeholder="Название" />
            <Field placeholder="Дедлайн" />
            <Field placeholder="Длительность" />
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
  content: {
    gap: 12,
    flexGrow: 1,
  },
  fields: {
    gap: 4,
  },
  pin: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F0F3F6',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
  },
  value: {
    flex: 1,
  },
  text: {
    color: '#212529',
    fontFamily: 'Golos-Bold',
    lineHeight: 20,
  },
  description: {
    color: '#BECBE0',
    fontFamily: 'Golos-Regular',
    lineHeight: 20,
    fontSize: 13,
  },
});
