import {
  CommonActions,
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { ReactNode, useEffect } from "react";
import { Dimensions, View } from "react-native";
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

const SafeAreaProviderNoScroll = ({
  children,
  backButtonText,
  zeroPadding = false,
}: {
  children: ReactNode;
  backButtonText?: string;
  zeroPadding?: boolean;
}) => {
  const { top, bottom } = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute();
  const { height } = Dimensions.get("window");
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
    }
  }, [role, route.name]);
  useEffect(() => {
    const currentRoute = route.name.toLowerCase();
    if (withoutLog.includes(currentRoute) && role) {
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
        height,
      }}
    >
      <View
        style={{
          paddingHorizontal: zeroPadding ? 0 : 20,
        }}
      >
        {backButtonText && <BackButton text={backButtonText} />}
        {children}
      </View>
    </View>
  );
};

export default SafeAreaProviderNoScroll;
