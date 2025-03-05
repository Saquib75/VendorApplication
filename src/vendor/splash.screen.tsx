import {
  ActivityIndicator,
  Image,
  Linking,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import Container from '../components/hoc/container.hoc';
import Text from '../components/ui/text/text.ui';
import {StackActions, useTheme} from '@react-navigation/native';
import Icon from '../components/ui/icon/icon.ui';
import {useDispatch} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import splashEvents from '../utils/events/splash.events.util';
// import LinearGradient from "react-native-linear-gradient"
import Storage from '../utils/storage.utils';
import {
  ACCOUNT_ROUTES,
  APP_ROUTES,
  MAIN_ROUTES,
} from '../utils/route_names.util';
import Spacer from '../components/ui/spacer/spacer.ui';
import {confirmAsyncAlert} from '../utils/functions.utils';
import Imports from '../assets/imports.assets';
import {MMKV} from 'react-native-mmkv';
// import { getConfigs } from '../../store/actions/config.actions';
const Splash: React.FC<any> = ({navigation}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const storage = new MMKV();
  const styles = StyleSheet.create({
    screen: {
      backgroundColor: colors.card,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
    logo: {
      height: 200,
      width: 200,
    },
  });
  // const user = false;
  const nextScreen = async () => {
    var redirect = MAIN_ROUTES.App;
    return redirect;
  };
  const fetchInternet = () =>
    new Promise((resolve, reject) => {
      console.log('Fetching Internet');
      NetInfo.fetch()
        .then(state => {
          console.log('Connection type', state.type);
          resolve(state.isConnected);
        })
        .catch(err => {
          reject(err);
        });
    });

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      fetchInternet().then(isConnected => {
        if (isConnected) {
          nextScreen().then(async redirect => {
            navigation.dispatch(StackActions.replace(MAIN_ROUTES.Vendor));
          });
        } else {
          navigation.dispatch(StackActions.replace(MAIN_ROUTES.NoInternet));
        }
      });
    }, 2000);
    return () => {
      clearTimeout(splashTimeout);
    };
  }, []);
  console.log('SplashTexture:', Imports.images.SplashTexture);

  return (
    <Container headerTranslucent barStyle={'light-content'}>
      <View style={styles.screen}>
        <Imports.images.SplashTexture
          style={{position: 'absolute', top: 0, left: 0}}
        />
        <Text style={{color: colors.text, fontSize: 60, fontWeight: '700'}}>
          Dealzup
        </Text>
        <Text
          style={{
            color: colors.text,
            fontSize: 15,
            textAlign: 'right',
            width: '100%',
            marginTop: 10,
          }}>
          Everyone's Marketplace
        </Text>
        <View style={{position: 'absolute', bottom: 50}}>
          <ActivityIndicator animating color="#fff" size={30} />
          <Spacer />
          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              letterSpacing: 6,
              color: '#fff',
            }}>
            POWERED BY
          </Text>
          <Spacer size={5} />
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              fontWeight: '600',
              color: '#fff',
            }}>
            Textcher
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default Splash;
