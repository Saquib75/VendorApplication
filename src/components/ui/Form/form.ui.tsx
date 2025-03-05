import React from 'react';
import {  ScrollView, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import KeyboardAvoidingView, { KeyboardAvoidingViewProps } from '../keyboardavoidingview/keyboardavoidingview.ui';
export interface FormProps extends KeyboardAvoidingViewProps{

}
const Form:React.FC<FormProps> = ({children,...rest}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({

  });
  return (
    <KeyboardAvoidingView  {...rest} >
      <ScrollView  showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Form;