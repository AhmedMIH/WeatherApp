
import React, { useEffect } from 'react';
import AppNavigation from './src/Routes/AppNavigation';
import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import SplashScreen from 'react-native-splash-screen';


function App () {
  const queryClient = new QueryClient();
  useEffect( () => {
    SplashScreen.hide()
  }, [] )

  return (
    <QueryClientProvider client={queryClient}>
      <AppNavigation />
    </QueryClientProvider>

  );
}
export default App;
