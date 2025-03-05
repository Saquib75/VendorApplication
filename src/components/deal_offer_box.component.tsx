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
import moment from 'moment';

interface DealOfferBoxProps extends ViewProps {
  deal: any;
  onPress: () => void;
  width?: number;
}
const {width} = Dimensions.get('screen');
const DealOfferBox: FC<DealOfferBoxProps> = ({
  deal,
  onPress,
  width,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    flyers_item_container: {
      backgroundColor: colors.card,
      width: width ?? '100%',
      height: 250,
      borderRadius: 10,
      marginRight: 20,
      overflow: 'hidden',
    },
    flyers_item_header: {
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    flyers_item_image: {
      flex: 1,
      backgroundColor: colors.light_gray_border,
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
            src={deal.business_details.business_logo}
            style={{width: 35, height: 35, borderRadius: 999}}
            resizeMode="cover"
          />
          <View>
            <Text>{deal.business_details.name}</Text>
            <Text style={{fontSize: 10, marginVertical: 3}}>
              Untill {moment(deal.end_date, 'DD-MM-YYYY').format('MMM Do YY')}
            </Text>
          </View>
        </View>
        <VectorIcon
          name="heart"
          type="Ionicons"
          style={{paddingVertical: 0}}
          color={colors.danger}
        />
      </View>
      <TouchableOpacity onPress={onPress} style={styles.flyers_item_image}>
        <Image
          src={deal.image}
          style={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DealOfferBox;
