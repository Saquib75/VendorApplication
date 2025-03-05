import {StyleSheet, TouchableOpacity, View, ViewProps} from 'react-native';
import React, {FC} from 'react';
import {useTheme} from '@react-navigation/native';
import Text from './ui/text/text.ui';

export interface GroupTitleProps extends ViewProps {
  title: string;
  onSeeAll?: () => void;
  link: string;
  navigation: any;
  isAd?: boolean;
  data?: any;
}

const GroupTitle: FC<GroupTitleProps> = ({
  title,
  style,
  link,
  navigation,
  isAd,
  data,
  onSeeAll = () => {
    if (data) navigation.navigate(link, {data});
    else navigation.navigate(link);
  },
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({});
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        style,
      ]}
      {...rest}>
      <Text title style={{color: isAd ? colors.white : colors.blue}}>
        {title}
      </Text>
      {!isAd && (
        <TouchableOpacity onPress={onSeeAll}>
          <Text style={{color: colors.primary}}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default GroupTitle;
