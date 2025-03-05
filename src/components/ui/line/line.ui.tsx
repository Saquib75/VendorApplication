import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';

const Line = () => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        height: 1.5,
        width: '100%',
        backgroundColor: colors.border,
        // marginVertical: 20,
        marginTop: 30,
        marginBottom: 20,
      }}></View>
  );
};

export default Line;
