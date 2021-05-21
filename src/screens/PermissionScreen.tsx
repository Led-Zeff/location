import React, { useContext } from 'react';
import { Button, Text, View } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionScreen = () => {
  const { askLocationPermission, permissions } = useContext(PermissionsContext);

  return (
    <View>
      <Text>{JSON.stringify(permissions, null, 2)}</Text>
      <Button title="Get permission" onPress={askLocationPermission} />
    </View>
  );
};
