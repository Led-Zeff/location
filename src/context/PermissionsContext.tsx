import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import {
  check,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  request,
} from 'react-native-permissions';

export interface PermissionState {
  locationStatus: PermissionStatus;
}

export const permissionsInitState: PermissionState = {
  locationStatus: 'unavailable',
};

type PermissionsContextProps = {
  permissions: PermissionState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
};

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {
  const [permissions, setPermissions] = useState(permissionsInitState);

  const askLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

      if (status === 'blocked') {
        openSettings();
      }

      setPermissions({
        locationStatus: status,
      });
    }
  };

  const checkLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      setPermissions({
        locationStatus: status,
      });
    }
  };

  useEffect(() => {
    checkLocationPermission();
    AppState.addEventListener('change', state => {
      if (state !== 'active') {
        return;
      }

      checkLocationPermission();
    });
  }, []);

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        askLocationPermission,
        checkLocationPermission,
      }}>
      {children}
    </PermissionsContext.Provider>
  );
};
