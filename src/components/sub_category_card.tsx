import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {APP_ROUTES} from '../utils/route_names.util';

function SubCategoryCard({
  title,
  navigation,
}: {
  title: String;
  navigation: any;
}) {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    categoryCard: {
      borderRadius: 10,
      padding: 9,
      width: 80,
      justifyContent: 'center',
      flexDirection: 'row',
      marginVertical: 10,
      // backgroundColor: colors.light_gray,
    },
  });
  return (
    <TouchableOpacity
      style={{alignItems: 'center', marginVertical: 8}}
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate(APP_ROUTES.InsideSub, {title});
      }}>
      <View style={styles.categoryCard}>
        <Image source={require('../assets/images/category.png')} />
      </View>
      <Text style={{color: colors.text, fontSize: 16}}>{title}</Text>
    </TouchableOpacity>
  );
}

export default SubCategoryCard;
