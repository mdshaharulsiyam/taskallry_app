import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import RNRestart from "react-native-restart";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../../../components/ui/buttons/ButtonTransparentBG";
import Input from "../../../../components/ui/inputs/Input";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useApplyReferralCodeUseMutation } from "../../../../redux/apis";

const CustomerReferralScreen = () => {
  const navigation = useNavigation<any>();
  const [applyReferral, { isLoading }] = useApplyReferralCodeUseMutation();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const goHome = () => RNRestart.Restart();
  const onApply = async () => {
    const trimmed = code.trim();
    if (!trimmed) return goHome();
    applyReferral({ code: trimmed })
      .unwrap()
      .then((res: any) => {
        goHome()
        Toast.show({ type: "success", text1: "Referral applied", text2: res?.message || "Code applied successfully" });
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "Failed to apply code", text2: err?.data?.message || "Invalid referral code" });
      })

  };

  return (
    <SafeAreaProvider backButtonText="Tasker Sign Up">
      <HeaderDesign text="Have a Referral Code? Unlock Your Reward" style={{ marginTop: 10 }} />
      <TextSecondary text="Apply a referral code and get 10% OFF your first task – up to ₦50!" />
      <Input
        keyboard="default"
        label="Referral Code (Optional)"
        placeHolder="Enter Referral Code"
        value={code}
        handler={(_, value) => {
          setCode(value);
          setError("");
        }}
        name="referralCode"
        error={!!error}
      />
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Apply Code & Continue"
        disabled={isLoading}
        loading={isLoading}
        handler={() => { void onApply(); }}
      />
      <ButtonTransparentBG
        style={{ marginTop: 8 }}
        text="Skip & Continue Without Code"
        handler={() => goHome()}
      />
    </SafeAreaProvider>
  );
};

export default CustomerReferralScreen;
