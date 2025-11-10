/**
 * @format
 */
import "react-native-get-random-values";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import Root from "./src/layout/Root";

AppRegistry.registerComponent(appName, () => Root);
