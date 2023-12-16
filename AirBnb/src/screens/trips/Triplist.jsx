import {FlatList, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import ReusableTiles from '../../components/Reusable/ReusableTiles';

const TripList = ({data}) => {
  const navigation = useNavigation();

  const renderItem = ({item}) => (
    <View style={{marginBottom: 10}}>
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
            <HeightSpacer height={8} />

            <ReusableText
              text={item.title}
              family={'medium'}
              size={14}
              color={COLORS.gray}
            />

            <HeightSpacer height={8} />

            <View style={reusable.rowWithSpace('flex-start')}>
              <Rating rating={item.rating} />
              <WidthSpacer width={5} />
              <ReusableText
                text={` (${item.review}) `}
                family={'medium'}
                size={14}
                color={COLORS.gray}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      renderItem={renderItem}
    />
  );
};

export default TripList;
