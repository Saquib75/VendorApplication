import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { useTheme } from '@react-navigation/native';
import Text from './ui/text/text.ui';
import VectorIcon from './ui/vector_icon/vector_icon';
import Spacer from './ui/spacer/spacer.ui';
import Animated, { interpolateColor, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import Button from './ui/button/button.ui';
let isFirst = true
const ShowNotConnected = () => {
  const [conn, setConn] = useState(true)
  const [delay, setDelay] = useState(false);
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      justifyContent: "flex-end",
      alignItems: 'center',
      zIndex: 10000,
      backgroundColor: colors.background + "24",
      paddingBottom: 65
    },
    no_internet_box: {
      width: "80%",
      backgroundColor: conn ? colors.primary_dark + 'ee' : colors.dark_black + "dd",
      borderRadius: 20,
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 20
    }
  });
  //animations
  const cardColorValue = useSharedValue(0);
  const cardMovingValue = useSharedValue(0);
  const cardTranslateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cardMovingValue.value }]
  }))
  const sBtnColorAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        cardColorValue.value,
        [1, 0],
        [colors.primary + 'ee', colors.dark_black + "dd"]
      ),
    };
  });
  useEffect(() => {

    var timeout: NodeJS.Timeout | undefined;
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if (!state.isConnected) {
        isFirst = false
      }
      if (!isFirst) {
        setConn(state.isConnected)
        setDelay(true)
          timeout = setTimeout(() => {
            setDelay(!state.isConnected);
          }, 2000)
        }
    });

    return () => {
      // Unsubscribe
      clearTimeout(timeout);
      unsubscribe();
    };
  }, [])
  useEffect(() => {
    if (conn) {
      cardColorValue.value = withTiming(1, { duration: 350 })
    } else {
      cardColorValue.value = withTiming(0, { duration: 350 })
    }
  }, [conn])
  if (!delay) {
    return <></>
  }
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.no_internet_box, sBtnColorAnimatedStyle]} >
        {
          conn ?
            <VectorIcon type='Entypo' size={40} name='emoji-happy' color={colors.white} />
            :
            <VectorIcon type='Entypo' size={40} name='emoji-sad' color={colors.white} />
        }

        <Text dark style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }} >
          {
            conn ? "Woohooo! connection \nRestored" : "Looks like you're \nOffline"
          }
        </Text>
        <Spacer size={5} />
        <Text dark style={{ textAlign: 'center' }} >
          {
            conn ? "Collecting information from server..." : "Searching for active internet connection..."
          }
        </Text>
        <Spacer />
      </Animated.View>
    </View>
  );
};

export default ShowNotConnected;
