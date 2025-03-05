import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView as NativeKeyboardAvoidingView, KeyboardAvoidingViewProps as NativeKeyboardAvoidingViewProps, Platform } from 'react-native';

export interface KeyboardAvoidingViewProps extends NativeKeyboardAvoidingViewProps {
  androidEnabled?: boolean;
  offset? : number;
}

const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({ children, style,offset=100,androidEnabled = false, ...rest }) => {
  const styles = StyleSheet.create({

  });
  
  if (androidEnabled || Platform.OS == 'ios') {
    return (
      <NativeKeyboardAvoidingView
        keyboardVerticalOffset={offset}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[{flex:1},style]}
        {...rest}
      >
        {children}
      </NativeKeyboardAvoidingView>
    );
  }
  return (
    <View {...rest}
    style={style}
    >
      {children}
    </View>
  );
};

export default KeyboardAvoidingView;