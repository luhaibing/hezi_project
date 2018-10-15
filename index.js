/** @format */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import AppStack from "./src/choice";
import App3 from "./test/test_image_picker";
import App from "./test/test_imager_picker";

AppRegistry.registerComponent(appName, () => AppStack);
// AppRegistry.registerComponent(appName, () => App3);
// AppRegistry.registerComponent(appName, () => App);
