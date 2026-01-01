import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, View } from "react-native";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../../../components/ui/file/ImageUploader";
import LocationInput from "../../../../components/ui/inputs/LocationInput";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useUpdateProfileMutation } from "../../../../redux/apis";

const CustomerAddressScreen = () => {
  const navigation = useNavigation<any>();
  const [address, setAddress] = useState("");
  const [fiels, setFiels] = useState<any>([]);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const onContinue = async () => {
    const trimmed = (address || "").trim();
    if (!trimmed) {
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
    form.append("data", JSON.stringify({ address: trimmed }));
    form.append("address_document", {
      uri: fileUri,
      name,
      type,
    } as any);

    updateProfile(form as any)
      .unwrap()
      .then(async (res: any) => {
        Toast.show({ type: "success", text1: "Address saved", text2: res?.message || "Profile updated" });
        await AsyncStorage.removeItem("isAddressProvided")
        navigation.navigate("CustomerReferral");
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "Failed to save address", text2: err?.data?.message || "Something went wrong" });
      });
  };

  return (
    <SafeAreaProvider backButtonText="Tasker Sign Up">
      <HeaderDesign text="Provide Your Address" style={{ marginTop: 10 }} />
      <TextSecondary text="Please provide your valid address, and verify it to confirm your identity." />
      <LocationInput
        label="Address"
        placeHolder="Enter Address"
        value={address}
        handler={(_, value) => setAddress(value)}
        name="address"
      />
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

export default CustomerAddressScreen;
