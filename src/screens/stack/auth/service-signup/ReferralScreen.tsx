import { useNavigation } from "@react-navigation/native";
import React from "react";
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
  const slice = fields.slice(11, 11 + 1);
  const [applyReferral, { isLoading }] = useApplyReferralCodeUseMutation();
  const getValue = (name: string) => fields.find(f => f.name === name)?.value as string;

  const onApply = async () => {
    const code = getValue("referralCode");
    if (!code) return navigation.navigate("Finish");
    try {
      await applyReferral({ code }).unwrap();
    } catch (e) {
      // ignore failure and continue
    }
    navigation.navigate("Finish");
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
