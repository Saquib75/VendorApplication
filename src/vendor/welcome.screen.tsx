import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Container from './../components/hoc/container.hoc';
import Imports from './../assets/imports.assets';
import {ACCOUNT_ROUTES, VENDOR_ROUTES} from './../utils/route_names.util';
import {useTheme} from '@react-navigation/native';
import AppHeader from './../components/app_header.component';
import Text from './../components/ui/text/text.ui';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const VendorWelcome: React.FC<any> = ({navigation}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    heading: {
      fontWeight: '700',
      fontSize: 55,
      lineHeight: 60,
      fontFamily: 'Arial',
      padding: 25,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: colors.vendorPrimary,
      marginTop: '80%',
    },

    contentBox: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      padding: 20,
      textAlign: 'justify',
      backgroundColor: '#000',
      borderTopWidth: 9,
      borderRightWidth: 0.1,
      borderLeftWidth: 0.1,
      borderTopColor: colors.vendorPrimary,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },
    paragraph: {
      textAlign: 'left',
      // letterSpacing: 1,
      marginTop: 20,
      lineHeight: 30,
      fontSize: 20,
      fontFamily: 'Poppins',
      fontWeight: '300',
      color: '#FFF',
    },
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    loginBtn: {
      backgroundColor: '#303437',
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginRight: 10,
      // width: 125,
      flex: 1,
    },
    joinBtn: {
      backgroundColor: colors.vendorPrimary,
      borderRadius: 20,
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginLeft: 10,
      // width: 125,
      flex: 1,
    },
    loginText: {
      fontSize: 18,
      color: colors.text,
      textAlign: 'center',
    },
  });

  return (
    <Container style={styles.container}>
      <AppHeader />
      <Imports.images.Welcome
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: Dimensions.get('window').width,
        }}
      />
      <Text style={styles.heading}>
        Welcome {'\n'}To{'\n'}DealzUp
      </Text>

      <View style={styles.contentBox}>
        <Text
          title
          style={{...styles.paragraph, fontWeight: '800', fontSize: 25}}>
          Enjoy 3 Months Free Trial !
        </Text>
        <Text style={styles.paragraph}>
          Enjoy all the benefits without any charges during this special
          introductory period.
        </Text>
        <View style={styles.buttons}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(VENDOR_ROUTES.Login)}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(VENDOR_ROUTES.SignUp)}
            style={styles.joinBtn}>
            <Text style={styles.loginText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default VendorWelcome;
