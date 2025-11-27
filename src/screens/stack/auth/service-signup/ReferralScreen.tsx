import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../../../components/ui/buttons/ButtonTransparentBG";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const ReferralScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const slice = fields.slice(11, 11 + 1);

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Have a Referral Code? Unlock Your Reward" />
      <TextSecondary text="Use a referral code and earn 10% EXTRA payout on your first Completed task (done within 48 hours)!" />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Apply Code & Continue"
        handler={() => navigation.navigate("Finish")}
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
