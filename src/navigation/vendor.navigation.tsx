import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ShowNotConnected from '../components/show_not_connected.overlay';
import {VENDOR_ROUTES} from '../utils/route_names.util';
import VendorWelcome from '../vendor/welcome.screen';
import VendorLogin from '../vendor/login.screen';
import VendorSignUp from '../vendor/signup.screen';
import CreateBusiness from '../vendor/createBusiness.screen';
import VendorForgotPassword from '../vendor/forgotPassword.screen';
import VendorResetPassword from '../vendor/resetPassword.screen';
import VendorVerificationCode from '../vendor/verificationCode.screen';
import VendorBottomNavigation from './vendorBottom.navigation';
import Payment from '../vendor/payment.screen';
import AddPayment from '../vendor/addPayment.screen';
import WithdrawPayment from '../vendor/withdrawPayment.screen';
import {useAuthContext} from '../api/authContext';

const VendorNavigator = createNativeStackNavigator();

const Vendor: React.FC<any> = ({route, navigation}) => {
  const {user} = useAuthContext();

  const loggedIn = user?.full_name;
  return (
    <>
      <ShowNotConnected />
      <VendorNavigator.Navigator
        screenOptions={{
          animation: 'slide_from_right',
          headerShown: false,
        }}>
        {loggedIn ? (
          <>
            <VendorNavigator.Screen
              options={{title: 'vendor', headerShown: false}}
              name={VENDOR_ROUTES.VendorTabNavigation}
              component={VendorBottomNavigation}
            />
            <VendorNavigator.Screen
              options={{title: 'vendor', headerShown: false}}
              name={VENDOR_ROUTES.CreateBusiness}
              component={CreateBusiness}
            />
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.Payment}
              component={Payment}
            />

            <VendorNavigator.Screen
              name={VENDOR_ROUTES.WithdrawPayment}
              component={WithdrawPayment}
            />

            <VendorNavigator.Screen
              name={VENDOR_ROUTES.AddPayment}
              component={AddPayment}
            />
          </>
        ) : (
          <>
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.Welcome}
              component={VendorWelcome}
            />
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.Login}
              component={VendorLogin}
            />
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.SignUp}
              component={VendorSignUp}
            />
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.ForgotPassword}
              component={VendorForgotPassword}
            />
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.VerificationCode}
              component={VendorVerificationCode}
            />
            <VendorNavigator.Screen
              name={VENDOR_ROUTES.ResetPassword}
              component={VendorResetPassword}
            />
          </>
        )}
      </VendorNavigator.Navigator>
    </>
  );
};

export default Vendor;
