import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './components/navigation/Navigation';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { NativeModules } from 'react-native';
import { setLocale } from './localizations/localization';

const App = () => {
  const persistor = persistStore(store);

  const locale = NativeModules.I18nManager.localeIdentifier;

  useEffect(() => {
    setLocale(locale);
  }, [locale]);

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
