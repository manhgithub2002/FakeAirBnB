import {StyleSheet, Text} from 'react-native';
import React from 'react';

const ReusableText = ({
  text,
  family,
  size,
  color,
  align,
  decor,
  onPress,
  lines,
}) => {
  return (
    <Text
      numberOfLines={lines}
      style={styles.textStyle(family, size, color, align, decor)}
      onPress={onPress}>
      {text}
    </Text>
  );
};

export default ReusableText;

const styles = StyleSheet.create({
  textStyle: (family, size, color, align, decor) => ({
    fontFamily: family,
    fontSize: size,
    color: color,
    textAlign: align,
    textDecorationLine: decor,
  }),
});
