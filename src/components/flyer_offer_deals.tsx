import React from 'react';
import Container from './hoc/container.hoc';
import {Dimensions, FlatList, ScrollView, View} from 'react-native';
import Spacer from './ui/spacer/spacer.ui';
import Text from './ui/text/text.ui';
import FlyerBox from './flyer_box.component';
import {APP_ROUTES} from '../utils/route_names.util';
import {useTheme} from '@react-navigation/native';
import DealOfferBox from './deal_offer_box.component';
import Line from './ui/line/line.ui';
const {width, height} = Dimensions.get('screen');

function FlyerOfferDeals({navigation}: {navigation: any}) {
  const {colors} = useTheme();

  const dummyFlyers = [
    {
      title: 'Sobeys',
    },
    {
      title: 'Walmart',
    },
    {
      title: 'No Frills',
    },
  ];
  const flyer = {
    active: true,
    business: 2,
    business_details: {
      address: '6.8a kustia road',
      business_logo:
        'http://18.221.93.82:8000/media/business_logos/BisMilk_Logo.png',
      business_registration_number: '1234567890',
      business_verification_document:
        'http://18.221.93.82:8000/media/verification_docs/healthcare.png',
      city: 'kolkata',
      country: 'India',
      email: 'salsaalshahid9038@gmail.com',
      end_date: null,
      id: '2',
      is_verified: true,
      link: null,
      name: 'Salsaal',
      phone: '8335974849',
      postal_code: '700039',
      start_date: null,
      state: 'West Bengal',
      vendor: 2,
    },
    category: 1,
    category_details: {
      active: true,
      created: '2025-01-19T17:03:28.930826Z',
      deleted: false,
      icon: 'http://18.221.93.82:8000/media/restaurant_kJKlsHE.png',
      id: 1,
      modified: '2025-01-19T17:03:28.930849Z',
      name: 'Restaurants',
    },
    created: '2025-01-19T17:05:29.373775Z',
    deleted: false,
    descripton: 'This Is Description',
    end_date: '31-01-2025',
    id: 'd8cdf14f-ebf8-4393-a90c-55fa8e109a86',
    image:
      'http://18.221.93.82:8000/media/flyers/Screenshot_2025-01-18_at_12.17.32AM_DHSA4LI.png',
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    modified: '2025-01-19T17:05:29.373798Z',
    name: 'flyer 1',
    on_click: 'something',
    start_date: '15-01-2025',
    subcategory: 1,
    subcategory_details: {
      active: true,
      category: 1,
      icon: 'http://18.221.93.82:8000/media/basket_LTWuiKF.png',
      id: 1,
      name: 'Chinese',
    },
    vendor: 2,
  };
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10, paddingTop: 0, paddingRight: 0}}>
        <View>
          <Spacer />
          <Text title style={{color: colors.blue}}>
            Flyers
          </Text>
          <Spacer />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <FlyerBox
                flyer={flyer}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.FlyerDetails, {flyer})
                }
              />
            )}
            data={dummyFlyers}
          />
        </View>
        <Line />
        <View>
          <Text title style={{color: colors.blue}}>
            Deals
          </Text>
          <Spacer />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <DealOfferBox
                width={width - 70}
                deal={flyer}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.DealDetails, {deal: flyer})
                }
              />
            )}
            data={dummyFlyers}
          />
        </View>
        <Line />

        <View>
          <Text title style={{color: colors.blue}}>
            Offers
          </Text>
          <Spacer />
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <DealOfferBox
                width={width - 70}
                deal={flyer}
                onPress={() =>
                  navigation.navigate(APP_ROUTES.DealDetails, {deal: flyer})
                }
              />
            )}
            data={dummyFlyers}
          />
        </View>
      </ScrollView>
    </Container>
  );
}

export default FlyerOfferDeals;
