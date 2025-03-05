import React from 'react';
import { PressableProps, StyleSheet, View, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import VectorIcon from '../vector_icon/vector_icon';
import Text from '../text/text.ui';
export interface CheckboxProps extends PressableProps {
  checked: boolean;
  children?: React.ReactNode,
  status?: 'checked' | 'unchecked',
  color?: string;
  checkColor?: string;
  error? : boolean;
  errorText? : string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, errorText,error,checkColor, color, status, children, ...rest }) => {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    checkbox_container: {
      flexDirection: 'row',
      alignItems: 'center',
      
    },
    text_style: {
      flex: 1,
      marginLeft: 10,
    },
    check_style: {
      borderColor: checked ? color ?? colors.primary : (error ?  colors.danger: colors.gray),
      borderWidth: 1,
      padding: 0,
      borderRadius: 3,
      backgroundColor: checked ? color ?? colors.primary : colors.transparent,
      height : 20,
      width : 20,
      justifyContent : 'center',
      alignItems : 'center'
    }
  });
  return (
    <>
      <View style={styles.checkbox_container} >
        <Pressable style={styles.check_style} {...rest}>
          <VectorIcon type='Feather' name="check" color={checked ? checkColor ?? colors.white : colors.transparent} size={15} style={{ padding: 0 }} />
        </Pressable>
        <View style={styles.text_style} >{children}</View>
      </View>
      {
        errorText && error ?
          <Text title small style={{ color: colors.danger }} >{errorText}</Text> : null
      }
    </>
  );
};

export default Checkbox;