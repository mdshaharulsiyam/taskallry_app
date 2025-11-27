import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import CustomerSignUpFields from "../../../../formFields/CustomerSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const CustomerAccountScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = CustomerSignUpFields();
  const slice = fields.slice(0, 6);

  return (
    <SafeAreaProvider backButtonText="Customer Sign Up">
      <HeaderDesign text="Create Your Account" style={{ marginTop: 10 }} />
      <TextSecondary text="Join our community to easily find and book the services you need, with a smooth and personalized experience from start to finish." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Continue"
        handler={() => navigation.navigate("CustomerAddress")}
      />
    </SafeAreaProvider>
  );
};

export default CustomerAccountScreen;
