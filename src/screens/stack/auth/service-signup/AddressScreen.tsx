import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, View } from "react-native";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../../../components/ui/file/ImageUploader";
import ServiceSignUpFields from "../../../../formFields/ServiceSignUpFields";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../../types/Types";
import { RenderField } from "../../../../utils/RenderField";

const AddressScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const [fiels, setFiels] = useState<any>([]);
  const slice = fields.slice(9, 9 + 2);

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Provide Your Address" style={{ marginTop: 10 }} />
      <TextSecondary text="Please provide your valid address, and verify it to confirm your identity." />
      {slice.map((field: FieldsType) => RenderField(field, setFields))}
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
        handler={() => navigation.navigate("Referral")}
      />
    </SafeAreaProvider>
  );
};

export default AddressScreen;
