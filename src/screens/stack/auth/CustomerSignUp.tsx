import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense } from "react";
import { View } from "react-native";
import CustomerAccountScreen from "./customer-signup/CustomerAccountScreen";
import CustomerAddressScreen from "./customer-signup/CustomerAddressScreen";
import CustomerReferralScreen from "./customer-signup/CustomerReferralScreen";

const Stack = createNativeStackNavigator();

const CustomerSignUp = () => {
  return (
    <View style={{ flex: 1 }}>
      <Suspense>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CustomerAccount">
          <Stack.Screen name="CustomerAccount" component={CustomerAccountScreen} />
          <Stack.Screen name="CustomerAddress" component={CustomerAddressScreen} />
          <Stack.Screen name="CustomerReferral" component={CustomerReferralScreen} />
        </Stack.Navigator>
      </Suspense>
    </View>
  );
};

export default React.memo(CustomerSignUp);
