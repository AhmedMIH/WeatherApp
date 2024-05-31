
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigation from './src/Routes/AppNavigation';
import Colors from './src/Utils/Colors';
import 'react-native-gesture-handler';
import Config from 'react-native-config';


function App () {
  const queryClient = new QueryClient();
  useEffect( () => {
    SplashScreen.hide()
  }, [] )

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor={Colors.gradient} />
      <AppNavigation />
    </QueryClientProvider>

  );
}
export default App;
