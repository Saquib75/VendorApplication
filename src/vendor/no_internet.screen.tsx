import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Container from '../components/hoc/container.hoc';
import Text from '../components/ui/text/text.ui';
import NetInfo from '@react-native-community/netinfo';
import Button from '../components/ui/button/button.ui';
import {StackActions} from '@react-navigation/native';
import {MAIN_ROUTES} from '../utils/route_names.util';
import Storage from '../utils/storage.utils';
import {useTheme} from '@react-navigation/native';
import Spacer from '../components/ui/spacer/spacer.ui';
// import LottieView from 'lottie-react-native';
import VectorIcon from '../components/ui/vector_icon/vector_icon';
const NoInternet: React.FC<any> = ({navigation}) => {
  const [retrying, setRetrying] = useState(false);
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 30,
    },
  });

  const retryInternetCheck = () => {
    // console.log('Fetching Internet');
    setRetrying(true);
    NetInfo.fetch()
      .then(async state => {
        // console.log('Connection type', state.isConnected);
        if (state.isConnected) {
          navigation.dispatch(StackActions.replace(MAIN_ROUTES.SplashScreen));
        }
        // let isWelcome = await Storage.getItem('welcome-page')
        // isWelcome = isWelcome !== null;
      })
      .catch(err => {
        console.log('Fetch Internet Err', err);
      })
      .finally(() => {
        setRetrying(false);
      });
  };

  return (
    <Container safeArea>
      <View style={styles.container}>
        <VectorIcon
          name="access-point-network-off"
          type="MaterialCommunityIcons"
          size={160}
          color={colors.primary_dark}
        />
        <Text style={{fontSize: 25, textAlign: 'center'}}>
          Sorry no internet connection found.
        </Text>
        <Spacer />
        <Text style={{textAlign: 'center'}}>
          Please turn on your mobile data or connect to any WiFi.
        </Text>
      </View>
      <Button
        loading={retrying}
        loadingText="Searching for internet"
        secondary
        icon={{type: 'MaterialIcons', name: 'cell-tower', color: colors.white}}
        text="Retry"
        onPress={retryInternetCheck}
        style={{margin: 20}}
      />
      <Spacer />
    </Container>
  );
};

export default NoInternet;
