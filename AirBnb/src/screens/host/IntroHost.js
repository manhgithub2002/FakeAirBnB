import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HeightSpacer, ReusableBtn, ReusableText} from '../../components';
import {COLORS, TEXT} from '../../constants/theme';

const IntroHost = ({navigation}) => {
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <ReusableText
          text={'Yod could earn'}
          family={'medium'}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text={'$ 500'}
          family={'medium'}
          size={TEXT.medium}
          color={COLORS.black}
        />
        <HeightSpacer height={10} />
        <ReusableText
          text={'per month'}
          family={'medium'}
          size={TEXT.medium}
          color={COLORS.black}
        />
      </View>

      <HeightSpacer height={30} />
      <ReusableBtn
        onPress={() => {
          navigation.navigate('HostWelcome');
        }}
        btnText={'Start to create'}
        width={SIZES.width - 50}
        backgroundColor={COLORS.green}
        boderColor={COLORS.green}
        borderWidth={0}
        textColor={COLORS.white}
      />
    </View>
  );
};

export default IntroHost;

const styles = StyleSheet.create({});
