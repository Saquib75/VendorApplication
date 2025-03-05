import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import VectorIcon from '../components/ui/vector_icon/vector_icon';

type Props = {};
const {height, width} = Dimensions.get('screen');

const AddPayment: FC<any> = ({navigation}) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    // Clean up listeners
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={styles.flex}>
      <View style={styles.header}>
        <VectorIcon
          type="Octicons"
          name="chevron-left"
          size={40}
          color={'#FFFFFF'}
          onPress={() => console.log('')}
        />
        <Text style={styles.headertext}>Hi, Saif</Text>
        <VectorIcon
          type="FontAwesome"
          name="close"
          color={'#FFFFFF'}
          size={35}
          onPress={() => console.log('')}
        />
      </View>
      <View style={[styles.bar]}>
        <Text style={styles.bartext}>Add to Wallet</Text>
      </View>
      {!isKeyboardVisible && (
        <Image
          source={require('../assets/images/Ellipse2.png')}
          style={styles.elips}
          resizeMode="contain"
        />
      )}
      <ScrollView>
        <Text style={styles.amount}>Enter Amount</Text>

        <TextInput
          placeholderTextColor={'#EE5635'}
          value="$50"
          style={styles.input}>
          {/* 50 */}
        </TextInput>

        <View style={styles.underline}></View>

        <View style={styles.container}>
          <Text style={styles.wallettext}>
            Your are about to add $50 on your wallet.
          </Text>
        </View>
        <View style={styles.uline}></View>

        <Text style={styles.pmethod}>Payment Method</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: '5%',
            justifyContent: 'space-between',
            marginBottom: '10%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/images/amex.png')}
              style={{marginRight: '5%'}}
              resizeMode="cover"></Image>
            <Image
              source={require('../assets/images/visa.png')}
              style={{marginRight: '5%'}}
              resizeMode="cover"></Image>
            <Image
              source={require('../assets/images/master.png')}
              style={{marginRight: '5%'}}
              resizeMode="cover"></Image>
          </View>
          <TouchableOpacity style={styles.addtochable}>
            <Text style={styles.addtochabletxt}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addwallete}>
          <Text style={styles.txtwallet}>Add To Wallet</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
  },
  headertext: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 39,
  },
  bar: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bartext: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    margin: 5,
  },
  elips: {position: 'absolute', bottom: (height * 5) / 100},
  amount: {
    alignSelf: 'center',
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 33,
    marginTop: '18%',
    marginVertical: '5%',
    marginBottom: '2%',
    // marginHorizontal: '7%',
    color: '#F9F9F9',
  },
  input: {
    fontWeight: '500',
    fontSize: 48,
    alignSelf: 'center',
    lineHeight: 70,
    color: '#EE5635',
  },
  underline: {
    alignSelf: 'center',
    width: (width * 35) / 100,
    backgroundColor: '#454343',
    height: 1,
  },
  container: {
    marginTop: '5%',
    backgroundColor: '#18191C',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  wallettext: {
    fontWeight: '400',
    fontSize: 14,
    alignSelf: 'center',
    lineHeight: 21,
    marginVertical: '6%',
    color: '#F9F9F9',
    //   width: '80%',
  },
  uline: {
    backgroundColor: '#454343',
    height: 1,
    marginTop: '5%',
  },
  pmethod: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    marginVertical: '5%',
    marginHorizontal: '5%',
    color: '#F9F9F9',
  },
  addtochable: {
    backgroundColor: '#18191C',
    borderRadius: 5,
    width: '17%',
    alignItems: 'center',
  },
  addtochabletxt: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    marginVertical: '7%',
    marginHorizontal: '8%',
    color: '#F9F9F9',
  },
  addwallete: {
    backgroundColor: '#FAD6AD',
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtwallet: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginVertical: '7%',
    color: '#000000',
  },
});

export default AddPayment;
