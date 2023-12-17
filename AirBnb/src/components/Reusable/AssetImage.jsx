import {StyleSheet, Image} from 'react-native';
import React from 'react';

const AssetImage = ({data, width, height, mode}) => {
  return <Image source={data} style={styles.image(width, height, mode)} />;
};

export default AssetImage;

const styles = StyleSheet.create({
  image: (width, height, mode) => ({
    width: width,
    height: height,
    resizeMode: mode,
  }),
});
