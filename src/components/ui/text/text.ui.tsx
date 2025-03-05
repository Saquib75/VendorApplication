import { StyleSheet, Text as NativeText, TextProps as NativeTextProps, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Linking } from 'react-native';
export interface TextProps extends NativeTextProps {
  children: React.ReactNode;
  title?: boolean,
  light?: boolean,
  dark?: boolean,
  small?: boolean,
  linkable?: boolean,
  link?: string,
  onLinkPress? : ()=>void
}

const Text: React.FC<TextProps> = ({ small,onLinkPress , linkable,link, light, dark, children, title = false, style, ...rest }) => {
  const { colors } = useTheme()
  const TextComponent = () => (
    <NativeText
      style={[{
        color: linkable ? colors.link : (light ? colors.black : (dark ? colors.white : colors.text)),
        fontWeight: title ? "bold" : 'normal',
        fontSize: small ? 12 : (title ? 18 : 16),
        fontFamily: "Open Sans",
        top: linkable ? 3.5 : 0,
      }, style]}
      {...rest}
    >{children}</NativeText>
  )
  if (linkable) {
    return (
      <TouchableOpacity onPress={() => {
        if(onLinkPress !== undefined)onLinkPress();
        else if (link !== undefined) Linking.openURL(link)
      }} >
        <TextComponent />
      </TouchableOpacity>
    )
  }
  return (
    <TextComponent />
  )
}

export default Text

const styles = StyleSheet.create({})