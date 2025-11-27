import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useVerifyCodeMutation } from "../../../redux/apis";
import Navigate from "../../../utils/Navigate";

const Verify = () => {
  const {
    params: { phoneNumber, email, from },
  } = useRoute().params as { params: { phoneNumber?: string; email?: string; from: string } };
  const { height } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  const [code, setCode] = React.useState<string>("");
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  return (
    <SafeAreaProvider backButtonText="Verify Otp">
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <View
          style={{
            flex: 1,
            gap: 6,
            justifyContent: "center",
            minHeight: height - top - bottom,
          }}
        >
          <HeaderDesign text="6-digit code" />
          <TextSecondary text="Please enter the code we've sent to your contact" />
          <OtpInput numberOfDigits={6} onTextChange={(text) => setCode(text)} />
          <ButtonBG
            style={{
              marginTop: 10,
            }}
            text="Confirm"
            disabled={isLoading}
            loading={isLoading}
            handler={() => {
              const targetEmail = (email || "").trim();
              if (!targetEmail) {
                Toast.show({ type: "error", text1: "Missing email", text2: "Email required for verification" });
                return;
              }
              verifyCode({ email: targetEmail, verifyCode: Number(code) })
                .unwrap()
                .then((res: any) => {
                  Toast.show({ type: "success", text1: "Verified", text2: res?.message || "OTP verified successfully" });
                  if (from === "forget") {
                    navigate("ResetPassword");
                    return;
                  }
                  const d = res?.data || {};
                  const role = d?.role as "provider" | "customer" | undefined;
                  if (role === "provider") {
                    if (!d?.isBankNumberVerified) {
                      navigate("ServiceSignUp", { screen: "BVN" });
                    } else if (!d?.isAddressProvided) {
                      navigate("ServiceSignUp", { screen: "Address" });
                    } else {
                      navigate("TabLayout");
                    }
                  } else if (role === "customer") {
                    if (!d?.isAddressProvided) {
                      navigate("CustomerSignUp", { screen: "CustomerAddress" });
                    } else {
                      navigate("TabLayout");
                    }
                  } else {
                    // Fallback if role missing
                    navigate("TabLayout");
                  }
                })
                .catch((err: any) => {
                  Toast.show({ type: "error", text1: "Verification failed", text2: err?.data?.message || "Invalid code" });
                });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}
  ;

export default Verify;

const styles = StyleSheet.create({});
