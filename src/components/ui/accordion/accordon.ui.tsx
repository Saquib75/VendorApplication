import React, { FC, Fragment, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Card from '../card/card.ui';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Spacer from '../spacer/spacer.ui';
import VectorIcon, { VectorIconProps } from '../vector_icon/vector_icon';
import { Portal } from 'react-native-paper';
export interface AccordionProps extends ViewProps {
  MainComponent: React.ReactNode,
  MainComponentContainerStyle?: ViewStyle,
  HiddenComponent: React.ReactNode,
  HiddenComponentContainerStyle?: ViewStyle,
  usePerformance?: boolean;
  hideExpanderIcon? : boolean,
}
const Accordion: FC<AccordionProps> = ({
  style,
  MainComponent,
  MainComponentContainerStyle,
  HiddenComponent,
  HiddenComponentContainerStyle,
  usePerformance = false,
  hideExpanderIcon = false,
  ...rest
}) => {
  const { colors } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [hiddenContentHeight, setHiddenContentHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const collapseStyle = useAnimatedStyle(() => ({ height: animatedHeight.value }))
  const mainRef = useRef<null | View>(null);
  const styles = StyleSheet.create({
    card: {
      // height : mainContentHeight + hiddenContentHeight + 12,
      paddingBottom: 0
    },
    hidden: {
      // height: 0
    },
    expand_btn: {
      alignItems: 'center'
    },

  });
  const onLayoutHiddenContent = (event: LayoutChangeEvent) => {
    setHiddenContentHeight(event.nativeEvent.layout.height);
  };
  const toggleAccordion = () => {
    const exp = expanded;
    setExpanded(!exp);
    if (exp) {
      animatedHeight.value = withTiming(0, { duration: 300 })
    } else {
      animatedHeight.value = withTiming(hiddenContentHeight, { duration: 300 })
    }
  }
  return (
    <>
      <Card usePressable
        onPress={toggleAccordion}
        style={[hideExpanderIcon ? {} : styles.card, style]} {...rest}>
        <View
          ref={mainRef}
        >
          {MainComponent}
        </View>
        {
          usePerformance ?
            <View style={{display : expanded ? "flex" : "none"}} >
              <Spacer />
              {HiddenComponent}
            </View>
            :
            <Animated.View
              style={[{ height: 0, overflow: 'hidden' }, collapseStyle]} >
              <Spacer />
              {HiddenComponent}
            </Animated.View>
        }
        {
          !hideExpanderIcon ?
          <View style={styles.expand_btn} >
            <VectorIcon color={expanded ? colors.primary : colors.text} name={expanded ? 'chevron-up' : 'chevron-down'} type='Entypo' style={{ padding: 0 }} />
          </View> : <View  ></View>
        }
      </Card>
      {
        !usePerformance &&
        <View
          onLayout={onLayoutHiddenContent}
          style={{ position: 'absolute', zIndex: -10, alignSelf: 'center', opacity: 0 }} >
          <Spacer />
          {HiddenComponent}
        </View> 
      }
    </>
  );
};

export default Accordion;