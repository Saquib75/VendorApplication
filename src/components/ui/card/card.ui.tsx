import { Pressable, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { shadow } from '../../../utils/library.util'
export interface CardProps extends TouchableOpacityProps {
  onPress?: any,
  usePressable? : boolean,
}

const Card: React.FC<CardProps> = ({ 
  style, 
  onPress = null, 
  disabled = false, 
  children,
  usePressable = false,
  ...rest 
}) => {
  const { colors } = useTheme()
  const styles = StyleSheet.create({
    container : {
      backgroundColor : colors.card,
      padding : 18,
      marginTop : 10,
      ...shadow(),
      borderRadius : 10,
      marginHorizontal : 20
    }
  })
  if(usePressable){
    return <Pressable disabled={disabled || onPress === null} onPress={onPress} style={[styles.container, style]}{...rest}  >
      {children}
    </Pressable>
  }
  return (
    <TouchableOpacity disabled={disabled || onPress === null} onPress={onPress} style={[styles.container, style]}{...rest}  >
      {children}
    </TouchableOpacity>
  )
}

export default Card
