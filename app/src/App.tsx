import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NavigationContainer } from '@react-navigation/native';

import { AppNavigation } from './components/navigation/Navigator';

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

export const App = () => {
  return (
    <QueryClientProvider client={client}>
      <NavigationContainer>
        <StatusBar backgroundColor="#F8F9FA" barStyle="dark-content" />
        <AppNavigation />
      </NavigationContainer>
    </QueryClientProvider>
  );
};
