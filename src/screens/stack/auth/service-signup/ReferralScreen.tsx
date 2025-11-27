import { useNavigation } from "@react-navigation/native";
import React from "react";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../../../components/ui/buttons/ButtonTransparentBG";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useApplyReferralCodeUseMutation } from "../../../../redux/apis";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const ReferralScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const slice = fields.slice(10, 10 + 1);
  const [applyReferral, { isLoading }] = useApplyReferralCodeUseMutation();
  const getValue = (name: string) => fields.find(f => f.name === name)?.value as string;

  const onApply = async () => {
    const code = getValue("referralCode");
    if (!code) return navigation.navigate("Finish");
    applyReferral({ code })
      .unwrap()
      .then((res: any) => {
        Toast.show({ type: "success", text1: "Referral applied", text2: res?.message || "Code applied successfully" });
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "Failed to apply code", text2: err?.data?.message || "Invalid referral code" });
      })
      .finally(() => {
        navigation.navigate("TabLayout");
      });
  };

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Have a Referral Code? Unlock Your Reward" />
      <TextSecondary text="Use a referral code and earn 10% EXTRA payout on your first Completed task (done within 48 hours)!" />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
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
        handler={() => navigation.navigate("Finish")}
      />
    </SafeAreaProvider>
  );
};

export default ReferralScreen;
