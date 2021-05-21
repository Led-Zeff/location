import React, { useEffect, useRef } from 'react';
import { ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { Fab } from './Fab';

export const Map = () => {
  const {
    hasLocation,
    initialPosition,
    getLocation,
    followLocation,
    stopFollowing,
  } = useLocation();
  const mapView = useRef<MapView>();
  const isFollowing = useRef(true);

  const centerPosition = () => {
    getLocation(location => {
      mapView.current?.animateCamera({
        center: location,
      });
    });
  };

  useEffect(() => {
    followLocation(location => {
      if (!isFollowing.current) {
        return;
      }

      mapView.current?.animateCamera({
        center: location,
      });
    });

    return stopFollowing;
  }, [followLocation, stopFollowing]);

  if (!hasLocation || !initialPosition) {
    return <ActivityIndicator size={50} color="black" />;
  }

  return (
    <>
      <MapView
        ref={el => (mapView.current = el ?? undefined)}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ flex: 1 }}
        showsUserLocation
        userLocationUpdateInterval={1}
        onTouchStart={() => (isFollowing.current = false)}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="Fuck this"
          description="Katze"
          // image={{
          //   uri: 'https://cdn4.iconfinder.com/data/icons/maps-and-location/128/Map__Location_indicator_marked-512.png',
          // }}
        />
      </MapView>

      <Fab
        icon="L"
        onPress={() => {
          centerPosition();
          isFollowing.current = true;
        }}
        style={{ position: 'absolute', bottom: 10, right: 10 }}
      />
    </>
  );
};
