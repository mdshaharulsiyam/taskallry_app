import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Suspense, useEffect } from "react";
import { Image, View } from "react-native";
import { useGlobalContext } from '../../../providers/GlobalContextProvider';
import Navigate, { Navigation } from '../../../utils/Navigate';

const Onboarding = () => {
  const [loading, setLoading] = React.useState(true);
  const { setRole } = useGlobalContext();
  const navigate = Navigate();
  const navigation = Navigation();
  useEffect(() => {
    setLoading(true);
    const getRole = async () => {
      const role = await AsyncStorage.getItem("role");
      const isAddressProvided = await AsyncStorage.getItem("isAddressProvided");
      const isBankNumberVerified = await AsyncStorage.getItem("isBankNumberVerified");
      if (role) {
        if (isAddressProvided) {
          navigation.navigate("ServiceSignUp", { screen: "Address" });
        } else if (isBankNumberVerified && role === "service") {
          navigation.navigate("ServiceSignUp", { screen: "BVN" });
        } else {
          setRole(role as "user" | "service" | null);
          navigate("TabLayout");
        }
      } else {
        navigate("Login");
      }
    };
    getRole().then(() => setLoading(false));
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




