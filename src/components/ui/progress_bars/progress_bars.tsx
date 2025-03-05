import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
export interface ProgressBarsProps {
  activeIndex : number;
  barCount : number;

}
const ProgressBars = ({activeIndex= 2 , barCount = 4 }) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container : {
      paddingVertical  :20,
      flexDirection : 'row',
      justifyContent : 'space-between',
    },
    bars : {
      backgroundColor  : colors.light_gray_half_transparent,
      height  : 3,
      borderRadius : 10,
      flex  : 1,
      marginHorizontal : 2
    },
    selected_bar : {
      backgroundColor : colors.primary
    }
  });
  return (
    <View style={styles.container} >
      {
        Array.from({length: barCount}, (_, i) => i + 1).map((item,index)=>(
          <View key={index}  style={[styles.bars, (item <=activeIndex) ? styles.selected_bar:{} ]} ></View>
        ))
      }
    </View>
  );
};

export default ProgressBars;