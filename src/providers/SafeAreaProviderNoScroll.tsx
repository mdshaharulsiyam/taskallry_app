import React, { ReactNode } from "react";
import { Dimensions, View } from "react-native";
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
  const { height } = Dimensions.get("window");
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
