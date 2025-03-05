import React, {FC, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Container from './../components/hoc/container.hoc';
import Imports from './../assets/imports.assets';
import {VENDOR_ROUTES} from './../utils/route_names.util';
import TextInput from './../components/ui/text_input/text_input.ui';
import {useTheme} from '@react-navigation/native';
import Text from './../components/ui/text/text.ui';
import * as yup from 'yup';
import {useAuthContext} from '../api/authContext';
import {vendorLogin} from '../api/functions/auth';

const VendorLogin: FC<any> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = useTheme();
  const {setUser} = useAuthContext();
  const [loading, setloading] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
    },
    contentContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    heading: {
      fontWeight: '400',
      fontSize: 42,
      lineHeight: 50,
      fontFamily: 'Arial',
      color: '#FFF',
      padding: 30,
      textAlign: 'left',
    },
    input: {
      width: Dimensions.get('window').width - 50,

      height: 56,
      borderColor: '#F9F9F9',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 16,
      marginBottom: 16,
      fontSize: 18,
      backgroundColor: '#FFFFFF00',
      color: '#FFFFFF', // Change text color
    },
    loginButton: {
      width: Dimensions.get('window').width - 50,

      height: 56,
      backgroundColor: '#F9F9F9',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 18,
      color: '#000000',
      textAlign: 'center',
    },
    forgotPassword: {
      fontSize: 16,
      color: colors.vendorPrimary,
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },
    noAccount: {
      fontSize: 16,
      color: colors.vendorPrimary,
      paddingTop: 5,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },
    createAccount: {
      fontSize: 16,
      color: '#FFF',
      paddingTop: 5,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },

    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 20,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      width: '80%',
      backgroundColor: '#FFFFFF',
    },
    dividerText: {
      color: '#FFFFFF',
      marginHorizontal: 10,
    },
    socialIconsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
    },
    socialIcon: {
      marginLeft: 5,
      padding: 15,
      width: 42,
      height: 42,
      borderRadius: 21,

      justifyContent: 'center',
      alignItems: 'center',
    },
    customContainer: {
      top: 150,
    },

    LoginBottom: {
      top: '20%',
      right: 0,
      alignSelf: 'flex-end',
    },
    noAccountContainers: {
      paddingVertical: 40,
      paddingBottom: 80,
      alignSelf: 'flex-start',
    },
  });
  let schema = yup.object().shape({
    email: yup
      .string()
      .email('Email must be a valid email address')
      .required('Email is required'),

    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required'),
  });
  const login = async () => {
    schema
      .validate({
        email,
        password,
      })
      .then(async valid => {
        if (valid) {
          setloading(true);
          const res = await vendorLogin(email, password);
          if (res) {
            setUser(res.vendor);
          }
          setloading(false);
        }
      })
      .catch(err => console.log(err))
      .finally(() => setloading(false));
  };
  return (
    <Container style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Imports.images.LoginTop
          style={{position: 'absolute', top: 0, left: 0}}
        />
        <View style={styles.customContainer}>
          <Text style={styles.heading}>Login</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#F9F9F9"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#F9F9F9"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <Text
              style={styles.forgotPassword}
              onPress={() => navigation.navigate(VENDOR_ROUTES.ForgotPassword)}>
              Forgot Password?
            </Text>
            <TouchableOpacity
              style={styles.loginButton}
              activeOpacity={0.8}
              disabled={loading}
              onPress={login}>
              <Text style={styles.buttonText}>
                {loading ? 'Logging in' : 'Login'}
              </Text>
            </TouchableOpacity>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity style={styles.socialIcon}>
                <Imports.images.Google style={{width: 42, height: 42}} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Imports.images.Facebook style={{width: 42, height: 42}} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Imports.images.Apple style={{width: 42, height: 42}} />
              </TouchableOpacity>
            </View>
            <View style={styles.noAccountContainers}>
              <Text style={styles.noAccount}>Don't have an account</Text>
              <Text
                style={styles.createAccount}
                onPress={() => navigation.navigate(VENDOR_ROUTES.SignUp)}>
                Create an Account
              </Text>
            </View>
          </View>
        </View>
        <Imports.images.LoginBottom style={styles.LoginBottom} />
      </ScrollView>
    </Container>
  );
};

export default VendorLogin;
