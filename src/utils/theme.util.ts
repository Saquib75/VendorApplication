import {DefaultTheme, DarkTheme} from '@react-navigation/native';

//Common Theme
export const CommonTheme = {
  colors: {
    primary: '#EE5C74',
    primary_light: '#CDD9EA',
    primary_dark: '#4C97D3',
    secondary: '#051126',
    gray: '#969AA4',
    light_gray: '#E8E8E8',
    light_gray_half_transparent: '#5A5A5A74',
    danger: '#F44336',
    black: '#424242',
    white: '#ffffff',
    success: '#4CAF51',
    warning: '#FBC02D',
    blue: '#0F6EF1',
    dark_background: '#232E3D',
    dark_black: '#000000',
    muted: '#C7C7D3',
    transparent: 'transparent',
    background: '#FAFAFA',
    link: '#D47050',
    card: '#2F2F2F',
    vendorPrimary: '#df6d54',
  },
};
//Light Mode
export const AppLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...CommonTheme.colors,
    text: CommonTheme.colors.black,
    light_gray_border: '#e7e7f0',
  },
};

//Dark Mode
export const AppDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...CommonTheme.colors,
    background: '#0E0E0E',
    text: CommonTheme.colors.white,
    light_gray_border: '#5A5A5A74',
  },
};
export type AppTheme = typeof AppLightTheme;
