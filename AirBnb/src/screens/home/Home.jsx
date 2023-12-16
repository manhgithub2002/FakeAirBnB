import {View, Text, Modal, Pressable, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import reusable from '../../components/Reusable/reuasble.style';
import {HeightSpacer, ReusableText, Recommendations} from '../../components';
import Places from '../../components/Home/Places';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {MagnifyingGlassIcon} from 'react-native-heroicons/outline';
import {TouchableOpacity} from 'react-native';
import styles from './home.style';
import BestHotel from '../../components/Home/BestHotel';

const Home = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  return (
    <SafeAreaView style={reusable.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ReusableText
              text={'Where to?'}
              family={'bold'}
              size={TEXT.large}
              color={COLORS.black}
            />
            <HeightSpacer height={15} />
            <View style={styles.searchContainer}>
              <View style={styles.searchWrapper}>
                <TextInput
                  style={styles.input}
                  value={searchKey}
                  onChangeText={setSearchKey}
                  placeholder="Where do you want to visit"
                />
              </View>

              <TouchableOpacity style={styles.searchBtn}>
                <MagnifyingGlassIcon color={COLORS.black} size={24} />
              </TouchableOpacity>
            </View>

            <HeightSpacer height={10} />
            <Places />

            <HeightSpacer height={15} />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View>
        <View style={reusable.rowWithSpace('space-between')}>
          <ReusableText
            text={'Fake AirBnB'}
            family={'regular'}
            size={TEXT.large}
            color={COLORS.black}
          />
          <TouchableOpacity
            style={styles.box}
            // onPress={() => navigation.navigate('Search')}
            onPress={() => setModalVisible(true)}>
            <MagnifyingGlassIcon color={COLORS.black} size={26} />
          </TouchableOpacity>
        </View>

        <HeightSpacer height={SIZES.xLarge} />

        <ReusableText
          text={'Places'}
          family={'medium'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <Places />

        <HeightSpacer height={15} />

        <Recommendations />

        <HeightSpacer height={30} />

        <BestHotel />
      </View>
    </SafeAreaView>
  );
};

export default Home;
