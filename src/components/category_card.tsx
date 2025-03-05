import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {APP_ROUTES} from '../utils/route_names.util';

function CategoryCard({
  category,
  navigation,
  seeAll,
  data,
}: {
  category: any;
  navigation: any;
  seeAll?: boolean;
  data?: any;
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
  const title = category.name;
  // console.log(category.icon);
  return (
    <TouchableOpacity
      style={{alignItems: 'center', marginVertical: 8}}
      activeOpacity={0.8}
      onPress={() => {
        if (seeAll) navigation.navigate(APP_ROUTES.Category, {data});
        else navigation.navigate(APP_ROUTES.SubCategory, {title});
      }}>
      <View style={styles.categoryCard}>
        {category.icon === 'seeAll' ? (
          <Image
            source={require('../assets/images/seeAll.png')}
            style={{width: 40, height: 40, marginBottom: 10}}
          />
        ) : (
          <Image src={category.icon} style={{width: 50, height: 50}} />
        )}
      </View>
      <Text style={{color: colors.text, fontSize: 16}}>{category.name}</Text>
    </TouchableOpacity>
  );
}

export default CategoryCard;
