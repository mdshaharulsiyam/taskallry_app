import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../../../components/ui/buttons/ButtonTransparentBG";
import CustomerSignUpFields from "../../../../formFields/CustomerSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const CustomerReferralScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = CustomerSignUpFields();
  const slice = fields.slice(8, 8 + 1);

  return (
    <SafeAreaProvider backButtonText="Customer Sign Up">
      <HeaderDesign text="Have a Referral Code? Unlock Your Reward" style={{ marginTop: 10 }} />
      <TextSecondary text="Apply a referral code and get 10% OFF your first task – up to ₦50!" />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Apply Code & Continue"
        handler={() => navigation.navigate("Verify", { params: { phoneNumber: "", from: "signup" } })}
      />
      <ButtonTransparentBG
        style={{ marginTop: 8 }}
        text="Skip & Continue Without Code"
        handler={() => navigation.navigate("Verify", { params: { phoneNumber: "", from: "signup" } })}
      />
    </SafeAreaProvider>
  );
};

export default CustomerReferralScreen;
