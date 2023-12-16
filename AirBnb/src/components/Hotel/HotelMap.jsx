import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../constants/theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const HotelMap = ({coordinates}) => {
  return (
    <MapView
      style={styles.maps}
      provider={PROVIDER_GOOGLE}
      region={coordinates}>
      <Marker
        coordinates={coordinates}
        title={coordinates.title}
        pinColor="red"
      />
    </MapView>
  );
};

export default HotelMap;

const styles = StyleSheet.create({
  maps: {
    marginVertical: 10,
    height: 200,
    width: '100%',
    borderRadius: 20,
    borderWidth: 1,
  },
});