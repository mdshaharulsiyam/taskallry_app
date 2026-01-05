import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { Image, View } from "react-native";
import Toast from 'react-native-toast-message';
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../../../components/ui/file/ImageUploader";
import DatePicker from "../../../../components/ui/inputs/DatePicker";
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({
    documentType: "",
    idNumber: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });

  const documentOptions = useMemo(
    () => [
      { label: "National Identification Number (NIN)", value: "NATIONAL_ID" },
      { label: "Voter’s Card", value: "VOTER_ID" },
      { label: "International Passport", value: "PASSPORT" },
      { label: "Driver’s License", value: "DRIVER_LICENSE" },
    ],
    []
  );

  const onContinue = async () => {
    const nextErrors = {
      documentType: "",
      idNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    };
    let hasError = false;
    if (!firstName.trim()) {
      nextErrors.firstName = "Enter first name";
      hasError = true;
    }
    if (!lastName.trim()) {
      nextErrors.lastName = "Enter last name";
      hasError = true;
    }
    if (!dateOfBirth) {
      nextErrors.dateOfBirth = "Select date of birth";
      hasError = true;
    }
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
    const data = {
      "first_name": firstName.trim(),
      "last_name": lastName.trim(),
      "dob": dateOfBirth,
      "id_number": idNumber.trim(),
      "identificationDocumentType": documentType
    }
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    formdata.append("identification_document", fiels[fiels?.length - 1]);
    completeIdentity(formdata)
      .unwrap()
      .then(async () => {
        await AsyncStorage.removeItem("isIdentificationDocumentVerified");
        navigation.navigate("Address");
        Toast.show({ type: "success", text1: "Verification successful", text2: "Redirecting to next step" });
      })
      .catch((err: any) => {
        console.log(err);
        Toast.show({ type: "error", text1: "Verification failed", text2: err?.data?.message || "Please try again" });
      });
  };

  return (
    <SafeAreaProvider backButtonText="Freelancer Sign Up">
      <HeaderDesign text="Complete Identity Verification" style={{ marginTop: 10 }} />
      <TextSecondary text="Verify your identity with NIN or other accepted documents using Smile ID’s secure process." />
      <Input
        keyboard="default"
        label="First Name"
        placeHolder="Enter First Name"
        value={firstName}
        handler={(_, value) => setFirstName(value)}
        name="firstName"
        error={!!errors.firstName}
      />
      <Input
        keyboard="default"
        label="Last Name"
        placeHolder="Enter Last Name"
        value={lastName}
        handler={(_, value) => setLastName(value)}
        name="lastName"
        error={!!errors.lastName}
      />
      <DatePicker
        label="Date of Birth"
        placeHolder="Select Date of Birth"
        value={dateOfBirth}
        handler={(_, value) => setDateOfBirth(value)}
        name="dateOfBirth"
        required
        error={!!errors.dateOfBirth}
      />
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
        style={{ marginTop: 12, marginBottom: 160 }}
        text="Continue"
        disabled={isLoading}
        loading={isLoading}
        handler={() => { void onContinue(); }}
      />
    </SafeAreaProvider>
  );
};

export default IdentityScreen;
