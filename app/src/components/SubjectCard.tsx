import { StyleSheet, Text, View } from 'react-native';

import { Subject } from '../api/models/subjectModel';
import { ProfileIcon, TaskIcon } from '../icons';
import { IconButton } from './IconButton';

type Props = {
  subject: Subject;
};

export const SubjectCard = ({ subject }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.line} />
      <View style={styles.info}>
        <Text style={styles.name}>{subject.name}</Text>
        <View style={styles.footer}>
          <IconButton
            icon={<ProfileIcon fill="#1774FF" />}
            label={subject.teacherName}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 18,
    shadowColor: '#dee2e6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 16,
    gap: 12,
    flexDirection: 'row',
  },
  line: {
    width: 4,
    borderRadius: 2,
    backgroundColor: '#e9ecef',
  },
  info: {
    gap: 12,
  },
  name: {
    color: '#212529',
    fontFamily: 'Golos-Bold',
    lineHeight: 20,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 16,
  },
});
