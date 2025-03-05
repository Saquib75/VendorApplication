import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import React, {FC, useState} from 'react';
import VectorIcon from '../components/ui/vector_icon/vector_icon';
import Container from '../components/hoc/container.hoc';
import {VENDOR_TAB_ROUTES} from '../utils/route_names.util';

const {height, width} = Dimensions.get('screen');

const DashBoard: FC<any> = ({navigation}) => {
  const {colors} = useTheme();

  const [selected, setSelected] = useState(0);
  const chops = [
    {name: 'Flyers', items: 0},
    {name: 'Banners', items: 0},
    {name: 'Offers', items: 0},
    {name: 'Deals', items: 0},
  ];

  return (
    <Container>
      <View style={{flex: 1}}>
        {/* <View style={styles.header}>
        <VectorIcon
          type="Octicons"
          name="three-bars"
          size={40}
          color={'#FFFFFF'}
          onPress={() => console.log('')}
        />
        <Text style={styles.headertext}>Hi, Saif</Text>
        <VectorIcon
          type="FontAwesome5"
          name="chevron-right"
          color={'#FFFFFF'}
          size={35}
          // onPress={() => navigation.goBack()}
        />
      </View> */}
        <View style={[styles.bar]}>
          <Image
            source={require('../assets/images/category.png')}
            style={styles.reviewimg}
            resizeMode="contain"></Image>
          <Text style={styles.bartext}>KFC</Text>
          <VectorIcon
            type="FontAwesome5"
            name="chevron-right"
            color={'#000000'}
            size={22}
            // onPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView>
          <TouchableOpacity style={styles.uploadbtn}>
            <Image
              source={require('../assets/images/video.png')}
              resizeMode="cover"></Image>
            <Text style={styles.uploadtxt}>Upload Your Short Videos</Text>
          </TouchableOpacity>

          <View style={{flexShrink: 1}}>
            <View style={styles.chopscontainer}>
              {chops.map((chop, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate(VENDOR_TAB_ROUTES.DealsV)}
                  style={[
                    styles.flyers,
                    selected == index && {
                      backgroundColor: colors.vendorPrimary,
                    },
                  ]}
                  key={index}>
                  <Text
                    style={[
                      styles.chopstext,
                      selected == index && {color: '#000000'},
                    ]}>
                    {chop.name}
                  </Text>
                  <Text
                    style={[
                      styles.chopstext2,
                      selected == index && {color: '#000000'},
                    ]}>
                    {chop.items}
                  </Text>
                  <View
                    style={[
                      styles.floating,
                      selected == index && {backgroundColor: '#000000'},
                    ]}>
                    <VectorIcon
                      type="MaterialCommunityIcons"
                      name="arrow-top-right"
                      color={selected == index ? '#FFFFFF' : '#000000'}
                      size={(width * 5) / 100}
                      onPress={() => navigation.navigate('DealsV')}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity style={styles.footer}>
            <View style={styles.footersub}>
              <Text style={styles.footertext}>Request to create your own</Text>
              <Text style={styles.footerflyer}>Flyers</Text>
            </View>
            <VectorIcon
              type="FontAwesome5"
              name="chevron-right"
              color={'#FFFFFF'}
              size={25}
              style={{margin: 10}}
              // onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floating: {
    height: (width * 9) / 100,
    width: (width * 9) / 100,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    marginTop: 2,
    margin: 15,
  },
  chopscontainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footersub: {margin: 10, marginLeft: 17},
  footer: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: '#2F2F2F',
    borderRadius: 13,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  footerflyer: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
  },
  footertext: {
    color: '#EE5635',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 21,
  },
  chopstext: {
    fontSize: 20,
    color: '#FFFFFF',
    margin: '10%',
    marginBottom: 0,
    fontWeight: '700',
  },
  chopstext2: {
    fontSize: (width * 12) / 100,
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '400',
  },
  uploadbtn: {
    // width: '0%',
    width: Dimensions.get('window').width - 20,
    height: (height * 17) / 100,
    backgroundColor: '#FCECE8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  uploadtxt: {
    fontSize: 18,
    color: '#000000',
    margin: '2%',
    lineHeight: 27,
    fontWeight: '500',
  },
  bartext: {
    fontSize: 22,
    fontWeight: '400',
    color: '#000000',
    marginHorizontal: 5,
  },
  headertext: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 26,
    lineHeight: 39,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '3%',
  },
  reviewimg: {
    margin: 5,
    width: 32,
    height: 32,
    borderRadius: 60,
  },
  flyers: {
    width: Dimensions.get('window').width / 2 - 20,
    borderRadius: 15,
    margin: 10,
    backgroundColor: '#2F2F2F',
  },
});
export default DashBoard;
