import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

export interface AppLocation {
  latitude: number;
  longitude: number;
}

export const useLocation = () => {
  const [hasLocation, setHasLocation] = useState(false);
  const [initialPosition, setInitialPosition] = useState<AppLocation>();
  const watchRef = useRef<number>();

  const getLocation = (callback: (location: AppLocation) => void) => {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        callback({ latitude, longitude });
      },
      console.log,
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
      },
    );
  };

  const followLocation = (callback: (location: AppLocation) => void) => {
    stopFollowing();

    const ref = Geolocation.watchPosition(
      ({ coords: { latitude, longitude } }) =>
        callback({ latitude, longitude }),
      console.log,
      { enableHighAccuracy: true, distanceFilter: 1 },
    );
    watchRef.current = ref;
  };

  const stopFollowing = () => {
    if (watchRef.current) {
      Geolocation.clearWatch(watchRef.current);
    }
  };

  useEffect(() => {
    getLocation(({ latitude, longitude }) => {
      setInitialPosition({ latitude, longitude });
      setHasLocation(true);
    });
  }, []);

  return {
    hasLocation,
    initialPosition,
    getLocation,
    followLocation,
    stopFollowing,
  };
};
