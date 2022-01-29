import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './components/navigation/Navigation';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const App = () => {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
