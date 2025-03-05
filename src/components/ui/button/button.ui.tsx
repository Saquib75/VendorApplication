import { ActivityIndicator, Platform, StyleSheet, TextProps, TextStyle, TouchableNativeFeedback, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React from 'react'
import Text from '../text/text.ui'
import { useTheme } from '@react-navigation/native'
import VectorIcon, { VectorIconProps } from '../vector_icon/vector_icon';
import { shadow } from '../../../utils/library.util';

export interface ButtonProps extends TouchableOpacityProps {
    text : string;
    backgroundColor? : string;
    textStyle? : TextStyle;
    style? : ViewStyle;
    loaderColor? : string;
    primary? : boolean ;
    secondary? : boolean ;
    loading? : boolean;
    loadingText? : string;
    icon? : VectorIconProps,
    iconRight? : VectorIconProps,
}
const Button: React.FC<ButtonProps> = ({text ,iconRight = null,icon =null, secondary,loading = false,loadingText = "Processing...",loaderColor = "white",primary,style,backgroundColor ,textStyle,...rest}) => {
  const theme = useTheme();
  const {colors} = theme;
  const shadowX = secondary ? {} : shadow()
  const styles = StyleSheet.create({
    btn_container : {
      paddingHorizontal : 30,
      paddingVertical : 15,
      borderRadius : 50,
      backgroundColor : secondary ? colors.secondary : (primary ? colors.primary : (backgroundColor ?? colors.card)),
      marginVertical : 5,
      ...shadowX
    },
    text : {
      color :primary || secondary ? colors.white :  colors.text ,
      textAlign : 'center',
      fontWeight : "700"
    }
  })
  const ButtonCmp = ()=>{
    return(
      <View style={{flexDirection : "row" , justifyContent : 'center' , alignItems  :'center'}} >
        {(!loading && icon) && <VectorIcon style={{marginRight : -5 , right : 5 , padding : 0}} {...{color : primary? colors.white : colors.text,...icon}} />}
        {loading && <ActivityIndicator color={loaderColor} size={20} />}
        <Text style={[styles.text,textStyle]}> {loading ? loadingText : text}</Text>
        {(iconRight !== null) && <VectorIcon style={{ left : 10 , padding : 0}} {...{color : primary? colors.white : colors.text,...iconRight}} />}
      </View>
    )
  }
  if(Platform.OS === 'ios'){
    return (
      <TouchableOpacity style={[styles.btn_container,style]}  {...rest}>
        <ButtonCmp />   
      </TouchableOpacity>
    )
  }
  return (
  <TouchableNativeFeedback  {...rest} >
    <View style={[styles.btn_container,style]}   >
      <ButtonCmp />
    </View>
  </TouchableNativeFeedback>
  )
}

export default Button
