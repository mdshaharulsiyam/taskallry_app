import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense } from "react";
import { View } from "react-native";
import AccountScreen from "./service-signup/AccountScreen";
import AddressScreen from "./service-signup/AddressScreen";
import BVNScreen from "./service-signup/BVNScreen";
import IdentityScreen from "./service-signup/IdentityScreen";
import ReferralScreen from "./service-signup/ReferralScreen";

const Stack = createNativeStackNavigator();

const ServiceSignUp = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Account">
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="BVN" component={BVNScreen} />
          <Stack.Screen name="Identity" component={IdentityScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Referral" component={ReferralScreen} />
        </Stack.Navigator>
      </Suspense>
    </View>
  );
};

export default React.memo(ServiceSignUp);
