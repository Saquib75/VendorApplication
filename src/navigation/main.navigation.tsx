import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_ROUTES} from '../utils/route_names.util';

import Splash from '../vendor/splash.screen';
import NoInternet from '../vendor/no_internet.screen';

import Vendor from './vendor.navigation';
const MainNavigator = createNativeStackNavigator();
const Main = () => {
  return (
    <MainNavigator.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <MainNavigator.Screen
        name={MAIN_ROUTES.SplashScreen}
        component={Splash}
      />
      <MainNavigator.Screen name={MAIN_ROUTES.Vendor} component={Vendor} />
    </MainNavigator.Navigator>
  );
};

export default Main;
