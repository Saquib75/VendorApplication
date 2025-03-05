/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import AuthContext from './src/api/authContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const Root = () => {
  return (
    <AuthContext>
      <GestureHandlerRootView style={{flex: 1}}>
        <App />
      </GestureHandlerRootView>
    </AuthContext>
  );
};
AppRegistry.registerComponent(appName, () => Root);
