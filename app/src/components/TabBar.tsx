import { StyleSheet, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { HomeIcon, ProfileIcon, ScheduleIcon, TaskIcon } from '../icons';
import { TabButton } from './TabButton';

const TAB_ICONS: Record<string, React.FC<SvgProps>> = {
  Home: HomeIcon,
  Tasks: TaskIcon,
  Schedule: ScheduleIcon,
  Profile: ProfileIcon,
};

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  return (
    <View style={styles.tabs}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const isCurrent = state.index === index;
          const icon = TAB_ICONS[route.name];

          return (
            <TabButton
              key={route.name}
              isCurrent={isCurrent}
              icon={icon}
              onPress={() => {
                navigation.navigate(route.name);
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: '#F8F9FA',
  },
  container: {
    marginHorizontal: 20,
    marginBottom: 32,
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    shadowColor: '#dee2e6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 16,
    padding: 4,
    flexDirection: 'row',
  },
});
