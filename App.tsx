import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/navigation/StackNavigation';
import { PermissionsProvider } from './src/context/PermissionsContext';

const App = () => {
  return (
    <NavigationContainer>
      <PermissionsProvider>
        <StackNavigation />
      </PermissionsProvider>
    </NavigationContainer>
  );
};

export default App;
