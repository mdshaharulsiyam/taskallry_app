import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import Input from "../../../../components/ui/inputs/Input";
import InputCheckbox from "../../../../components/ui/inputs/InputCheckbox";
import PasswordInput from "../../../../components/ui/inputs/PasswordInput";
import PhoneInput, { PhoneCountryCode } from "../../../../components/ui/inputs/PhoneInput";
import { sucessNavigate } from "../../../../handler/customerSignUp";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useRegisterMutation } from "../../../../redux/apis";

const AccountScreen = () => {
  const navigation = useNavigation<any>();
  const [register, { isLoading }] = useRegisterMutation();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });
  const [phoneMeta, setPhoneMeta] = useState<{
    country: PhoneCountryCode;
    number: string;
    dialCode: string;
  }>({
    country: "US",
    number: "",
    dialCode: "+1",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  const setFieldValue = useCallback((name: keyof typeof formState, value: string | boolean) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validate = () => {
    let hasError = false;
    const nextErrors = { ...errors };
    const requiredFields: (keyof typeof formState)[] = [
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

    requiredFields.forEach((field) => {
      const value = formState[field];
      if (!value || (typeof value === "string" && value.trim() === "")) {
        nextErrors[field] = "Required";
        hasError = true;
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email.trim())) {
      nextErrors.email = "Enter a valid email";
      hasError = true;
    }

    if (formState.password !== formState.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
      hasError = true;
    }

    if (!formState.agree) {
      nextErrors.agree = "Please accept the terms";
      hasError = true;
    }

    setErrors(nextErrors);
    return !hasError;
  };

  const onContinue = async () => {
    if (!validate()) return;
    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      agree: formState.agree,
      role: "provider" as const,
    };

    register(payload)
      .unwrap()
      .then(async (res: any) => {
        await AsyncStorage.setItem("isBankNumberVerified", "false");
        await AsyncStorage.setItem("isAddressProvided", "false");
        await AsyncStorage.setItem("isIdentificationDocumentVerified", "false");
        void sucessNavigate(navigation, payload.email);
      })
      .catch(() => { });
  };
  return (
    <SafeAreaProvider backButtonText="Freelancer Sign Up">
      <HeaderDesign
        text="Create Your Account"
        style={{
          marginTop: 10,
        }}
      />
      <TextSecondary text="Create your account to start offering your services, connect with customers, and manage everything in one place." />
      <Input
        keyboard="default"
        label="Full Name"
        placeHolder="Enter Full Name"
        value={formState.name}
        handler={(_, value) => setFieldValue("name", value)}
        name="name"
        error={!!errors.name}
      />
      <Input
        keyboard="email-address"
        label="Email Address"
        placeHolder="Enter Email Address"
        value={formState.email}
        handler={(_, value) => setFieldValue("email", value)}
        name="email"
        error={!!errors.email}
      />
      <PhoneInput
        country={phoneMeta.country}
        number={phoneMeta.number}
        onChange={({ country, dialCode, number }) => {
          setPhoneMeta({ country, dialCode, number });
          setFieldValue("phone", number ? `${dialCode}${number}` : "");
        }}
        error={!!errors.phone}
        countryError={!!errors.phone}
      />
      <PasswordInput
        keyboard="default"
        label="Password"
        placeHolder="******"
        value={formState.password}
        handler={(name, value) => setFieldValue("password", value)}
        name="password"
        error={!!errors.password}
      />
      <PasswordInput
        keyboard="default"
        label="Confirm Password"
        placeHolder="******"
        value={formState.confirmPassword}
        handler={(name, value) => setFieldValue("confirmPassword", value)}
        name="confirmPassword"
        error={!!errors.confirmPassword}
      />
      <InputCheckbox
        label="I agree to the terms and conditions"
        value={formState.agree}
        handler={(name, value) => setFieldValue("agree", value)}
        name="agree"
      />
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Continue"
        disabled={isLoading}
        loading={isLoading}
        handler={() => {
          void onContinue();
        }}
      />
    </SafeAreaProvider>
  );
};

export default AccountScreen;
