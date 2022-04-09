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
    paddingHorizontal: 12,
    height: 64,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    overflow: 'visible',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 13,
  },
});
