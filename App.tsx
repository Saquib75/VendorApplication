import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';
import Navigation from './src/navigation';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AlertNotificationRoot} from 'react-native-alert-notification';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <AlertNotificationRoot>
            <Navigation />
          </AlertNotificationRoot>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
