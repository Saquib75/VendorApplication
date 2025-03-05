import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MAIN_ROUTES, VENDOR_TAB_ROUTES} from '../utils/route_names.util';
import Vendor from './vendor.navigation';
import DashBoard from '../vendor/dashBoard.screen';
import DealsVscreen from '../vendor/deals.screens';
const VendorDashboard = createNativeStackNavigator();
const VendorDashboardNavigation = () => {
  return (
    <VendorDashboard.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <VendorDashboard.Screen
        name={VENDOR_TAB_ROUTES.DashboardNavigation}
        component={DashBoard}
      />
      <VendorDashboard.Screen
        name={VENDOR_TAB_ROUTES.DealsV}
        component={DealsVscreen}
      />
    </VendorDashboard.Navigator>
  );
};

export default VendorDashboardNavigation;
