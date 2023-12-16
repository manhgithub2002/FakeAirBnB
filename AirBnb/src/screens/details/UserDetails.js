import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CameraIcon} from 'react-native-heroicons/solid';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {
  AppBar,
  HeightSpacer,
  NetworkImage,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';

const UserDetails = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  // const reference = storage().ref('black-t-shirt-sm.png');
  const [imageUrl, setImageUrl] = useState(
    'https://api-private.atlassian.com/users/f3ba6e3feb7b6867012f05b2f873affb/avatar',
  );
  const [transferred, setTransferred] = useState(0);

  const openImagePicker = () => {
    const options = {
      title: 'Select Image',
      type: 'library',
      options: {
        selectionLimit: 0,
        mediaType: 'photo',
        maxWidth: 50,
        maxHeight: 50,
        includeBase64: false,
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log(imageUri);
        setImageUrl(imageUri);
      }
    });
  };

  const uploadImage = async () => {
    console.log(imageUrl);
    const uri = imageUrl;
    console.log(uri);
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setLoading(true);
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    // set progress state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    // setImageUrl(null);
  };

  useEffect(() => {
    setLoading(true);
    const unsub = auth().onAuthStateChanged(async user => {
      if (user) {
        const docRef = firestore().collection('users').doc(user.uid);
        const docSnap = await docRef.get();
        userTemp = docSnap.data();
        userTemp.uid = user.uid;
        userInfo.photoUrl = user.photoURL;
        setUserInfo(userTemp);
        setLoading(false);
      } else {
        console.log('Fail to get user information!');
      }
    });

    return () => unsub;
  }, []);

  if (loading)
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <View style={styles.container}>
      <AppBar
        title={''}
        color={COLORS.white}
        color1={COLORS.white}
        onPress={() => navigation.goBack()}
        top={20}
        left={20}
        right={20}
      />
      <HeightSpacer height={60} />
      <View style={styles.userBox}>
        <HeightSpacer height={15} />
        <NetworkImage
          source={
            userInfo.photoUrl ? userInfo.photoUrl : imageUrl
            // : 'https://api-private.atlassian.com/users/f3ba6e3feb7b6867012f05b2f873affb/avatar'
          }
          width={85}
          height={85}
          radius={12}
        />

        <TouchableOpacity
          onPress={() => {
            openImagePicker();
          }}
          style={styles.btnStyle}>
          <CameraIcon size={16} color={COLORS.dark} />
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <HeightSpacer height={15} />

        <ReusableText
          text={userInfo.fullname}
          family={'bold'}
          size={SIZES.xLarge}
          color={COLORS.black}
          align={'center'}
        />

        <HeightSpacer height={15} />

        {imageUrl ? (
          <ReusableBtn
            onPress={uploadImage}
            btnText={'Update'}
            width={100}
            backgroundColor={COLORS.green}
            boderColor={COLORS.green}
            borderWidth={0}
            textColor={COLORS.white}
          />
        ) : null}
      </View>

      <HeightSpacer height={30} />

      <ReusableText
        text={"It's time to create your profile"}
        family={'bold'}
        size={SIZES.large}
        color={COLORS.black}
      />

      <HeightSpacer height={10} />
      <ReusableText
        text={
          'Setup profile is an important part of every reservation. Create yours to help orther Hosts and guests get to know you'
        }
        family={'medium'}
        size={SIZES.medium}
        color={COLORS.gray}
      />

      <HeightSpacer height={15} />

      <ReusableBtn
        onPress={() => {}}
        btnText={'Create frofile'}
        width={SIZES.width - 40}
        backgroundColor={COLORS.green}
        boderColor={COLORS.green}
        borderWidth={0}
        textColor={COLORS.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  userBox: {
    width: SIZES.width - 40,
    height: 250,
    backgroundColor: COLORS.lightWhite,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  btnStyle: {
    width: 50,
    backgroundColor: COLORS.lightGrey,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 20,
    borderRadius: SIZES.small,
    // boderColor: boderColor,
    // borderWidth: borderWidth,
  },
  btnText: {
    fontFamily: 'medium',
    fontSize: SIZES.small,
    color: COLORS.black,
  },
});
export default UserDetails;
