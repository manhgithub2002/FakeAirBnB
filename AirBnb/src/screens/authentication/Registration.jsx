import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './signin.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {
  LockClosedIcon,
  UserIcon,
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
} from 'react-native-heroicons/outline';
import {
  HeightSpacer,
  ReusableBtn,
  ReusableText,
  WidthSpacer,
} from '../../components';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const validateSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Require'),
  fullname: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .required('Require'),
  email: Yup.string().email('Provide a valid email').required('Required'),
});

const Registration = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [obsecureText, setObsecureText] = useState(true);

  const setUserInDb = async (uid, user, fullname) => {
    try {
      await firestore().collection('users').doc(uid).set({
        email: user.email,
        fullname: fullname,
      });
      console.log('Add user in DB');
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegistration = async values => {
    try {
      const {fullname, email, password} = values;
      const {user} = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      console.log(user.uid);
      navigation.navigate('Home');

      setUserInDb(user.uid, user, fullname);
      console.log('Registration successful');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <ReusableText
        text={'Sign up'}
        family={'bold'}
        size={TEXT.xxLarge}
        color={COLORS.black}
      />
      <HeightSpacer height={30} />
      <Formik
        initialValues={{fullname: '', email: '', password: ''}}
        validationSchema={validateSchema}
        onSubmit={values => {
          handleRegistration(values);
          // console.log(values);
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
                  touched.username ? COLORS.lightBlue : COLORS.lightGrey,
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
                  value={values.username}
                  onChangeText={handleChange('fullname')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{flex: 1}}
                />
              </View>
              {touched.username && errors.username && (
                <Text style={styles.errorMessage}>{errors.username}</Text>
              )}
            </View>

            {/* Email input */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View
                style={styles.inputWrapper(
                  touched.email ? COLORS.lightBlue : COLORS.lightGrey,
                )}>
                <EnvelopeIcon color={COLORS.gray} size={20} />

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

            {/* Password input */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Password</Text>
              <View
                style={styles.inputWrapper(
                  touched.password ? COLORS.lightBlue : COLORS.lightGrey,
                )}>
                <LockClosedIcon color={COLORS.gray} size={20} />

                <WidthSpacer width={5} />

                <TextInput
                  secureTextEntry={obsecureText}
                  placeholder="Enter Password"
                  onFocus={() => {
                    setFieldTouched('password');
                  }}
                  onBlur={() => {
                    setFieldTouched('password', '');
                  }}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{flex: 1}}
                />

                <TouchableOpacity
                  onPress={() => {
                    setObsecureText(!obsecureText);
                  }}>
                  {obsecureText ? (
                    <EyeIcon color={COLORS.gray} size={18} />
                  ) : (
                    <EyeSlashIcon color={COLORS.gray} size={18} />
                  )}
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorMessage}>{errors.password}</Text>
              )}
            </View>
            <HeightSpacer height={20} />

            {/* Button Submit */}
            <ReusableBtn
              onPress={handleSubmit}
              btnText={'REGISTER'}
              width={SIZES.width - 40}
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

export default Registration;
