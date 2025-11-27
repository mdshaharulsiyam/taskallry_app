import { useNavigation } from "@react-navigation/native";
import React from "react";
import Toast from "react-native-toast-message";
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
    const bvn = String(getValue("bvn") || "");
    verifyBvn({ bvn })
      .unwrap()
      .then((res: any) => {
        Toast.show({ type: "success", text1: "BVN verified", text2: res?.message || "Verification successful" });
        navigation.navigate("Address");
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "BVN verification failed", text2: err?.data?.message || "Something went wrong" });
      });
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
        loading={isLoading}
        handler={() => { void onVerify(); }}
      />
    </SafeAreaProvider>
  );
};

export default BVNScreen;
