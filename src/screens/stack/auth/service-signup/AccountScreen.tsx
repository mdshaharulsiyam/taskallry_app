import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import { sucessNavigate } from "../../../../handler/customerSignUp";
import { handleProviderSignUp } from "../../../../handler/providerSignUp";
import SafeAreaProvider from '../../../../providers/SafeAreaProvider';
import { useRegisterMutation } from "../../../../redux/apis";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const [register, { isLoading }] = useRegisterMutation();

  const slice = fields.slice(0, 6);



  const onContinue = async () => {
    handleProviderSignUp(fields.slice(0, 6), setFields, register, (phone: string) => sucessNavigate(navigation, phone));
  };
  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Create Your Account" style={{
        marginTop: 10
      }} />
      <TextSecondary text="Create your account to start offering your services, connect with customers, and manage everything in one place." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Continue"
        disabled={isLoading}
        loading={isLoading}
        handler={() => { void onContinue(); }}
      />
    </SafeAreaProvider>
  );
};

export default AccountScreen;
