import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, TEXT} from '../../../constants/theme';
import {HeightSpacer, ReusableText} from '../../../components';

const Insights = ({navigation}) => {
  return (
    <View styles={{flex: 1, backgroundColor: COLORS.lightWhite}}>
      <ScrollView>
        <HeightSpacer height={50} />

        <View style={{marginHorizontal: 20}}>
          <View>
            <ReusableText
              text={'Insights'}
              family={'bold'}
              size={TEXT.xxLarge}
              color={COLORS.black}
            />
          </View>

          <HeightSpacer height={50} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});
export default Insights;
