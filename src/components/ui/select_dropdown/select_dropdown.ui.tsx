import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '@react-navigation/native';

function Dropdown({
  propsData,
  setValue,
  title,
  value,
}: {
  propsData: any;
  title: string;
  setValue: (e: string) => void;
  value?: string;
}) {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: Dimensions.get('window').width - 50,
      height: 56,
      // backgroundColor: colors.text,
      backgroundColor: '#FFFFFF00',
      borderColor: '#F9F9F9',
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginVertical: 16,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#000',
      borderRadius: 8,
      marginTop: -30,
      borderColor: '#F9F9F9',
      borderWidth: 1,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#ffffff90',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });

  return (
    <SelectDropdown
      data={propsData}
      onSelect={(selectedItem, index) => {
        setValue(selectedItem.title);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            <Text
              style={{
                ...styles.dropdownButtonTxtStyle,
                color: selectedItem?.title || value ? colors.text : '#ffffff90',
              }}>
              {(selectedItem && selectedItem.title) ||
                (value && value) ||
                title}
            </Text>
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && {backgroundColor: '#fff'}),
            }}>
            <Text
              style={{
                ...styles.dropdownItemTxtStyle,
                color: isSelected ? '#000' : '#ffffff90',
              }}>
              {item.title}
            </Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
}

export default Dropdown;
