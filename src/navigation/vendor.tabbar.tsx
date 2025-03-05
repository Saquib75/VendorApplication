import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VectorIcon from '../components/ui/vector_icon/vector_icon';
import Text from '../components/ui/text/text.ui';
import {APP_ROUTES, HOME_ROUTES} from '../utils/route_names.util';

const VendorTabBar: React.FC<any> = ({
  state,
  descriptors,
  navigation,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 10,
      paddingBottom: insets.bottom + (Platform.OS === 'ios' ? 0 : 10),
      backgroundColor: colors.card,
      // position  :'absolute',
      // right : 0,
      // left  : 0,
      // bottom : 0,
      justifyContent: 'space-around',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    scanner_style: {
      backgroundColor: colors.white,
      height: 70,
      width: 70,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 28,
      marginBottom: -25,
    },
    scan_line: {
      height: 2,
      width: 30,
      backgroundColor: colors.primary,
      position: 'absolute',
    },
  });
  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        if (route.name === HOME_ROUTES.Scanner) {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => console.log('pressed')}>
              <View style={styles.scanner_style}>
                <VectorIcon
                  type="MaterialCommunityIcons"
                  size={35}
                  name="scan-helper"
                  color={colors.black}
                />
                <View style={styles.scan_line}></View>
              </View>
            </TouchableWithoutFeedback>
          );
        }
        return (
          <Pressable
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              justifyContent: 'center',
              // paddingLeft  :18,
              alignItems: 'center',
              // backgroundColor: isFocused ? colors.primary : colors.danger,
              borderRadius: 50,
            }}>
            {/* <VectorIcon name="home" type='AntDesign' color={isFocused ? colors.white : colors.gray} /> */}
            {
              <options.tabBarIcon
                color={isFocused ? colors.vendorPrimary : colors.white}
              />
            }
            {
              <Text
                style={{
                  fontSize: 10,
                  color: isFocused ? colors.vendorPrimary : colors.white,
                }}>
                {label}
              </Text>
            }
          </Pressable>
        );
      })}
    </View>
  );
};

export default VendorTabBar;
