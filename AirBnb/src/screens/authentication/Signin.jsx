import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import styles from './signin.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {COLORS, SIZES, TEXT} from '../../constants/theme';
import {
  LockClosedIcon,
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
  email: Yup.string().email('Provide a valid email').required('Required'),
});

const Signin = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [obsecureText, setObsecureText] = useState(true);

  const handleLogin = async values => {
    try {
      const {email, password} = values;
      await auth().signInWithEmailAndPassword(email, password);
      navigation.navigate('Home');

      console.log('Login successful');
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
        text={'Sign in'}
        family={'bold'}
        size={TEXT.xxLarge}
        color={COLORS.black}
      />
      <HeightSpacer height={30} />
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validateSchema}
        onSubmit={value => {
          // console.log(value);
          handleLogin(value);
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
            {/* Email input */}
            <View style={styles.wrapper}>
              <Text style={styles.label}>Email</Text>
              <View
                style={styles.inputWrapper(
                  touched.email ? COLORS.lightBlue : COLORS.lightGrey,
                )}>
                <EnvelopeIcon size={20} color={COLORS.gray} />

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
                <LockClosedIcon size={20} color={COLORS.gray} />

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
              btnText={'SIGN IN'}
              width={SIZES.width - 40}
              backgroundColor={COLORS.green}
              boderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />

            <HeightSpacer height={50} />

            <ReusableBtn
              onPress={() => {}}
              btnText={'SIGN IN WITH GOOGLE'}
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

export default Signin;
