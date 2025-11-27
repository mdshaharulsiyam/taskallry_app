import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const BVNScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const slice = fields.slice(6, 6 + 1);

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Verify Your BVN" style={{ marginTop: 10 }} />
      <TextSecondary text="Enter your 11-digit Bank Verification Number (BVN) for identity confirmation." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Verify"
        handler={() => navigation.navigate("Identity")}
      />
    </SafeAreaProvider>
  );
};

export default BVNScreen;
