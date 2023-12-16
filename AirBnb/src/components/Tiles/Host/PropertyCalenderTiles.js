import {View, StyleSheet} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {COLORS, TEXT} from '../../../constants/theme';
import {ReusableText, WidthSpacer} from '../../../components/index';
import {CalendarDaysIcon} from 'react-native-heroicons/outline';
import reusable from '../../Reusable/reuasble.style';

const PropertyCalenderTiles = ({item, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace('space-between')}>
        <View>
          <ReusableText
            text={item.title}
            family={'medium'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>

        <WidthSpacer width={15} />

        <CalendarDaysIcon size={50} color={COLORS.black} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    marginBottom: 10,
  },
});
export default PropertyCalenderTiles;
