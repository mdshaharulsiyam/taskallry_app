import { PortalProvider } from "@gorhom/portal";
import { NavigationContainer } from "@react-navigation/native";
import React, { Suspense } from "react";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import Loader from "../components/ui/loader/Loader";
import GlobalContextProvider from "../providers/GlobalContextProvider";
import { store } from "../redux/store";
import DrawerLayout from "./DrawerLayout";
const Root = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <PortalProvider>
          <KeyboardProvider>
            <NavigationContainer>
              <GlobalContextProvider>
                <StatusBar
                  barStyle={"light-content"}
                  backgroundColor={`#111827`}
                />
                <Suspense fallback={<Loader />}>
                  <DrawerLayout />
                </Suspense>
                <Toast />
              </GlobalContextProvider>
            </NavigationContainer>
          </KeyboardProvider>
        </PortalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default React.memo(Root);
