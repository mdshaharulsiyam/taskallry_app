import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import CustomerSignUpFields from "../../../../formFields/CustomerSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useRegisterMutation } from "../../../../redux/apis";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const CustomerAccountScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = CustomerSignUpFields();
  const [register, { isLoading }] = useRegisterMutation();
  const slice = fields.slice(0, 6);

  const getValue = (name: string) => fields.find(f => f.name === name)?.value as string;

  const onContinue = async () => {
    const password = getValue("password");
    const confirmPassword = getValue("confirmPassword");
    if (password !== confirmPassword) return;
    try {
      await register({
        name: getValue("name"),
        email: getValue("email"),
        phone: getValue("phone"),
        password,
        confirmPassword,
        role: "customer",
      }).unwrap();
      navigation.navigate("CustomerAddress");
    } catch (e) {
      // handle error UI if needed
    }
  };

  return (
    <SafeAreaProvider backButtonText="Customer Sign Up">
      <HeaderDesign text="Create Your Account" style={{ marginTop: 10 }} />
      <TextSecondary text="Join our community to easily find and book the services you need, with a smooth and personalized experience from start to finish." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Continue"
        disabled={isLoading}
        handler={() => { void onContinue(); }}
      />
    </SafeAreaProvider>
  );
};

export default CustomerAccountScreen;

