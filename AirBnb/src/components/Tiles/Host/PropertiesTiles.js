import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, TEXT} from '../../../constants/theme';
import {
  NetworkImage,
  ReusableText,
  WidthSpacer,
} from '../../../components/index';
import reusable from '../../Reusable/reuasble.style';

const PropertiesTiles = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace('flex-start')}>
        <NetworkImage
          source={item.imageUrl}
          width={80}
          height={80}
          radius={12}
        />

        <WidthSpacer width={15} />

        <View>
          <ReusableText
            text={item.title}
            family={'medium'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
});
export default PropertiesTiles;
