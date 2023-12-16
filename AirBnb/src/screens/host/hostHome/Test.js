import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import {COLORS, SIZES, TEXT} from '../../../constants/theme';
import {HeightSpacer, ReusableText} from '../../../components';
import {ClipboardDocumentCheckIcon} from 'react-native-heroicons/outline';

const TabContent1 = () => (
  <View style={styles.tabContent}>
    <View style={{alignItems: 'center', marginHorizontal: 20}}>
      <ClipboardDocumentCheckIcon size={30} color={COLORS.black} />

      <HeightSpacer height={15} />

      <ReusableText
        text={`You don't have any guests checking out today or tomorrow.`}
        family={'regular'}
        size={TEXT.medium}
        color={COLORS.gray}
        align={'center'}
      />
    </View>
  </View>
);

const TabContent2 = () => (
  <View style={styles.tabContent}>
    <View style={{alignItems: 'center', marginHorizontal: 20}}>
      <ClipboardDocumentCheckIcon size={30} color={COLORS.black} />

      <HeightSpacer height={15} />

      <ReusableText
        text={`You don't have any guests stay with you now.`}
        family={'regular'}
        size={TEXT.medium}
        color={COLORS.gray}
        align={'center'}
      />
    </View>
  </View>
);

const TabContent3 = () => (
  <View style={styles.tabContent}>
    <View style={{alignItems: 'center', marginHorizontal: 20}}>
      <ClipboardDocumentCheckIcon size={30} color={COLORS.black} />

      <HeightSpacer height={15} />

      <ReusableText
        text={`You don't have any guests arrving with you now.`}
        family={'regular'}
        size={TEXT.medium}
        color={COLORS.gray}
        align={'center'}
      />
    </View>
  </View>
);

const TabContent4 = () => (
  <View style={styles.tabContent}>
    <Text>Content of Tab 4</Text>
    {/* Thêm các phần tử UI khác của tab 3 nếu cần */}
  </View>
);

const Test = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabContents = [TabContent1, TabContent2, TabContent3, TabContent4];

  const tabs = [
    'Checking out',
    'Currently hosting',
    'Arriving soon',
    'Pending review',
  ]; // Thay đổi các tab tùy thuộc vào nhu cầu của bạn
  return (
    <View>
      <FlatList
        horizontal
        data={tabs}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{columnGap: SIZES.small}}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            onPress={() => setActiveTab(index)}
            style={[
              styles.tab,
              {borderColor: activeTab === index ? COLORS.black : COLORS.gray},
              {borderWidth: activeTab === index ? 2 : 1},
            ]}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      <HeightSpacer height={15} />
      {/* Nội dung của mỗi tab */}
      <View style={{height: 200, marginLeft: 10}}>
        {React.createElement(tabContents[activeTab])}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: SIZES.large,
    borderColor: COLORS.gray,
  },
  text: {
    fontFamily: 'medium',
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  tabContent: {
    backgroundColor: COLORS.lightWhite,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
});

export default Test;
