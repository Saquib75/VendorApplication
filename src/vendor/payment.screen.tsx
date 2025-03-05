import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {FC, useState} from 'react';
import VectorIcon from '../components/ui/vector_icon/vector_icon';

type Props = {};
const {height, width} = Dimensions.get('screen');

const Payment: FC<any> = ({navigation}) => {
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
        <Text style={styles.bartext}>Dashboard-KFC</Text>
      </View>

      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.five}>5</Text>
          <Text style={styles.days}>Days</Text>
        </View>
        <View style={styles.uline2}></View>

        <View style={styles.delscon}>
          <Text style={styles.dels}>
            Your deal will run for 5 days with a budget of $10
          </Text>
        </View>
        <View style={styles.uline}></View>

        <Text style={styles.paymentdetails}>Payment Details</Text>

        <View style={styles.condetail}>
          <View style={styles.conpay}>
            <View style={{}}>
              <Text style={styles.tamout}>Total Budget</Text>
              <Text style={styles.tamount1}>$2 a day x 5 days</Text>
            </View>
            <Text style={styles.tamout}>$25</Text>
          </View>

          <View style={styles.conpay1}>
            <Text style={styles.tamout}>Estimated Tax</Text>

            <Text style={styles.tamout}>$4.50</Text>
          </View>

          <View style={styles.conpay}>
            <Text style={styles.tamout}>Total Amount</Text>

            <Text style={styles.tamout}>$29.50</Text>
          </View>
        </View>

        <Text style={styles.pmethod}>Payment Method</Text>
        <View style={styles.addcardcon}>
          <View style={styles.row}>
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
          <TouchableOpacity style={styles.btnadd}>
            <Text style={styles.txtadd}>Add</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.subscribetochable}>
          <Text style={styles.subscribetxt}>Subscribe Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  main: {
    marginTop: '6%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
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
  subscribetxt: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    marginVertical: '7%',
    color: '#000000',
  },
  subscribetochable: {
    backgroundColor: '#FAD6AD',
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtadd: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    marginVertical: '7%',
    marginHorizontal: '8%',
    color: '#F9F9F9',
  },
  btnadd: {
    backgroundColor: '#18191C',
    borderRadius: 5,
    width: '17%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addcardcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '5%',
    justifyContent: 'space-between',
    marginBottom: '10%',
  },
  pmethod: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    marginVertical: '5%',
    marginHorizontal: '5%',
    color: '#F9F9F9',
  },
  tamout: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#F9F9F9',
  },
  conpay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    marginVertical: '2%',
    marginBottom: '4%',
  },
  conpay1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
  tamount1: {
    fontWeight: '300',
    fontSize: 10,
    lineHeight: 15,
    color: '#F9F9F9',
  },
  condetail: {
    backgroundColor: '#18191C',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  paymentdetails: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 27,
    marginVertical: '5%',
    marginHorizontal: '7%',
    color: '#F9F9F9',
  },
  uline: {
    backgroundColor: '#454343',
    height: 1,
    marginTop: '5%',
  },
  dels: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    margin: '5%',
    color: '#F9F9F9',
    width: '80%',
  },
  delscon: {
    marginTop: '5%',
    backgroundColor: '#18191C',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  uline2: {
    alignSelf: 'center',
    width: (width * 35) / 100,
    backgroundColor: '#454343',
    height: 1,
  },
  days: {
    marginHorizontal: '1.5%',
    fontWeight: '400',
    fontSize: 22,
    lineHeight: 33,
    color: '#EE5635',
  },
  five: {
    fontWeight: '500',
    fontSize: 60,
    lineHeight: 70,
    color: '#EE5635',
  },
});

export default Payment;
