import React ,{ FC } from 'react';
import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from '../text/text.ui';
import { TextStyle } from 'react-native';
import Spacer from '../spacer/spacer.ui';

export interface LoaderProps {
  text? : string;
  color? :string ;
  animating? : boolean;
  containerStyle? : ViewStyle,
  textStyle? : TextStyle,
  
}

const Loader:FC<LoaderProps> = ({
  text = "",
  color ,
  animating = true,
  containerStyle,
  textStyle
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container : {
      paddingVertical : 50,
      flex : 1,
      alignItems :"center",
      justifyContent : 'center',
      
    }
  });
  return (
    <View style={[styles.container,containerStyle]} >
      <ActivityIndicator size={"large"} color={color ?? colors.secondary}  />
      <Spacer />
      <Text style={[{textAlign : 'center' , color : colors.gray},textStyle]} >{text}</Text>
    </View>
  );
};

export default Loader;