import { Platform } from 'react-native';

export const shadow = (color = "#cccccc") => ({
  ...Platform.select({
    ios: {
      shadowColor: color,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    android: {
      elevation: 1,
    },
  }),
});
