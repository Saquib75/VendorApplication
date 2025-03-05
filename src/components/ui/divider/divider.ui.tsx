import { DimensionValue, StyleSheet, Text, View, ViewProps } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

export interface DividerProps extends ViewProps{
  vertical? : boolean;
  height? : DimensionValue | number | undefined;
  
}
const Divider:React.FC<DividerProps> = ({style, vertical= false,height = "100%" ,...rest}) => {
  const {colors} = useTheme();
  return (
    vertical ? 
    <View  style={[{ width: 0.1,height , marginVertical : 5, borderColor: colors.light_gray_border, borderWidth: 0.5 },style]} {...rest} ></View>
    :
    <View  style={[{ height: 0.1, marginVertical : 5,borderColor: colors.light_gray_border, borderWidth: 0.5 },style]} {...rest} ></View>
  );
};

export default Divider;

const styles = StyleSheet.create({});