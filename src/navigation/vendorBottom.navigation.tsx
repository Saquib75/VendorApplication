import {View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {VENDOR_ROUTES, VENDOR_TAB_ROUTES} from '../utils/route_names.util';

import VectorIcon from '../components/ui/vector_icon/vector_icon';
import Text from '../components/ui/text/text.ui';
import {useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VendorTabBar from './vendor.tabbar';
import BusinessScreeen from '../vendor/business.screen';
import Avatar from '../components/ui/avatar/avatar.ui';
import Imports from '../assets/imports.assets';
import VendorDashboardNavigation from './vendorDashboard.navigation';
import {useAuthContext} from '../api/authContext';
import store from '../store';
import {MMKV} from 'react-native-mmkv';

const VendorBottomNavigator = createBottomTabNavigator();
const VendorBottomNavigation = () => {
  const {colors} = useTheme();
  const insets = useSafeAreaInsets();
  const {user} = useAuthContext();
  const storage = new MMKV();
  const {setUser} = useAuthContext();

  const Header = ({navigation}: any) => {
    return (
      <View
        style={{
          paddingTop: insets.top + 5,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          title
          style={{
            fontSize: 25,
            marginVertical: 7,
            marginHorizontal: 10,
          }}>
          Hi, {user?.full_name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Avatar
            onPress={() => {
              storage.clearAll();
              setUser(null);
            }}
            backgroundColor={colors.transparent}
            size={40}
            style={{marginLeft: -10}}
            source={Imports.images.logout}
          />
          <Avatar
            onPress={() => navigation.navigate(VENDOR_ROUTES.Account)}
            backgroundColor={colors.transparent}
            size={40}
            source={Imports.images.avatarImage}
          />
        </View>
      </View>
    );
  };
  const DumCom = () => {
    return <View></View>;
  };
  return (
    <VendorBottomNavigator.Navigator
      tabBar={props => <VendorTabBar {...props} />}
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <VendorBottomNavigator.Screen
        options={{
          tabBarIcon: props => (
            <VectorIcon name="storefront" type="Ionicons" {...props} />
          ),
        }}
        name={VENDOR_TAB_ROUTES.Business}
        component={BusinessScreeen}
      />
      <VendorBottomNavigator.Screen
        options={{
          tabBarIcon: props => (
            <VectorIcon type="FontAwesome6" name="chart-line" {...props} />
          ),
        }}
        name={VENDOR_TAB_ROUTES.Dashboard}
        component={VendorDashboardNavigation}
      />
      <VendorBottomNavigator.Screen
        options={{
          tabBarIcon: props => (
            <VectorIcon type="AntDesign" name="heart" {...props} />
          ),
        }}
        name={'aaa'}
        component={DumCom}
      />
      <VendorBottomNavigator.Screen
        options={{
          tabBarIcon: props => (
            <VectorIcon type="FontAwesome5" name="list-ul" {...props} />
          ),
        }}
        name={'a'}
        component={DumCom}
      />
      <VendorBottomNavigator.Screen
        options={{
          headerShown: false,
          title: 'Account',
          tabBarIcon: props => (
            <VectorIcon type="FontAwesome5" name="user-alt" {...props} />
          ),
        }}
        name={'aa'}
        component={DumCom}
      />
    </VendorBottomNavigator.Navigator>
  );
};

export default VendorBottomNavigation;
