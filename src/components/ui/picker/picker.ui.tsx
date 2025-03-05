import React, { useEffect, useRef, useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Text from '../text/text.ui';
import VectorIcon from '../vector_icon/vector_icon';
import Modal from '../modal/modal.ui';
import Spacer from '../spacer/spacer.ui';
import Button from '../button/button.ui';
import { ScrollView } from 'react-native-gesture-handler';
import TextInput, { TextInputProps } from '../text_input/text_input.ui';
type valueType = any
type dataType = {
  title: string,
  value: valueType | valueType[],
  valueObject?: any,
}
export interface PickerProps extends ViewProps {
  data: dataType[],
  placeholder: string,
  placeholderStyle?: TextStyle,
  textStyle?: TextStyle,
  onChangeValue : (value : valueType,valueObject? : dataType)=>void,
  value : valueType;
  label? : string;
  error? : boolean | string | undefined;
  errorText? : string;
  disabled? : boolean;
  onBlur? :()=>void ;
  multiple? : boolean;
  required? : boolean;
  containerStyle? : ViewStyle,
  searchable? : boolean
}

const Picker: React.FC<PickerProps> = ({ 
  data, 
  style, 
  placeholder, 
  textStyle, 
  required = false,
  placeholderStyle, 
  onChangeValue ,
  onBlur = ()=>{},
  value,
  label,
  error,
  disabled = false,
  multiple = false,
  errorText,
  containerStyle,
  searchable = false,
  ...rest 
}) => {
  const { colors } = useTheme();
  const [selectedValue, setSelectedValue] = useState<undefined | valueType>(
    multiple ? 
    value.length > 0  ? value : undefined
    :
    value??[undefined]
  );
  const [selectedTitle, setSelectedTitle] = useState<undefined | string | string[]>(undefined);
  const [dropModal , setDropModal] = useState(false)
  const [searchText,setSearchText] = useState("");
  const [visibleData , setVisibleData] = useState<any>([])
  const styles = StyleSheet.create({
    container: {
      paddingLeft: 15,
      flexDirection: 'row',
      backgroundColor: colors.card,
      borderRadius: 10,
      paddingVertical  :10,
      alignItems : 'center',
      borderColor : error ? colors.danger:colors.light_gray_border ,
      borderWidth : 1,
    },
    text_style: {
      color: colors.text,
      flex : 1,
      fontSize : 15
    },
    placeholder_style: {
      color: colors.gray,
      flex : 1,
      fontSize : 15
    },
    btn : {
      backgroundColor : colors.transparent,
      elevation : 0,
      shadowColor : colors.transparent,
      flex : 1
    }
  });
  const onSelectValue =(item:dataType)=>{
    if(multiple){
      let val:any = selectedValue ? selectedValue :  [];
      let t_val:any = selectedTitle ? selectedValue :  [];
      let index:any = (val as string[]).indexOf(item.value)
      console.log("index",t_val);

      if(index === -1){
        setSelectedValue([...val,item.value]);
        setSelectedTitle([...t_val,item.value]);
        onChangeValue([...val,item.value])
      }else{
        t_val = t_val.filter((_:any,i:number) => i !== index)
        val = val.filter((_:any,i:number) => i !== index)
        setSelectedValue([...val]);
        setSelectedTitle([...t_val]);
        onChangeValue([...val])
      }
    }else{
      setSelectedValue(item.value);
      setSelectedTitle(item.title);
      onChangeValue(item.value,item)
      closePicker()
    }
  }
  const clearData = ()=>{
    setSelectedValue([]);
    setSelectedTitle([]);
    onChangeValue([])
  }
  useEffect(()=>{
    let tempTitle = ""
    if(value !== null){
      for(var i of data){
        if (i.value === value) {
          tempTitle = i.title;
        }
      }
      setSelectedTitle(tempTitle);
    }
  },[])
  const closePicker = ()=>{
    setDropModal(false); 
    // onBlur()
  }
  const isSelected = (val:valueType)=>{
    if(multiple && selectedValue){
      return (selectedValue as any[]).includes(val)
    }
    return selectedValue === val
  }
  const onChangeSearchText = (s_text:string)=>{
    setSearchText(s_text)
    const temp = data?.filter((item)=>item.value.indexOf(s_text) !== -1)
    setVisibleData(temp ?? []);
  }
  useEffect(()=>{
    if(dropModal){
      console.log("picker value",selectedValue);
      
    }
  },[dropModal])
  useEffect(()=>{
    if(data) setVisibleData(data)
  },[data])
  return (
    <View style={[{marginTop :10},containerStyle]}>
      {
        label ? <Text style={{marginBottom : 10}} >
          {label}
          {required && <Text style={{ color: colors.danger }} > *</Text>}
        </Text>: null
      }
      <TouchableOpacity disabled={disabled} onPress={()=>setDropModal(true)} style={[styles.container, style]} {...rest} >
        {
          selectedValue ?
            (
              multiple ? 
              selectedValue?.length !== 0 ?(
                <View style={{flexDirection : 'row'  ,alignItems : 'center' , flex : 1}} >
                  {
                    (selectedValue as any[])?.map((item,index)=>(
                      <View key={index} style={{backgroundColor : colors.light_gray_border,marginHorizontal : 2 , padding :7, paddingHorizontal :12 , borderRadius  :20 , justifyContent : 'center'}} >
                        <Text style={[styles.text_style,{fontSize : 12}, textStyle]}>{item}</Text>
                      </View> 
                    ))
                  }
                </View>
              ) : <Text style={[styles.placeholder_style, placeholderStyle]} >{placeholder}</Text>
              :
              <Text style={[styles.text_style, textStyle]} >{selectedTitle}</Text>
            )
            :
            <Text style={[styles.placeholder_style, placeholderStyle]} >{placeholder}</Text>
        }
        <VectorIcon type='Ionicons' name='chevron-down-circle' color={colors.light_gray_border} />
      </TouchableOpacity>
      {
      errorText && error ?
        <Text title small style={{ color: colors.danger }} >{errorText}</Text> : null
    }
      <Modal scrollable onClose={closePicker} modalVisible={dropModal} 
      modalStyle={searchable ? {
        // bottom : 'auto',
        top  :100,
      } : {}}
      setModalVisible={setDropModal} style={{
        backgroundColor: colors.card,
        paddingHorizontal: 20,
        paddingVertical  :40,
        paddingBottom : 10,
      }} >
        {
          searchable && 
          <TextInput
            required
            value={searchText}
            onChangeText={onChangeSearchText}
            placeholder={'Search ...'}
            selectTextOnFocus
          />
        }
      <ScrollView keyboardShouldPersistTaps={"handled"}  >
          {
            visibleData?.map((item:any, index:number) => (
              <TouchableOpacity onPress={()=>onSelectValue(item)} key={index} style={{
                padding: 10,
                borderBottomColor: colors.light_gray_border,
                // borderBottomWidth: index === data.length - 1 ? 0 : 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor  : isSelected(item.value) ? colors.secondary  : colors.transparent,
                borderRadius : 2,
                marginVertical : 1,
              }} >
                {
                  isSelected(item.value) ? 
                  <VectorIcon name='checkmark-circle' type='Ionicons'  color={colors.success} style={{padding  :0 , paddingRight  :10}} size={15} />
                  :
                  <VectorIcon name='dot-circle-o' type='FontAwesome'  color={colors.primary} style={{padding  :0 , paddingRight  :10}} size={15} />
                }
                <Text style={{color : isSelected(item.value) ? colors.white  : colors.text}} >{item.title}</Text>
              </TouchableOpacity>
            ))
          }
      </ScrollView>
        {
          data?.length == 0 && 
          <Text style={{textAlign  : 'center'}}>No Data Found</Text>
        }
        {
          multiple ?
          <View style={{flexDirection : 'row',}} >
            <Button onPress={clearData} text='Clear' style={styles.btn} />
            <Button onPress={closePicker} text="Submit" style={styles.btn}  textStyle={{color : colors.secondary }} />
          </View>
          :
          <Spacer size={10} />
        }
      </Modal>
    </View>
  );
};

export default Picker;