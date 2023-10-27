/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// Import the following line to initialize react-native-screens
import {enableScreens} from 'react-native-screens';
enableScreens();
AppRegistry.registerComponent(appName, () => App);
