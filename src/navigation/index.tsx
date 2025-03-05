import {StyleSheet, View, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppDarkTheme, AppLightTheme} from '../utils/theme.util';

import {THEME_MODE} from '../utils/constants.util';

import Main from './main.navigation';
const Navigation = () => {
  const [mode, setMode] = useState(THEME_MODE.DARK);

  return (
    <NavigationContainer theme={mode === 'dark' ? AppDarkTheme : AppLightTheme}>
      <Main />
    </NavigationContainer>
  );
};

export default Navigation;
