import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../../colors';
import { IconButton } from '../../../components/inputs/IconButton';

type Props = {
  status: boolean;
  important: boolean;
  onDelete?: () => void;
  onArchive?: () => void;
  onComplete?: () => void;
  onPriority?: () => void;
};

export const TaskFooter = ({
  status,
  important,
  onArchive,
  onComplete,
  onDelete,
  onPriority,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        {status && (
          <IconButton
            icon="trash"
            color={COLORS.dangerF26969}
            containerStyle={{ marginRight: 10 }}
            size={54}
            onPress={onDelete}
          />
        )}
        {!status && (
          <IconButton
            icon="star"
            color={important ? '#fff' : COLORS.darkC7C7C7}
            background={important ? COLORS.mediumF2BB69 : COLORS.lightFAFAFA}
            containerStyle={{ marginRight: 10 }}
            size={54}
            onPress={onPriority}
          />
        )}
        {!status && (
          <IconButton
            icon="archive"
            color={COLORS.darkC7C7C7}
            size={54}
            onPress={onArchive}
          />
        )}
      </View>
      <IconButton
        icon="checkLine"
        color={status ? '#FFF' : COLORS.darkC7C7C7}
        background={status ? COLORS.primary5A9EEE : COLORS.lightFAFAFA}
        label={status ? 'Завершена' : 'Не завершена'}
        size={54}
        onPress={onComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttons: {
    flexDirection: 'row',
  },
});
