import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../../../components/ui/file/ImageUploader";
import Input from "../../../../components/ui/inputs/Input";
import SelectInput from "../../../../components/ui/inputs/SelectInput";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useCompleteIdentityVerificationMutation } from "../../../../redux/apis";

const IdentityScreen = () => {
  const navigation = useNavigation<any>();
  const [fiels, setFiels] = useState<any>([]);
  const [completeIdentity, { isLoading }] = useCompleteIdentityVerificationMutation();
  const [documentType, setDocumentType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [errors, setErrors] = useState({ documentType: "", idNumber: "" });

  const documentOptions = useMemo(
    () => [
      { label: "National Identification Number (NIN)", value: "NIN" },
      { label: "Voter’s Card", value: "voters_card" },
      { label: "International Passport", value: "international_passport" },
      { label: "Driver’s License", value: "drivers_license" },
    ],
    []
  );

  const onContinue = async () => {
    const nextErrors = { documentType: "", idNumber: "" };
    let hasError = false;
    if (!documentType) {
      nextErrors.documentType = "Select a document";
      hasError = true;
    }
    if (!idNumber.trim()) {
      nextErrors.idNumber = "Enter ID number";
      hasError = true;
    }
    setErrors(nextErrors);
    if (hasError) return;

    try {
      await completeIdentity({
        documentType,
        idNumber: idNumber.trim(),
      }).unwrap();
      navigation.navigate("Address");
    } catch (e) {
      // handle error if needed
    }
  };

  return (
    <SafeAreaProvider backButtonText="Freelancer Sign Up">
      <HeaderDesign text="Complete Identity Verification" style={{ marginTop: 10 }} />
      <TextSecondary text="Verify your identity with NIN or other accepted documents using Smile ID’s secure process." />
      <SelectInput
        label="Select Identification Document"
        placeHolder="Select Identification Document"
        options={documentOptions}
        value={documentType}
        handler={(name, value) => setDocumentType(value as string)}
        name="documentType"
        required
        error={!!errors.documentType}
      />
      <Input
        keyboard="default"
        label="Enter ID Number"
        placeHolder="Enter ID Number"
        value={idNumber}
        handler={(_, value) => setIdNumber(value)}
        name="idNumber"
        error={!!errors.idNumber}
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
        handler={() => { void onContinue(); }}
      />
    </SafeAreaProvider>
  );
};

export default IdentityScreen;
