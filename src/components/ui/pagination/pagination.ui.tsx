import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export interface PaginationProps {
  length : number,
  hideFirstIndex? : boolean,
  hideLastIndex? : boolean,
  activeIndex : number
}

const Pagination:React.FC<PaginationProps> = ({
  length = 4,
  hideFirstIndex = false,
  hideLastIndex = false,
  activeIndex,
}) => {
  length = length - (hideFirstIndex ? 1 : 0) - (hideLastIndex ? 1 : 0)
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container : {
      flexDirection :'row',
      justifyContent : 'center',
      alignItems : 'center',
    },
    dot: {
      height: 6,
      width: 6,
      borderRadius  :10,
      marginHorizontal: 10,
      backgroundColor: colors.white,
    },
    dotActive: {
      height: 10,
      width: 10,
      borderRadius  :10,
      marginHorizontal: 10,
      backgroundColor: colors.primary
    },
  });
  return (
    <View style={styles.container} >
      {
        [...new Array<number>(length)].map((_,index)=>(
          <View key={index} style={(index===activeIndex)? styles.dotActive : styles.dot} ></View>
        ))
      }
    </View>
  );
};

export default Pagination;