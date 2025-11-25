import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { OtpInput } from "react-native-otp-entry";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import Navigate from "../../../utils/Navigate";

const Verify = () => {
  const {
    params: { phoneNumber, from },
  } = useRoute().params as { params: { phoneNumber: string; from: string } };
  const { height } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  const [code, setCode] = React.useState<string>("");
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
          <TextSecondary text="Please enter the code we've sent to your Phone Number" />
          <OtpInput numberOfDigits={6} onTextChange={(text) => setCode(text)} />
          <ButtonBG
            style={{
              marginTop: 10,
            }}
            text="Confirm"
            handler={() => {
              if (from === "forget") {
                navigate("ResetPassword");
              } else {
                navigate("TrustedServices");
              }
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

export default Verify;

const styles = StyleSheet.create({});
