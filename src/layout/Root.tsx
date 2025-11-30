import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { enableFreeze, enableScreens } from "react-native-screens";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import GlobalContextProvider from "../providers/GlobalContextProvider";
import { store } from "../redux/store";
import DrawerLayout from "./DrawerLayout";
enableScreens(true);
enableFreeze(true);
const Root = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        {/* <PortalProvider> */}
        <KeyboardProvider>
          <NavigationContainer>
            <GlobalContextProvider>
              <StatusBar
                barStyle={"dark-content"}
                backgroundColor={`#FAFBF9`}
                hidden={false}
              />
              <DrawerLayout />
              <Toast />
            </GlobalContextProvider>
          </NavigationContainer>
        </KeyboardProvider>
        {/* </PortalProvider> */}
      </GestureHandlerRootView>
    </Provider>
  );
};

export default React.memo(Root);
