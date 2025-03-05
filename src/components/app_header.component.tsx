import {StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import VectorIcon from './ui/vector_icon/vector_icon';
import Text from './ui/text/text.ui';

export interface AppHeaderProps extends ViewProps {
  title?: string;
  color?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  style,
  color,
  ...rest
}) => {
  // const {colors} = useTheme()
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      padding: 10,
      flexDirection: 'row',
      zIndex: 100,
    },
  });
  return (
    <View style={[styles.container, style]} {...rest}>
      <VectorIcon
        type="Ionicons"
        name="chevron-back"
        size={30}
        color={color}
        onPress={() => navigation.goBack()}
      />
      <Text style={{flex: 1}}>{title ?? ''}</Text>
    </View>
  );
};

export default AppHeader;
