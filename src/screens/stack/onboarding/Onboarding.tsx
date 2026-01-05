import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Suspense, useEffect } from "react";
import { Image, View } from "react-native";
import { useGlobalContext } from '../../../providers/GlobalContextProvider';
import { Navigation } from '../../../utils/Navigate';

const Onboarding = () => {
  const [loading, setLoading] = React.useState(true);
  const { setRole } = useGlobalContext();
  const navigation = Navigation();
  useEffect(() => {
    setLoading(true);
    const getRole = async () => {
      const role = await AsyncStorage.getItem("role");
      const isAddressProvided = await AsyncStorage.getItem("isAddressProvided");
      const isBankNumberVerified = await AsyncStorage.getItem("isBankNumberVerified");
      const isIdentificationDocumentVerified = await AsyncStorage.getItem("isIdentificationDocumentVerified");
      if (role) {
        if (isAddressProvided) {
          navigation.reset({
            index: 0,
            routes: [{ name: 'ServiceSignUp', params: { screen: 'Address' } }],
          });
        } else if (isBankNumberVerified && role === "service") {
          navigation.reset({
            index: 0,
            routes: [{ name: 'ServiceSignUp', params: { screen: 'BVN' } }],
          });
        }
        else if (isIdentificationDocumentVerified && role === "service") {
          navigation.reset({
            index: 0,
            routes: [{ name: 'ServiceSignUp', params: { screen: 'Identity' } }],
          });
          // navigation.navigate("ServiceSignUp", { screen: "Identity" });
        } else {
          setRole(role as "user" | "service" | null);
          // navigate("TabLayout");
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabLayout' }],
          });

        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        // navigate("Login");
      }
    };
    const timer = setTimeout(() => {
      getRole().then(() => setLoading(false));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Suspense>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("../../../assets/Logo.png")}
          style={{ width: 160, height: 160, resizeMode: "contain" }}
        />
      </View>
    </Suspense>
  );

}
export default React.memo(Onboarding);




