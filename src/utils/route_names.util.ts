import AddPayment from '../vendor/addPayment.screen';
import WithdrawPayment from '../vendor/withdrawPayment.screen';

export const MAIN_ROUTES = {
  SplashScreen: 'SplashScreen',
  App: 'App',
  NoInternet: 'NoInternet',
  Maintenance: 'Maintenance',
  Onboarding: 'Onboarding',
  Vendor: 'Vendor',
};

export const APP_ROUTES = {
  GetPermissions: 'GetPermissions',
  Location: 'Location',
  OtpVerify: 'OtpVerify',
  Register: 'Register',
  HomeNavigation: 'HomeNavigation',
  FAQ: 'FAQ',
  Ticket: 'Ticket',
  Search: 'Search',
  FlyerDetails: 'FlyerDetails',
  DealDetails: 'DealDetails',
  OfferDetails: 'OfferDetails',
  Category: 'Category',
  SubCategory: 'SubCategory',
  Flyer: 'Flyer',
  Offer: 'Offer',
  Deals: 'Deals',
  InsideSub: 'InsideSub',
  Settings: 'Settings',
  Help: 'Help',
  About: 'About',
  Privacy: 'Privacy',
  Terms: 'Terms',
  Feedback: 'Feedback',
};
export const HOME_ROUTES = {
  Scanner: 'Scanner',
  Home: 'Home',
  WishList: 'WishList',
  List: 'List',
  AccountNavigation: 'AccountNavigation',
};
export const ACCOUNT_ROUTES = {
  Login: 'Login',
  Welcome: 'Welcome',
  ForgotPassword: 'ForgotPassword',
  VerificationCode: 'VerificationCode',
  ResetPassword: 'ResetPassword',
  SignUp: 'SignUp',
  Account: 'Account',
  Wallet: 'Wallet',
  Transaction: 'Transaction',
  Redeem: 'Redeem',
};
export const VENDOR_ROUTES = {
  Welcome: 'Welcome',
  SignUp: 'SignUp',
  Login: 'Login',
  CreateBusiness: 'CreateBusiness',
  ForgotPassword: 'ForgotPassword',
  VerificationCode: 'VerificationCode',
  ResetPassword: 'ResetPassword',
  VendorTabNavigation: 'VendorTabNavigation',
  Account: 'Account',
  Payment: 'Payment',
  AddPayment: 'AddPayment',
  WithdrawPayment: 'WithdrawPayment',
};
export const VENDOR_TAB_ROUTES = {
  Dashboard: 'Dashboard',
  DashboardNavigation: 'DashboardNavigation',
  Business: 'Business',
  Wallet: 'Wallet',
  Account: 'Account',
  DealsV: 'DealsV',
};
