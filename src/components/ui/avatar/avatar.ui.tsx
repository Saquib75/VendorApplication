import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {ViewProps} from 'react-native';
import VectorIcon, {VectorIconProps} from '../vector_icon/vector_icon';
import Text from '../text/text.ui';

export interface AvatarProps extends ViewProps {
  size: number;
  source?: {uri: string} | any;
  bottomIcon?: VectorIconProps;
  onPress?: () => void | undefined;
  styled?: boolean;
  name?: string;
  backgroundColor?: string;
  outlined?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  size,
  styled = false,
  name,
  bottomIcon,
  onPress,
  backgroundColor,
  source,
  style,
  outlined = false,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    container: {
      height: size,
      width: size,
      borderRadius: size / 2,
      overflow: 'hidden',
      backgroundColor: backgroundColor ?? colors.success,
      justifyContent: 'center',
      alignItems: 'center',
    },
    outline: {
      padding: 5,
      borderColor: styled ? colors.danger : colors.success,
      borderWidth: 1,
      borderRadius: size / 2 + 20,
    },
    image: {
      height: '100%',
      width: '100%',
    },
    bottom_icon_style: {
      backgroundColor: styled ? colors.transparent : colors.card,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: styled ? 0 : 'auto',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: bottomIcon?.size ? bottomIcon.size + 4 : 20,
      padding: bottomIcon?.size ? bottomIcon.size / 2 : 10,
      borderColor: colors.light_gray_border,
      borderWidth: styled ? 0 : 1,
    },
  });
  console.log(source);

  return (
    <View style={outlined ? styles.outline : {}}>
      <Pressable
        disabled={onPress === undefined}
        onPress={onPress}
        style={{height: size, width: size}}>
        <View style={[styles.container, style]} {...rest}>
          {source ? (
            <Image source={source} style={styles.image} resizeMode="cover" />
          ) : null}
          {!source && name ? (
            <Text
              style={{
                fontSize: size * (60 / 100),
                color: colors.white,
              }}>
              {name?.split(' ')[0].charAt(0)}
            </Text>
          ) : null}
        </View>

        {bottomIcon ? (
          <View style={styles.bottom_icon_style}>
            <VectorIcon style={{padding: 0}} {...bottomIcon} />
          </View>
        ) : null}
      </Pressable>
    </View>
  );
};

export default Avatar;
