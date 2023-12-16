import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import reusable from '../../Reusable/reuasble.style';
import {IconOutline} from '@ant-design/icons-react-native';
import ReusableText from '../../Reusable/ReusableText';
import {COLORS, SIZES} from '../../../constants/theme';
import WidthSpacer from '../../Reusable/WidthSpacer';
import HeightSpacer from '../../Reusable/HeightSpacer';
import ReusableBtn from '../../Buttons/ReusableBtn';

const ProfileAuthTiles = ({onPress, onPress1}) => {
  return (
    <View>
      <ReusableText
        text={'Log in to start planning your next trip'}
        family={'regular'}
        size={SIZES.medium}
        color={COLORS.black}
      />

      <HeightSpacer height={30} />

      <ReusableBtn
        onPress={onPress}
        btnText={'Log in'}
        width={SIZES.width - 40}
        backgroundColor={COLORS.green}
        boderColor={COLORS.green}
        borderWidth={0}
        textColor={COLORS.white}
      />

      <HeightSpacer height={15} />

      <ReusableText
        text={`Don't have an account?`}
        family={'regular'}
        size={SIZES.medium}
        color={COLORS.black}
      />
      <WidthSpacer width={5} />
      <TouchableOpacity>
        <ReusableText
          text={`Sign up`}
          family={'regular'}
          size={SIZES.medium}
          color={COLORS.black}
          decor={'underline'}
          onPress={onPress1}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileAuthTiles;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    marginBottom: 10,
  },
});
