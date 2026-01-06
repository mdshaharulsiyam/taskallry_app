import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { Suspense, useCallback, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import PhoneInput, { PhoneCountryCode } from "../../../components/ui/inputs/PhoneInput";
import ForgetPasswordFields from "../../../formFields/ForgetPasswordFields";
import { handleForgetPassword } from "../../../handler/forgetPassword";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useForgetPasswordMutation } from "../../../redux/apis";

const ForgetPassword = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ForgetPasswordFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = useNavigation<NavigationProp<ParamListBase>>();
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();
  const phoneField = fields[0];
  const [phoneMeta, setPhoneMeta] = useState<{
    country: PhoneCountryCode;
    dialCode: string;
    number: string;
  }>({
    country: "US",
    dialCode: "+1",
    number: "",
  });

  const updatePhoneValue = (dialCode: string, number: string) => {
    const formatted = number ? `${dialCode}${number}` : "";
    setFields((prev) =>
      prev.map((field) =>
        field.name === "phone" ? { ...field, value: formatted, error: false } : field
      )
    );
  };

  const handleSend = useCallback(() => {
    const isValid = handleForgetPassword(fields, setFields);
    if (!isValid) return;

    const trimmedPhone = (fields?.find((field) => field.name === "phone")?.value as string)?.trim() || "";
    forgetPassword({ phone: trimmedPhone })
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "OTP sent",
          text2: res?.message || "Check your phone for the verification code",
        });
        navigate.navigate("Verify", {
          params: { phoneNumber: trimmedPhone, from: "forget" },
        } as any);
      })
      .catch((err: any) => {
        Toast.show({
          type: "error",
          text1: "Request failed",
          text2: err?.data?.message || "Unable to send reset code",
        });
      });
  }, [fields, forgetPassword, navigate, setFields]);
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
            <PhoneInput
              country={phoneMeta.country}
              number={phoneMeta.number}
              onChange={({ country, dialCode, number }) => {
                setPhoneMeta({ country, dialCode, number });
                updatePhoneValue(dialCode, number);
              }}
              error={!!phoneField?.error}
              countryError={!!phoneField?.error}
              placeholder={phoneField?.placeHolder}
              label={phoneField?.label}
            />

            <ButtonBG
              style={{
                marginTop: 10,
              }}
              text="Send"
              handler={handleSend}
              disabled={isLoading}
              loading={isLoading}
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
