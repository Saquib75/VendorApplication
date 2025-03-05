import {Platform, StatusBar, StyleSheet, View, ViewProps} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused, useTheme} from '@react-navigation/native';

export interface ContainerProps extends ViewProps {
  headerTranslucent?: boolean;
  barStyle?: 'light-content' | 'dark-content';
  backgroundColor?: string;
  safeArea?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  style,
  headerTranslucent = false,
  barStyle = null,
  backgroundColor = 'transparent',
  safeArea = false,
  children,
  ...rest
}) => {
  const isFocused = useIsFocused();
  const theme = useTheme();
  const defaultBarStyle = theme.dark ? 'light-content' : 'dark-content';
  if (safeArea) {
    return (
      <SafeAreaView
        edges={headerTranslucent ? ['right', 'left'] : ['right', 'top', 'left']}
        {...rest}
        style={[styles.container, {backgroundColor}]}>
        {isFocused && (
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={barStyle ? barStyle : defaultBarStyle}
          />
        )}
        <View
          style={[
            {
              flex: 1,
              backgroundColor: theme.colors.background,
            },
            style,
          ]}>
          {children}
        </View>
      </SafeAreaView>
    );
  }
  return (
    <>
      {isFocused && (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={barStyle ? barStyle : defaultBarStyle}
        />
      )}
      <View
        style={[
          {
            flex: 1,
            backgroundColor: theme.colors.background,
          },
          style,
        ]}>
        {children}
      </View>
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
