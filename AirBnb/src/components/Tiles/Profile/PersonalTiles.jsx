import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import reusable from '../../Reusable/reuasble.style';
import {HeightSpacer, ReusableText, WidthSpacer} from '../../index';
import {COLORS, TEXT} from '../../../constants/theme';
import {ChevronRightIcon} from 'react-native-heroicons/outline';

const PersonalTiles = ({name, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={reusable.rowWithSpace('space-between')}>
        <View style={reusable.rowWithSpace('flex-start')}>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/vi/b/b0/Avatar-Teaser-Poster.jpg',
            }}
            style={styles.image}
          />

          <WidthSpacer width={15} />

          <View>
            <ReusableText
              text={name}
              family={'bold'}
              size={TEXT.medium}
              color={COLORS.black}
            />
            <HeightSpacer height={8} />

            <ReusableText
              text={'Show profile'}
              family={'medium'}
              size={TEXT.medium}
              color={COLORS.gray}
            />
          </View>
        </View>

        <ChevronRightIcon color={COLORS.black} size={26} />
      </View>
    </TouchableOpacity>
  );
};

export default PersonalTiles;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    // borderBottomWidth: 1,
    // borderBottomColor: COLORS.lightGrey,
  },
  image: {
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 90,
  },
});
