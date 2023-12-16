import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import reusable from '../../Reusable/reuasble.style';
import {HeightSpacer, ReusableText, WidthSpacer} from '../../index';
import {COLORS, TEXT} from '../../../constants/theme';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const HostTiles = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace('space-between')}>
        <View style={{width: 200}}>
          <ReusableText
            text={'Post your place'}
            family={'medium'}
            size={TEXT.medium}
            color={COLORS.black}
          />
          <HeightSpacer height={8} />

          <ReusableText
            text={"It's simple to get set up and start earning"}
            family={'medium'}
            size={14}
            color={COLORS.gray}
          />
        </View>

        <Image
          source={{
            uri: 'https://i.pinimg.com/564x/b2/1c/f3/b21cf3118a1bd81ec9b45a2de43817ea.jpg',
          }}
          style={styles.image}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HostTiles;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    shadowColor: COLORS.lightGrey,
  },
  image: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
    borderColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 12,
  },
});
