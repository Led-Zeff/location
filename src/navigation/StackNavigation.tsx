import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeSreen } from '../screens/HomeSreen';
import { PermissionScreen } from '../screens/PermissionScreen';
import { ActivityIndicator } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';

const Stack = createStackNavigator();

export const StackNavigation = () => {
  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <ActivityIndicator size={50} color="black" />;
  }

  return (
    <Stack.Navigator>
      {permissions.locationStatus === 'granted' ? (
        <Stack.Screen name="Home" component={HomeSreen} />
      ) : (
        <Stack.Screen name="Permission" component={PermissionScreen} />
      )}
    </Stack.Navigator>
  );
};
