import React, { useEffect, useState } from 'react';
import { Easing, Pressable, StyleSheet, View, ViewProps, ViewStyle, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import Text from '../text/text.ui';
import Spacer from '../spacer/spacer.ui';
import { TabItemProps } from './tab_item.ui';

export interface TabsProps extends ViewProps {
  activeIndex : number,
  setActiveIndex  : React.Dispatch<number>;
  tabHeaders : string[] ;
  padding? : number;
  activeTabColor? : string,
  tabStyle? : ViewStyle
}


const Tabs:React.FC<TabsProps> = ({
  children,
  setActiveIndex,
  activeIndex,
  tabHeaders,
  padding = 20,
  activeTabColor,
  tabStyle,
  style,
  ...rest
}) => {
  const {width} = useWindowDimensions()
  const PADDING = padding;
  const TAB_CONTAINER_WIDTH = width - (PADDING * 2)
  const TAB_WIDTH = TAB_CONTAINER_WIDTH / tabHeaders.length
  const { colors } = useTheme();
  // const [activeTabIndex , setActiveIndex] = useState<number>(0);
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    top_tabs: {
      flexDirection: 'row',
    },
    tab_items: {
      padding: 10,
      width : TAB_WIDTH 
      // backgroundColor : 'red'
    },
    tab_item_text: {
      color: colors.white,
      textAlign  :'center',
      fontSize : 14,
    },
    tab_background: {
      borderBottomColor: activeTabColor ??colors.primary,
      borderBottomWidth : 2,
      position  :'absolute',
      transform : [{translateX : 0}]
    },
    tab_background_text:{
      color : colors.secondary,
    },
    active_tab_text:{
      color:colors.primary,
      fontWeight : 'bold'
    },
    h_card :{
      padding : 10,
      backgroundColor : colors.white,
      marginVertical : 5,
      flexDirection : 'row',
      borderRadius : 10,
      alignItems  :'center'
    },
    h_card_body :{
      flex : 1,
    },

  })

  //animations
  const tabValue = useSharedValue(activeIndex * TAB_WIDTH);
  const activeTabStyle = useAnimatedStyle(()=>({transform : [{translateX : tabValue.value}]}))
  const onPressTab =(index:number)=>{
    setActiveIndex(index);
    tabValue.value = withTiming(index * TAB_WIDTH,{duration : 200})
  }
  // const CustomChildren = ()=>{
  //   // if (React.isValidElement(children)) {
  //     // Clone the child with additional props
  //     // @ts-ignore
  //     return React.cloneElement(children, { activeIndex ,index :2 });
  //   // }
  // }
  return (
    <>
      <View style={[styles.top_tabs,tabStyle]} {...rest} >
        <Animated.View style={[styles.tab_items,styles.tab_background,activeTabStyle]} >
          <Text style={[styles.tab_item_text,{color : colors.transparent}]} >{"xxxxxxx"}</Text>
        </Animated.View>
        {
          tabHeaders.map((item, item_index) => (
            <Pressable onPress={()=>onPressTab(item_index)} key={item_index} style={styles.tab_items} >
              <Text style={[styles.tab_item_text,item_index === activeIndex ? styles.active_tab_text : {}]} >{item}</Text>
            </Pressable>
          ))
        }
      </View>
      <Spacer />
      <>
        {children}
      </>
    </>
  );
};
export default Tabs;