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
import {
  ACCOUNT_ROUTES,
  APP_ROUTES,
  VENDOR_ROUTES,
} from './../utils/route_names.util';
import TextInput from './../components/ui/text_input/text_input.ui';
import {useTheme} from '@react-navigation/native';
import Text from './../components/ui/text/text.ui';

const VendorResetPassword: FC<any> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {colors} = useTheme();

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
      color: '#EE5635',
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 30,
      alignSelf: 'flex-start',
    },
    noAccount: {
      fontSize: 16,
      color: '#3F9469',
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
      top: 50,
    },

    LoginBottom: {
      top: '20%',
      right: 0,
      alignSelf: 'flex-end',
    },
    noAccountContainers: {
      paddingTop: 40,
      alignSelf: 'flex-start',
    },
  });

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Imports.images.LoginTop
          style={{position: 'absolute', top: 0, left: 0}}
        />
        <View style={styles.customContainer}>
          <Text style={styles.heading}>Reset {'\n'}Password</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#F9F9F9"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#F9F9F9"
              onChangeText={setEmail}
              value={email}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate(VENDOR_ROUTES.Welcome)}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>Reset Password</Text>
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
            {/* <View style={styles.noAccountContainers}>
              <Text style={styles.noAccount}>Don't have an account</Text>
              <Text
                style={styles.createAccount}
                onPress={() => navigation.navigate(ACCOUNT_ROUTES.SignUp)}>
                Create an Account
              </Text>
            </View> */}
          </View>
        </View>
        <Imports.images.LoginBottom style={styles.LoginBottom} />
      </ScrollView>
    </Container>
  );
};

export default VendorResetPassword;
