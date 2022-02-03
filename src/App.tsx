import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './components/navigation/Navigation';
import moment from 'moment';
import 'moment/locale/ru';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

moment.locale('ru');

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
