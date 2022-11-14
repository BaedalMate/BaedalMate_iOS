import Geolocation from '@react-native-community/geolocation';
import {Map} from 'components/molecules/Setting/Map';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

export interface LocationI {
  latitude: number;
  longitude: number;
}
const GPS = props => {
  const [location, setLocation] = useState<LocationI>();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude,
          longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  return (
    <View>
      {location ? (
        <View style={{width: '100%', height: '100%'}}>
          <View style={{flex: 1}}>
            <Map location={location} />
          </View>
          <View style={{flex: 1}}>
            <Text>
              Lat:{location.latitude}, Long:{location.longitude}
            </Text>
          </View>
        </View>
      ) : (
        // <>
        //   <Text>Latitude:{location.latitude}</Text>
        //   <Text>Longitude:{location.longitude}</Text>
        // </>
        <Text>Loading</Text>
      )}
    </View>
  );
};

export default GPS;
