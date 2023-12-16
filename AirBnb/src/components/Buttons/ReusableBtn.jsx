import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {SIZES} from '../../constants/theme';

const ReusableBtn = ({
  onPress,
  btnText,
  textColor,
  width,
  backgroundColor,
  borderWidth,
  boderColor,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(width, backgroundColor, borderWidth, boderColor)}>
      <Text style={styles.btnText(textColor)}>{btnText}</Text>
    </TouchableOpacity>
  );
};

export default ReusableBtn;

const styles = StyleSheet.create({
  btnText: textColor => ({
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color: textColor,
  }),
  btnStyle: (width, backgroundColor, borderWidth, boderColor) => ({
    width: width,
    backgroundColor: backgroundColor,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: SIZES.small,
    boderColor: boderColor,
    borderWidth: borderWidth,
  }),
});
