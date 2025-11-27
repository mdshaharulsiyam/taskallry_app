import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackButton from "../components/shered/BackButton";
// const withoutLog = [
//   "login",
//   "signup",
//   "forget",
//   "verify",
//   "resetpassword",
//   "choosesignup",
//   "customersignup",
//   "servicesignup",
//   "trustedservices",
//   "securepayments",
//   "realtimebooking",
//   "account",
//   "bvn",
//   "identity",
//   "address",
//   "referral",
//   "customeraccount",
//   "customeraddress",
//   "customerreferral",
// ];
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
  // const navigation = useNavigation<NavigationProp<ParamListBase>>();
  // const route = useRoute();
  // const { role } = useGlobalContext();
  // console.log(route.name);
  // useEffect(() => {
  //   const currentRoute = route.name.toLowerCase();
  //   if (!withoutLog.includes(currentRoute) && !role) {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "Login" }],
  //       })
  //     );
  //   }
  // }, [role, route.name]);
  // useEffect(() => {
  //   const currentRoute = route.name.toLowerCase();
  //   if (withoutLog.includes(currentRoute) && role) {
  //     navigation.dispatch(
  //       CommonActions.reset({
  //         index: 0,
  //         routes: [{ name: "TabLayout" }],
  //       })
  //     );
  //   }
  // }, [role, route.name]);
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
