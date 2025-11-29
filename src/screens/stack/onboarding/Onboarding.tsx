import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Suspense, useEffect } from "react";
import { Image, View } from "react-native";
import { useGlobalContext } from '../../../providers/GlobalContextProvider';
import Navigate from '../../../utils/Navigate';

const Onboarding = () => {
  const [loading, setLoading] = React.useState(true);
  const { setRole, role } = useGlobalContext();
  const navigate = Navigate();
  useEffect(() => {
    setLoading(true);
    const getRole = async () => {
      const role = await AsyncStorage.getItem("role");
      if (role) {
        setRole(role as "user" | "service" | null);
      }
    };
    getRole().then(() => setLoading(false));
  }, []);
  if (role && !loading) {
    navigate("TabLayout");
    return null;
  } else if (!loading) {
    navigate("Login");
    return null;
  }
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


