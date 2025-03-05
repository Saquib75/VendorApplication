import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { useState } from 'react'
import moment from 'moment'
// import colors from '../../constants/color'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../text/text.ui'
import RNModalDatePicker , {DateTimePickerProps as RNModalDatePickerProps} from 'react-native-modal-datetime-picker'
import { useEffect } from 'react'
import { SvgProps } from 'react-native-svg'
import { useTheme } from '@react-navigation/native'
import VectorIcon from '../vector_icon/vector_icon'
import Spacer from '../spacer/spacer.ui'

export interface DateTimePickerProps extends Partial<RNModalDatePickerProps>  {
  label: string,
  onChange: (val: any) => void,
  onBlur?: (val?: any) => void,
  style?: ViewStyle,
  labelStyle?: {},
  value: any,
  placeholder?: string,
  Icon?: React.FC<SvgProps>,
  LeftItem?: React.FC<any> | null,
  leftText?: string,
  error?: false,
  errorText?: string,
  mode : 'datetime' | "date" | "time"
}
const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label = "",
  onChange = (val) => { },
  onBlur = () => { },
  style = {},
  labelStyle = {},
  value,
  placeholder = "Select Date",
  mode = "date",
  Icon = null,
  LeftItem = null,
  leftText = null,
  error = false,
  errorText = "",
  ...rest
}) => {
  const [visible, setVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const { colors } = useTheme()
  const [primaryColor, setPrimaryColor] = useState(colors.primary)
  useEffect(() => {
    setPrimaryColor(error ? colors.danger : colors.primary)
  }, [error]);
  const onChangeValue = (c_val: Date) => {
    const temp = c_val || value;
    try{
      onChange(temp.toISOString());
      setVisible(false);
      setTimeout(() => { onBlur() }, 1000)
    }catch(err){
      console.log("DatePicker Error" , err);
      
    }
  };
  const momentModeFormat = (md: 'datetime' | "date" | "time") => {
    switch (md) {
      case "datetime": return "lll";
      case "date": return "ll";
      case "time": return "LT";
      default: return ""
    }
  }
  const styles = StyleSheet.create({
    datePicker: {
      backgroundColor: colors.transparent,
      borderRadius: 5,
      flexDirection: 'row',
      alignItems: 'center',
      flex : 1
    },
    container: {
      marginTop: 10,
      overflow : 'hidden'
    },
    inputLabel: {
      marginBottom : 10, 
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius : 10,
      borderColor: colors.light_gray_border,
      borderWidth: 1,
      padding :7,
    },
    input_icon : {
      padding: 3, 
      borderRightColor: colors.light_gray, 
      borderRightWidth: 1,
      marginRight : 5,

    }
  })
  return (
    <>
      <View style={styles.container} >
        <TouchableOpacity onPress={() => { setVisible(true) }} style={[style]} >
          {label != '' && 
            <>
              <Text style={[styles.inputLabel, { marginLeft: 2, color: (error ? primaryColor : (isFocused ? primaryColor : colors.text)) }, labelStyle]} >{label}</Text>
            </>
          }
          <View style={styles.inputContainer} >
            <View style={styles.input_icon}>
              <VectorIcon type='MaterialCommunityIcons' name='calendar' size={20} color={colors.gray} />
            </View>
            <View style={styles.datePicker}  >
              <Text title={false} style={{ flex: 1, fontSize: 15, color: colors.text }} > {(value) ? moment(value).format(momentModeFormat(mode)) : placeholder}</Text>
              <VectorIcon type='Ionicons' name='chevron-down-circle' color={colors.light_gray_border} />
            </View>
          </View>
        </TouchableOpacity>
        {(error && errorText != "") && <Text title={false} style={{ color: colors.danger }} >{errorText}</Text>}
      </View>

      <RNModalDatePicker
        isVisible={visible}
        mode={mode}
        date={new Date(value) ?? new Date("2000-1-1")}
        onConfirm={onChangeValue}
        onCancel={() => { onBlur(); setVisible(false) }}
        {...rest}
      />
    </>
  )
}

export default DateTimePicker

