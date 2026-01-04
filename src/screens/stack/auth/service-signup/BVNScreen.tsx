import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import DatePicker from "../../../../components/ui/inputs/DatePicker";
import Input from "../../../../components/ui/inputs/Input";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useCompleteIdentityVerificationMutation } from "../../../../redux/apis";

const DOCUMENT_TYPE = "BVN";

const BVNScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [verifyBvn, { isLoading }] = useCompleteIdentityVerificationMutation();
  const [bvn, setBvn] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState({
    bvn: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
  });
  const fromScreen = route?.params?.from;
  const handleChange = useCallback((_: string, value: string) => {
    setBvn(value);
    setErrors((prev) => ({ ...prev, bvn: "" }));
  }, []);

  const onVerify = async () => {
    const nextErrors = {
      bvn: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    };
    let hasError = false;
    const trimmed = bvn.trim();
    if (trimmed.length !== 11 || !/^\d{11}$/.test(trimmed)) {
      nextErrors.bvn = "BVN must be 11 digits";
      hasError = true;
    }
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
    setErrors(nextErrors);
    if (hasError) return;
    const data = {
      "first_name": firstName.trim(),
      "last_name": lastName.trim(),
      "dob": dateOfBirth,
      "id_number": trimmed,
      "identificationDocumentType": DOCUMENT_TYPE
    }
    const formdata = new FormData();
    formdata.append("data", JSON.stringify(data));
    verifyBvn(formdata)
      .unwrap()
      .then(async (res: any) => {
        await AsyncStorage.removeItem("isBankNumberVerified");
        Toast.show({ type: "success", text1: "BVN verified", text2: res?.message || "Verification successful" });
        if (fromScreen === "SavedAccount") {
          navigation.navigate("SavedAccount");
          return;
        }
        navigation.navigate("Identity");
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "BVN verification failed", text2: err?.data?.message || "Something went wrong" });
      });
  };

  return (
    <SafeAreaProvider backButtonText="Freelancer Sign Up">
      <HeaderDesign text="Verify Your BVN" style={{ marginTop: 10 }} />
      <TextSecondary text="Enter your 11-digit Bank Verification Number (BVN) for identity confirmation." />
      <Input
        keyboard="number-pad"
        label="Bank Verification Number (BVN)"
        placeHolder="Enter BVN"
        value={bvn}
        handler={handleChange}
        name="bvn"
        error={!!errors.bvn}
        onBlur={() => {
          if (bvn.trim() && (bvn.trim().length !== 11 || !/^\d{11}$/.test(bvn.trim()))) {
            setErrors((prev) => ({ ...prev, bvn: "BVN must be 11 digits" }));
          }
        }}
      />
      <Input
        keyboard="default"
        label="First Name"
        placeHolder="Enter First Name"
        value={firstName}
        handler={(_, value) => {
          setFirstName(value);
          setErrors((prev) => ({ ...prev, firstName: "" }));
        }}
        name="firstName"
        error={!!errors.firstName}
      />
      <Input
        keyboard="default"
        label="Last Name"
        placeHolder="Enter Last Name"
        value={lastName}
        handler={(_, value) => {
          setLastName(value);
          setErrors((prev) => ({ ...prev, lastName: "" }));
        }}
        name="lastName"
        error={!!errors.lastName}
      />
      <DatePicker
        label="Date of Birth"
        placeHolder="Select Date of Birth"
        value={dateOfBirth}
        handler={(_, value) => {
          setDateOfBirth(value);
          setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
        }}
        name="dateOfBirth"
        required
        error={!!errors.dateOfBirth}
      />
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
