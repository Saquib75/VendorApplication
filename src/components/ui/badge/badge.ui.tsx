import {DimensionValue, StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import {TextProps} from 'react-native';

export interface BadgeProps extends ViewProps {
  color?: string;
  textProps?: TextProps;
  text: string;
}
const Badge: React.FC<BadgeProps> = ({
  style,
  text,
  textProps,
  color = '#ffffff',
  ...rest
}) => {
  const {colors} = useTheme();
  return (
    <View
      style={[
        {
          justifyContent: 'center',
          flexDirection: 'row',
          backgroundColor: color + '34',
          borderRadius: 5,
          padding: 5,
          // paddingHorizontal: 0,
        },
        style,
      ]}
      {...rest}>
      <Text
        numberOfLines={1}
        style={[{fontSize: 10, color: color}, textProps?.style]}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({});
