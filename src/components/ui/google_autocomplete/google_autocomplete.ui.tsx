import React, { useRef } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import VectorIcon from '../vector_icon/vector_icon';
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete';
// import { "AIzaSyDsc0jaxFvFYsc1b3Tblah0n1LV3RfZZDQ" } from '@env';

export interface GoogleAutoCompleteProps  {
  style? : StyleProp<ViewStyle>
}

const GoogleAutoComplete:React.FC<any> = ({onPress,style,query,placeholder,textInputProps,styles,...rest}) => {
  const {colors} = useTheme();
  const gRef = useRef<GooglePlacesAutocompleteRef | null>(null);
  const stylesheet = StyleSheet.create({
    search_container: {
      backgroundColor: colors.card,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 0,
      borderRadius: 50,
    },
  });

  return (
    <View style={[stylesheet.search_container,style]}>
          <VectorIcon size={15} type='AntDesign' name='search1' />
          <GooglePlacesAutocomplete
            ref={gRef}
            placeholder={placeholder ?? 'Type your address'}
            onPress={onPress}
            fetchDetails
            query={{
              key: "AIzaSyDsc0jaxFvFYsc1b3Tblah0n1LV3RfZZDQ",
              language: 'en',
            }}
            textInputProps={{
              style: {
                backgroundColor: colors.transparent,
                padding: 10,
                flex: 1,
                color: colors.text,
              },
              placeholderTextColor: colors.gray,
              ...textInputProps
            }}
            styles={{
              listView: {
                width : "120%",
                top: 50,
                left: "-10%",
                right: 0,
                borderRadius: 10,
                position: 'absolute',
              },
              row: {
                backgroundColor: colors.card
              },
              description: {
                color: colors.text
              },
              poweredContainer: {
                backgroundColor: colors.card,
              },
              ...styles
            }}
            {...rest}
          />
          <VectorIcon onPress={()=>gRef.current?.clear()} name='times-circle' type='FontAwesome' color={colors.light_gray_border} size={25}  />
        </View>
  );
};

export default GoogleAutoComplete;