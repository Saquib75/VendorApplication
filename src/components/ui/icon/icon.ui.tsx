import { StyleSheet,  TouchableOpacity,TouchableOpacityProps, Image, ImageStyle } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { SvgProps } from 'react-native-svg'
import VectorIcon, { VectorIconProps } from '../vector_icon/vector_icon'

export interface IconProps extends TouchableOpacityProps {
  backgroundColor?: string,
  iconStyle?:ImageStyle,
  image? : any,
  onPress? : any,
  SVG? : React.FC<SvgProps>,
  size? : number,
  padding? :number,
  vectorIcon? : VectorIconProps
}
const Icon: React.FC<IconProps> = ({backgroundColor ,vectorIcon = null,size = 80,padding = 40,SVG = null ,image = null,style={},disabled,onPress= null,iconStyle = {},...rest}) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    logo: {
      width: size,
      height: size,
      borderRadius: size ,
      backgroundColor: backgroundColor ?? colors.light_gray,
      padding: vectorIcon ?  0 : padding,
      justifyContent : "center",
      alignItems : "center"
    }
  })
  return (
    <TouchableOpacity disabled={disabled || onPress === null} onPress={onPress} style={[styles.logo,style]} {...rest} >
      {
        image !== null && <Image source={image} style={[{ height: "100%", width: "100%" },iconStyle]} resizeMode='contain' />
      }
      {
        SVG !== null && <SVG height={size - padding} width={size - padding} style={[iconStyle]} />
      }
      {
        vectorIcon !== null && <VectorIcon {...vectorIcon}/>
      }
      
    </TouchableOpacity>
  )
}

export default Icon

