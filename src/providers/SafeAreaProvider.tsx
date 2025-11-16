import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../components/shered/BackButton";
import { useGlobalContext } from "./GlobalContextProvider";
const withoutLog = [
  "login",
  "signup",
  "forget",
  "verify",
  "resetpassword",
  "choosesignup",
  "customersignup",
  "servicesignup",
  "trustedservices",
  "securepayments",
  "realtimebooking",
];
const SafeAreaProvider = ({
  children,
  backButtonText,
  zeroPadding = false,
  handler,
}: {
  children: ReactNode;
  backButtonText?: string;
  zeroPadding?: boolean;
  handler?: () => void;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { role } = useGlobalContext();
  useEffect(() => {

    const currentRoute = route.name.toLowerCase();
    if (!withoutLog.includes(currentRoute) && !role) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "Login" }],
        })
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: "TabLayout" }],
        })
      );

    }
  }, [role, route.name]);
  return (
    <View
      style={{
        marginTop: zeroPadding ? 0 : top,
        marginBottom: zeroPadding ? 0 : bottom,
      }}
    >
      <View
        style={{
          paddingHorizontal: zeroPadding ? 0 : 20,
        }}
      >
        {backButtonText && (
          <BackButton backHandler={handler} text={backButtonText} />
        )}
        <KeyboardAwareScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default SafeAreaProvider;

const styles = StyleSheet.create({});
