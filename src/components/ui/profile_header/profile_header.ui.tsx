import React from 'react';
import {StyleSheet, View} from 'react-native';
import VectorIcon from '../vector_icon/vector_icon';
import {useTheme} from '@react-navigation/native';
import Avatar from '../avatar/avatar.ui';
import Imports from '../../../assets/imports.assets';
import {ACCOUNT_ROUTES} from '../../../utils/route_names.util';

function ProfileHeader({navigation}: {navigation: any}) {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    header: {
      padding: 10,
      marginTop: 45,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    leftIcons: {
      flexDirection: 'row',
    },
    iconContainer: {
      backgroundColor: colors.light_gray_half_transparent,
      padding: 5,
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
  });
  return (
    <View style={styles.header}>
      <VectorIcon
        // style={{paddingLeft: 10}}
        type="Ionicons"
        name="chevron-back"
        color={colors.text}
        size={30}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.leftIcons}>
        <View style={styles.iconContainer}>
          <VectorIcon
            // style={{paddingLeft: 10}}
            type="AntDesign"
            name="search1"
            color={colors.text}
            size={20}
            // onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.iconContainer}>
          <VectorIcon
            // style={{paddingLeft: 10}}
            type="Entypo"
            name="bell"
            color={colors.text}
            size={20}
            // onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{marginHorizontal: 5}}>
          <Avatar
            onPress={() => navigation.navigate(ACCOUNT_ROUTES.Account)}
            backgroundColor={colors.transparent}
            size={40}
            source={Imports.images.avatarImage}
          />
        </View>
      </View>
    </View>
  );
}

export default ProfileHeader;
