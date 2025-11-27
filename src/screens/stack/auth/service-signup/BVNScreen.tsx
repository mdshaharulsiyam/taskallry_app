import { useNavigation } from "@react-navigation/native";
import React from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useVerifyBvnMutation } from "../../../../redux/apis";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const BVNScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const [verifyBvn, { isLoading }] = useVerifyBvnMutation();
  const slice = fields.slice(6, 6 + 1);

  const getValue = (name: string) => fields.find(f => f.name === name)?.value as string;

  const onVerify = async () => {
    try {
      await verifyBvn({ bvn: getValue("bvn") }).unwrap();
      navigation.navigate("Identity");
    } catch (e) {
      // handle error if needed
    }
  };

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Verify Your BVN" style={{ marginTop: 10 }} />
      <TextSecondary text="Enter your 11-digit Bank Verification Number (BVN) for identity confirmation." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Verify"
        disabled={isLoading}
        handler={() => { void onVerify(); }}
      />
    </SafeAreaProvider>
  );
};

export default BVNScreen;
