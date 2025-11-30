import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { Suspense, useCallback } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import Input from "../../../components/ui/inputs/Input";
import ForgetPasswordFields from "../../../formFields/ForgetPasswordFields";
import { handleForgetPassword } from "../../../handler/forgetPassword";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";

const ForgetPassword = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ForgetPasswordFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const phoneField = fields[0];
  const updatePhone = (value: string) =>
    setFields((prev) =>
      prev.map((field) =>
        field.name === "phone" ? { ...field, value, error: false } : field
      )
    );
  const handleSend = useCallback(() => {
    handleForgetPassword(fields, setFields);
    navigate.navigate("Verify", {
      params: { phoneNumber: fields[0].value, from: "forget" },
    } as any);
  }, [fields, navigate, setFields]);
  return (
    <SafeAreaProvider backButtonText="Forget Password">
      <Suspense>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              flex: 1,
              gap: 6,
              justifyContent: "center",
              minHeight: height - top - bottom,
            }}
          >
            <HeaderDesign text="Verify Your Phone Number" />
            <TextSecondary text="We'll send a verification code to this Phone Number to confirm your account." />
            <Input
              label="Phone Number"
              placeHolder="Enter Phone Number"
              keyboard="number-pad"
              name="phone"
              value={(phoneField?.value as string) || ""}
              handler={(_, value) => updatePhone(value)}
              error={!!phoneField?.error}
            />

            <ButtonBG
              style={{
                marginTop: 10,
              }}
              text="Send"
              handler={handleSend}
            />
          </View>
        </ScrollView>
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(ForgetPassword);

const styles = StyleSheet.create({
  forget: {
    marginLeft: "auto",
    marginTop: -24,
  },
});
