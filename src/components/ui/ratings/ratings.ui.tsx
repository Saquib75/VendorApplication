import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import VectorIcon from '../vector_icon/vector_icon';
import Text from '../text/text.ui';

export interface RatingsProps{
  rating : 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  textTop? : boolean;
  textLeft? : boolean;
  starSize : number;
  navigateTo? : string
}

const Ratings:React.FC<RatingsProps> = ({rating,navigateTo,starSize = 20,textLeft = true ,textTop,...rest}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container : {
      paddingVertical : 20 , 
      flexDirection : 'row',
    }
  });
  const navigation = useNavigation()
  const generateRatingArray = (length:number,) => {
    
    const ratingArray = [];
    
    for (let i = 1; i <= length * 2; i++) {
      const rating = i / 2; // Generating half numbers
      ratingArray.push(rating);
    }
    return ratingArray;
  }
  return (
    // @ts-ignore
    <TouchableOpacity onPress={()=>{ if(navigateTo !== undefined)navigation.navigate(navigateTo)}}>
      {textTop && <Text title style={{fontSize : 50 ,textAlign : 'center'}}> {rating} </Text>}
      <View style={[styles.container,!textLeft && textTop ? {justifyContent : 'center'} : {}]} >
        {textLeft && <Text title style={{fontSize : 30}}> {rating} </Text>}
        {
          generateRatingArray(rating).map((item,index)=>{
            if (Number.isInteger(item) ) {
              return <VectorIcon key={index} type='FontAwesome' name='star' color={colors.warning} size={starSize}  />
            }else if(item === rating && !Number.isInteger(rating)){
              return <VectorIcon key={index} type='FontAwesome' name='star-half-full' color={colors.warning} size={starSize} />
            }
            return null;
          })
        }
      </View>
    </TouchableOpacity>
  );
};

export default Ratings;