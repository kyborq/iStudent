import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { uuid4 } from '../../utils';
import { TIcon } from '../Icon';
import { NavButton } from './NavButton';

const TabBarIcons: { [key: string]: string } = {
  TasksScreen: 'check',
  SubjectsScreen: 'book',
  ScheduleScreen: 'calendar',
  HomeScreen: 'home',
};

export const NavBar = ({
  navigation,
  state,
  descriptors,
}: BottomTabBarProps) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        const isFocused = state.index === index;
        const icon = TabBarIcons[route.name] as TIcon;

        return (
          <NavButton
            key={uuid4()}
            icon={icon}
            label={`${label}`}
            active={isFocused}
            onPress={() => navigation.navigate(route.name)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: 24,
    // paddingVertical: 20,
    // paddingBottom: 12,
    height: 78,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    overflow: 'visible',
  },
});
