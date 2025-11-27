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

const IdentityScreen = () => {
  const navigation = useNavigation<any>();
  const { fields, setFields } = ServiceSignUpFields();
  const [fiels, setFiels] = useState<any>([]);
  const slice = fields.slice(7, 7 + 2);

  return (
    <SafeAreaProvider backButtonText="Service Sign Up">
      <HeaderDesign text="Complete Identity Verification" style={{ marginTop: 10 }} />
      <TextSecondary text="Verify your identity with NIN or other accepted documents using Smile ID’s secure process." />
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
        handler={() => navigation.navigate("Address")}
      />
    </SafeAreaProvider>
  );
};

export default IdentityScreen;
