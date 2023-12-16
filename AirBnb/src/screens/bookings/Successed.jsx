import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {
  AssetImage,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
} from '../../components';
import {COLORS, SIZES} from '../../constants/theme';
import ReusableTiles from '../../components/Reusable/ReusableTiles';
import {useRoute} from '@react-navigation/native';

const Successed = ({navigation}) => {
  const router = useRoute();
  const {property, host} = router.params;
  return (
    <View>
      <View style={{marginTop: '40%'}}>
        <AssetImage
          data={require('../../assets/images/checked.png')}
          width={'100%'}
          height={200}
          mode={'contain'}
        />

        <HeightSpacer height={40} />

        <View style={{alignItems: 'center'}}>
          <ReusableText
            text={
              host !== 'host' ? 'Booking Successful' : 'Creating Successful'
            }
            family={'medium'}
            size={SIZES.xLarge}
            color={COLORS.black}
          />
          <HeightSpacer height={20} />

          {host !== 'host' ? (
            <ReusableText
              text={'You can find your details below'}
              family={'regular'}
              size={SIZES.medium}
              color={COLORS.gray}
            />
          ) : null}

          <HeightSpacer height={20} />
        </View>

        <View style={{margin: 20}}>
          {host !== 'host' ? (
            <View>
              <ReusableText
                text={'Room Details'}
                family={'bold'}
                size={SIZES.medium}
                color={COLORS.black}
              />

              <HeightSpacer height={20} />

              <ReusableTiles
                item={property}
                onPress={() =>
                  navigation.navigate('HotelDetails', {id: property.id})
                }
              />
            </View>
          ) : null}

          <HeightSpacer height={40} />

          <ReusableBtn
            onPress={() =>
              navigation.navigate(host !== 'host' ? 'Bottom' : 'HostBottom')
            }
            btnText={'Done'}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            boderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        </View>
      </View>
    </View>
  );
};

export default Successed;

const styles = StyleSheet.create({
  image: (width, height, mode) => ({
    width: width,
    height: height,
    resizeMode: mode,
  }),
});
