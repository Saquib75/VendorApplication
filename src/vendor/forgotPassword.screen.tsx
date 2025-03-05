import React, {FC, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Container from './../components/hoc/container.hoc';
import Imports from './../assets/imports.assets';
import {ACCOUNT_ROUTES, VENDOR_ROUTES} from './../utils/route_names.util';
import TextInput from './../components/ui/text_input/text_input.ui';
import {useTheme} from '@react-navigation/native';
import Text from './../components/ui/text/text.ui';
const {height} = Dimensions.get('screen');
const VendorForgotPassword: FC<any> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const {colors} = useTheme();

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
        navigation.navigate(VENDOR_ROUTES.VerificationCode);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showMessage, navigation]);

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
    messageContainer: {
      backgroundColor: '#1F1F1F',
      padding: 20,
      marginVertical: 10,
      borderRadius: 8,
      margin: 20,
      width: Dimensions.get('window').width - 50,
    },
    messageText: {
      color: '#FFFFFF',
      textAlign: 'center',
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
      paddingTop: height * 0.18,
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

  const handleNext = () => {
    setShowMessage(true);
    // Here you can also send the code to the email
  };

  return (
    <Container style={styles.container}>
      <ScrollView>
        <Imports.images.LoginTop
          style={{position: 'absolute', top: 0, left: 0}}
        />
        <View style={styles.customContainer}>
          <Text style={styles.heading}>Forgot{'\n'}Password?</Text>
          <View style={{alignItems: 'center'}}>
            {!showMessage && (
              <TextInput
                style={styles.input}
                placeholder=" Enter Registered Email"
                placeholderTextColor="#F9F9F9"
                onChangeText={setEmail}
                value={email}
              />
            )}
            {showMessage && (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                  We have sent code to your email.
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleNext}
              activeOpacity={0.8}>
              <Text style={styles.buttonText}>Next</Text>
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
            <TouchableOpacity style={styles.noAccountContainers}>
              <Text style={styles.noAccount}>Don't have an account</Text>
              <Text
                style={styles.createAccount}
                onPress={() => navigation.navigate(VENDOR_ROUTES.SignUp)}>
                Create an Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Imports.images.LoginBottom style={styles.LoginBottom} />
      </ScrollView>
    </Container>
  );
};

export default VendorForgotPassword;
