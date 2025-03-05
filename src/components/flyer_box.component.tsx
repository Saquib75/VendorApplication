import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';
import {ViewProps} from 'react-native-svg/lib/typescript/fabric/utils';
import Avatar from './ui/avatar/avatar.ui';
import Text from './ui/text/text.ui';
import VectorIcon from './ui/vector_icon/vector_icon';
import {base_url} from '../utils/constants.util';
import moment from 'moment';
interface FlyerBoxProps extends ViewProps {
  flyer: any;
  wishlist?: boolean;
  onPress: () => void;
}
const {width} = Dimensions.get('screen');

const FlyerBox: FC<FlyerBoxProps> = ({flyer, onPress, wishlist, ...rest}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    flyers_item_container: {
      backgroundColor: colors.card,
      width: wishlist ? width / 2 - 20 : width / 2 - 10,
      height: 250,
      borderRadius: 10,
      marginRight: 20,
    },
    flyers_item_header: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flyers_item_image: {
      flex: 1,
      // backgroundColor: colors.light_gray_border,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flyers_item_duration: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.flyers_item_container} {...rest}>
      <View style={styles.flyers_item_header}>
        <View
          style={{flexDirection: 'row', flex: 1, alignItems: 'center', gap: 5}}>
          <Image
            src={flyer.business_details.business_logo}
            style={{width: 30, height: 30, borderRadius: 999}}
            resizeMode="cover"
          />
          <Text>{flyer.business_details.name}</Text>
        </View>
        <Text small style={{color: colors.primary}}>
          Latest
        </Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.flyers_item_image}>
        <Image
          src={flyer.image}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <View style={styles.flyers_item_duration}>
        <Text>
          {' '}
          Untill {moment(flyer.end_date, 'DD-MM-YYYY').format('MMM Do YY')}
        </Text>
        <VectorIcon
          name="heart"
          type="Ionicons"
          style={{paddingVertical: 0}}
          color={colors.danger}
        />
      </View>
    </View>
  );
};

export default FlyerBox;
