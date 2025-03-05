import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useTheme} from '@react-navigation/native';

export interface VectorIconProps extends TouchableOpacityProps {
  name: string;
  color?: string;
  size?: number;
  type:
    | 'Entypo'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'AntDesign'
    | 'MaterialIcons'
    | string;
  onPress?: any;
  light?: boolean;
}

const VectorIcon: React.FC<VectorIconProps> = ({
  light,
  disabled,
  style,
  onPress = null,
  name,
  color,
  type = 'MaterialCommunityIcons',
  size = 20,
  ...rest
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    icon: {
      padding: 5,
      borderRadius: 5,
    },
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      {...rest}
      disabled={disabled || onPress === null}
      onPress={onPress}
      style={[styles.icon, style]}>
      <Icon
        type={type}
        name={name}
        color={color ?? (light ? colors.black : colors.text)}
        size={size}
      />
    </TouchableOpacity>
  );
};
interface IconProps {
  name: string;
  color?: string;
  size?: number;
  type:
    | 'Entypo'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'Octicons'
    | 'AntDesign'
    | 'MaterialIcons'
    | string;
}
const Icon: React.FC<IconProps> = ({type, ...rest}) => {
  switch (type) {
    case 'Entypo':
      return <Entypo {...rest} />;
    case 'Feather':
      return <Feather {...rest} />;
    case 'FontAwesome':
      return <FontAwesome {...rest} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...rest} />;
    case 'FontAwesome6':
      return <FontAwesome6 {...rest} />;
    case 'Ionicons':
      return <Ionicons {...rest} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...rest} />;
    case 'Octicons':
      return <Octicons {...rest} />;
    case 'AntDesign':
      return <AntDesign {...rest} />;
    case 'MaterialIcons':
      return <MaterialIcons {...rest} />;
    default:
      <MaterialCommunityIcons {...rest} />;
  }
};
export default VectorIcon;
