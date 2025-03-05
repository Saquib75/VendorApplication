import React, { useEffect, useState } from 'react'
import {
  // Modal as NativeModal, 
  ScrollView, StyleSheet, TouchableWithoutFeedback, View, ViewProps, ViewStyle
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { shadow } from '../../../utils/library.util';
// import KeyboardAvoidingView from '../keyboardavoidingview/keyboardavoidingview.ui';
import { Portal } from 'react-native-paper';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from 'react-native-reanimated';
import Spacer from '../spacer/spacer.ui';
import VectorIcon from '../vector_icon/vector_icon';
import RNModal from "react-native-modal";
import Text from '../text/text.ui';
export interface ModalProps extends ViewProps {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void,
  scrollable?: boolean;
  scrollHeight?: number,
  modalStyle?: ViewStyle,
  onClose?: () => void
}
const Modal: React.FC<ModalProps> = ({ style, onClose = () => { }, children, modalStyle = {}, modalVisible = false, scrollable, scrollHeight, setModalVisible = (val) => { } }) => {
  const { colors } = useTheme()
  const translateY = useSharedValue(0);
  const overlayFade = useSharedValue(0);
  // const onGestureEvent = useAnimatedGestureHandler({
  //   onStart: (e, c) => {
  //     c.startY = translateY.value
  //   },
  //   onActive: (e, c) => {
  //     // console.log(c.startY + e.translationY);
  //     translateY.value = c.startY + e.translationY
  //   },
  //   onEnd: (e, c) => {
  //     let endValue = c.startY + e.translationY;
  //     if (endValue > 70) {
  //       runOnJS(setModalVisible)(false)
  //     } else {
  //       translateY.value = withTiming(0, { duration: 500 })
  //     }
  //   },
  // })
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  const overlayFadeStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayFade.value
    };
  });
  useEffect(() => {

    if (!modalVisible) {
      overlayFade.value = 0
      translateY.value = 0
    } else {
      overlayFade.value = withDelay(300, withTiming(1, { duration: 200 }))
    }
  }, [modalVisible])

  const styles = StyleSheet.create({
    modalWrapper: {
      flexDirection: 'column-reverse',
      flex: 1,
    },
    modalOverlay: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: colors.black + "34",
    },
    modalView: {
      height: scrollHeight ?? 'auto',
      backgroundColor: colors.card,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      // overflow : 'hidden',
      // borderTopLeftRadius: 20,
      // borderTopRightRadius: 20,
      borderRadius: 20,
      ...shadow(colors.primary),
    },
    modal_view_offset: {
      position: 'absolute',
      bottom: 0,
      width: "100%",
      paddingTop: 100,
    },
    close_bar: {
      height: 7,
      top: 0,
      width: 100,
      backgroundColor: colors.light_gray_border,
      marginVertical: 10,
      borderRadius: 10,
      alignSelf: 'center',
      marginBottom: -10,
      zIndex: 10,
    },
    close_icon: {
      top: -50,
      borderRadius: 10,
      alignSelf: 'center',
      position: 'absolute',
      zIndex: 10,
    }
  });
  const closeModal = ()=>{
    setModalVisible(!modalVisible);
    onClose();
  }
  if (modalVisible) {
    return (
      <RNModal
        onBackButtonPress={closeModal}
        backdropOpacity={0.3}
        onBackdropPress={closeModal}
        isVisible={modalVisible}>
        <View style={[styles.modalView, modalStyle]} >
        <VectorIcon color={colors.dark_black} onPress={closeModal} size={35} style={styles.close_icon} type='AntDesign' name='closecircle' />
          <View style={styles.close_bar} ></View>
          <View style={[{
            borderRadius: 20,
            flex : 1,
          }, style]} >
            {children}
          </View>
        </View>
      </RNModal>
    )
  }
  return null
}

export default Modal


