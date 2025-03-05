import React, { FC, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, TextInput as NativeTextInput, StyleProp, TextStyle, Keyboard } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface OtpInputProps{
  onCompleteCode : (code:string)=>void;
  length   : number,
  focusOnLoad? : boolean,
  inputStyle? : StyleProp<TextStyle>,

}

const OtpInput: FC<OtpInputProps> = ({
  onCompleteCode = (code:string)=>{},
  length   = 4,
  focusOnLoad = true,
  inputStyle
}) => {
  const { colors } = useTheme();
  const [otp, setOtp] = useState(Array(length).join(".").split(".")); // Initialize with n empty strings
  const inputRefs = useRef<NativeTextInput[]>([]);
  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace') {
      console.log("ddfdd");
      // Move to the previous input on backspace
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        let newOtp = [...otp];
        newOtp[index] = ""
        setOtp(newOtp)
      }
    }
  }
  const handleOtpChange = (index: number, value: string) => {
    // Move to the next input if not the last box
    if (index < otp.length - 1 && value !== '') {
      inputRefs.current[index + 1].focus();
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    // Check if all boxes are filled and call a function
    if (newOtp.every((digit) => digit !== '')) {
      onCompleteCode(newOtp.join(""));
      Keyboard.dismiss()
    }
  };
  useEffect(()=>{
    if(focusOnLoad){
      inputRefs.current[0].focus();
    }
  },[])
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    input: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor  : colors.secondary,
      borderRadius : 10,
      textAlign: 'center',
      fontSize: 20,
      color : colors.text,
    },
  });
  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <NativeTextInput
          key={index}
          style={[styles.input,inputStyle]}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          selectTextOnFocus
          onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          onChangeText={(value) => handleOtpChange(index, value)}
          //@ts-ignore
          ref={(ref) => (inputRefs.current[index] = ref)}
          
        />
      ))}
    </View>
  );
};

export default OtpInput;