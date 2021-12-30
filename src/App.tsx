import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabsNavigation } from './components/navigation/Navigation';

const App = () => {
  return (
    <NavigationContainer>
      <TabsNavigation />
    </NavigationContainer>
  );
};

export default App;
