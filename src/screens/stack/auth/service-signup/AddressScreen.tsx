import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, View } from "react-native";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../../../components/ui/file/ImageUploader";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useUpdateProfileMutation } from "../../../../redux/apis";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const AddressScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const [fiels, setFiels] = useState<any>([]);

  const slice = fields.filter((f) => ["address"].includes(f.name));

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const getValue = (name: string) => fields.find(f => f.name === name)?.value as string;

  const onContinue = async () => {
    const address = (getValue("address") || "").trim();
    if (!address) {
      Toast.show({ type: "error", text1: "Address required", text2: "Please select or enter your address" });
      return;
    }
    if (!fiels?.[0]?.uri) {
      Toast.show({ type: "error", text1: "Document required", text2: "Please upload your address document" });
      return;
    }

    const fileUri = fiels?.[fiels?.length - 1]?.uri as string;
    const name = fileUri.split("/").pop() || "address_document.jpg";
    const ext = (name.split(".").pop() || "jpg").toLowerCase();
    const type = ext === "png" ? "image/png" : ext === "pdf" ? "application/pdf" : "image/jpeg";

    const form = new FormData();
    form.append("data", JSON.stringify({ address }));
    form.append("address_document", {
      uri: fileUri,
      name,
      type,
    } as any);

    updateProfile(form as any)
      .unwrap()
      .then((res: any) => {
        Toast.show({ type: "success", text1: "Address saved", text2: res?.message || "Profile updated" });
        navigation.navigate("Referral");
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "Failed to save address", text2: err?.data?.message || "Something went wrong" });
      });
  };

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Provide Your Address" style={{ marginTop: 10 }} />
      <TextSecondary text="Please provide your valid address, and verify it to confirm your identity." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
      <View style={{ marginTop: 8 }}>
        <TextSecondary text={`Location: ${getValue("address") || ""}`} />
      </View>
      <View style={{ marginTop: 10 }}>
        {fiels?.length > 0 && (
          <Image
            source={{ uri: fiels?.[0]?.uri }}
            style={{ width: 80, height: 80, borderRadius: 8, marginRight: 8, resizeMode: "contain" }}
          />
        )}
        <ImageUploader setFiels={setFiels} />
      </View>
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

export default AddressScreen;
