import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
} from 'react-native-heroicons/outline';
import {
  AppBar,
  HeightSpacer,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const validateSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Require'),
  email: Yup.string().email('Provide a valid email').required('Required'),
  phoneNumber: Yup.string().min(10, 'Invalid phone number'),
});

const InformationDetails = ({navigation}) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const saveUser = async values => {
    try {
      await firestore().collection('users').doc(userInfo.uid).set({
        email: values.email,
        fullname: values.fullname,
        phoneNumber: values.phoneNumber,
      });
      setUserInfo(values);
      console.log('Success');
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsub = auth().onAuthStateChanged(async user => {
      if (user) {
        const docRef = firestore().collection('users').doc(user.uid);
        const docSnap = await docRef.get();
        userTemp = docSnap.data();
        userTemp.uid = user.uid;
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

      <HeightSpacer height={50} />
      <ReusableText
        text={'Edit personal info'}
        family={'bold'}
        size={TEXT.xLarge}
        color={COLORS.black}
      />

      <HeightSpacer height={15} />

      <Formik
        initialValues={{
          fullname: userInfo.fullname,
          email: userInfo.email,
          phoneNumber: null,
        }}
        validationSchema={validateSchema}
        onSubmit={values => {
          saveUser(values);
          console.log(values);
        }}>
        {({
          handleChange,
          touched,
          handleSubmit,
          values,
          errors,
          isValid,
          setFieldError,
          setFieldTouched,
        }) => (
          <View>
            {/* Fullname input */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Fullname</Text>
              <View
                style={styles.inputWrapper(
                  touched.fullname ? COLORS.lightBlue : COLORS.lightGrey,
                )}>
                <UserIcon color={COLORS.gray} size={20} />

                <WidthSpacer width={5} />

                <TextInput
                  placeholder="Enter Fullname"
                  onFocus={() => {
                    setFieldTouched('fullname');
                  }}
                  onBlur={() => {
                    setFieldTouched('fullname', '');
                  }}
                  value={values.fullname}
                  onChangeText={handleChange('fullname')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{flex: 1}}
                />
              </View>
              {touched.fullname && errors.fullname && (
                <Text style={styles.errorMessage}>{errors.fullname}</Text>
              )}
            </View>

            {/* Email input */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View
                style={styles.inputWrapper(
                  touched.email ? COLORS.lightBlue : COLORS.lightGrey,
                )}>
                <EnvelopeIcon
                  // name={focused ? 'grid' : 'grid-outline'}
                  color={COLORS.gray}
                  size={20}
                />

                <WidthSpacer width={5} />

                <TextInput
                  placeholder="Enter Email"
                  onFocus={() => {
                    setFieldTouched('email');
                  }}
                  onBlur={() => {
                    setFieldTouched('email', '');
                  }}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{flex: 1}}
                />
              </View>
              {touched.email && errors.email && (
                <Text style={styles.errorMessage}>{errors.email}</Text>
              )}
            </View>

            {/* phone number input */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Phone Number</Text>
              <View
                style={styles.inputWrapper(
                  touched.phoneNumber ? COLORS.lightBlue : COLORS.lightGrey,
                )}>
                <LockClosedIcon color={COLORS.gray} size={20} />

                <WidthSpacer width={5} />

                <TextInput
                  placeholder="Enter phoneNumber"
                  onFocus={() => {
                    setFieldTouched('phoneNumber');
                  }}
                  onBlur={() => {
                    setFieldTouched('phoneNumber', '');
                  }}
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{flex: 1}}
                />
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorMessage}>{errors.phoneNumber}</Text>
              )}
            </View>
            <HeightSpacer height={20} />

            {/* Button Submit */}
            <ReusableBtn
              onPress={handleSubmit}
              btnText={'Save'}
              width={100}
              backgroundColor={COLORS.green}
              boderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
  inputWrapper: borderColor => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  }),
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'regular',
    fontSize: SIZES.small,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: 'right',
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: 'regular',
    fontSize: SIZES.small,
    marginTop: 5,
    marginLeft: 5,
  },
});
export default InformationDetails;
