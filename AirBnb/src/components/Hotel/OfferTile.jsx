import {StyleSheet, View} from 'react-native';
import React from 'react';
import reusable from '../Reusable/reuasble.style';
import {COLORS, TEXT} from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';
import WidthSpacer from '../Reusable/WidthSpacer';
import * as Icons from 'react-native-heroicons/outline';

const OfferTile = ({item}) => {
  return (
    <View style={styles.container}>
      {item == 'TV' ? (
        <View style={reusable.rowWithSpace('flex-start')}>
          <Icons.TvIcon color={COLORS.black} size={26} />
          <WidthSpacer width={10} />
          <ReusableText
            text={item}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      ) : (
        <></>
      )}

      {item == 'Air Conditioning' ? (
        <View style={reusable.rowWithSpace('flex-start')}>
          <Icons.AdjustmentsHorizontalIcon color={COLORS.black} size={26} />
          <WidthSpacer width={10} />
          <ReusableText
            text={item}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      ) : (
        <></>
      )}

      {item == 'Wifi' ? (
        <View style={reusable.rowWithSpace('flex-start')}>
          <Icons.WifiIcon color={COLORS.black} size={26} />
          <WidthSpacer width={10} />
          <ReusableText
            text={item}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      ) : (
        <></>
      )}

      {item == 'Heating' ? (
        <View style={reusable.rowWithSpace('flex-start')}>
          <Icons.SunIcon color={COLORS.black} size={26} />
          <WidthSpacer width={10} />
          <ReusableText
            text={item}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      ) : (
        <></>
      )}

      {item == 'Kitchen' ? (
        <View style={reusable.rowWithSpace('flex-start')}>
          <Icons.FireIcon color={COLORS.black} size={26} />
          <WidthSpacer width={10} />
          <ReusableText
            text={item}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      ) : (
        <></>
      )}

      {item == 'Fridge' ? (
        <View style={reusable.rowWithSpace('flex-start')}>
          <Icons.DevicePhoneMobileIcon color={COLORS.black} size={26} />
          <WidthSpacer width={10} />
          <ReusableText
            text={item}
            family={'regular'}
            size={TEXT.medium}
            color={COLORS.black}
          />
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default OfferTile;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
  },
});
