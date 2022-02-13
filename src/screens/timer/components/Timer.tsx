import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../colors';
import { IconButton } from '../../../components/inputs/IconButton';
import { useAppSelector } from '../../../redux/store';
import { getTimes } from '../timerUtils';
import { ProgressBar } from './ProgressBar';

type Props = {
  spended: number;
  estimate: number;
  active?: boolean;
  onStart?: () => void;
  onReset?: () => void;
};

export const Timer = ({
  spended,
  active,
  estimate,
  onStart,
  onReset,
}: Props) => {
  const color = useAppSelector((state) => state.settings.theme);
  const time = getTimes(spended);

  const out = spended > estimate;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.timer,
          active && { borderColor: out ? COLORS.dangerF26969 : color },
        ]}>
        <Text
          style={
            styles.clock
          }>{`${time.hours}:${time.minutes}:${time.seconds}`}</Text>
        {spended > 0 && (
          <ProgressBar
            value={spended}
            max={estimate}
            color={color}
            width={100}
          />
        )}
        <View style={{ flexDirection: 'row', marginTop: 12 }}>
          <IconButton
            background
            icon={!active ? 'play' : 'pause'}
            onPress={onStart}
          />
          {!active && spended > 0 && (
            <IconButton background icon="reset" onPress={onReset} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  timer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 4,
    borderColor: '#f2f2f2',
  },
  clock: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 8,
  },
});
