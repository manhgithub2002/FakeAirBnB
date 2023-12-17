import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {PlusCircleIcon, MinusCircleIcon} from 'react-native-heroicons/outline';
import reusable from './reuasble.style';
import {ReusableText} from '..';
import {COLORS, SIZES} from '../../constants/theme';
const Counter = ({initialValue, onValueChange}) => {
  const [count, setCount] = useState(initialValue || 0);

  const increment = () => {
    setCount(count + 1);
    onValueChange(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
      onValueChange(count - 1);
    }
  };
  return (
    <View style={reusable.rowWithSpace('space-between')}>
      <MinusCircleIcon size={26} color={COLORS.gray} onPress={decrement} />

      <ReusableText
        text={` ${count} `}
        family={'regular'}
        size={SIZES.medium}
        color={COLORS.black}
      />

      <PlusCircleIcon size={26} color={COLORS.gray} onPress={increment} />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
