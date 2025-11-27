import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from '../../../../providers/SafeAreaProvider';
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();

  const slice = fields.slice(0, 6);

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
        handler={() => navigation.navigate("BVN")}
      />
    </SafeAreaProvider>
  );
};

export default AccountScreen;
