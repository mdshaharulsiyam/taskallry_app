import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import Input from "../../../../components/ui/inputs/Input";
import InputCheckbox from "../../../../components/ui/inputs/InputCheckbox";
import PasswordInput from "../../../../components/ui/inputs/PasswordInput";
import { sucessNavigate } from "../../../../handler/customerSignUp";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useRegisterMutation } from "../../../../redux/apis";

const CustomerAccountScreen = () => {
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
    const nextErrors = { ...errors };
    let hasError = false;

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
    if (formState.email && !emailRegex.test(formState.email.trim())) {
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
    register({
      name: formState.name.trim(),
      email: formState.email.trim(),
      phone: formState.phone.trim(),
      password: formState.password,
      confirmPassword: formState.confirmPassword,
      role: "customer",
    })
      .unwrap()
      .then(async (res: any) => {
        Toast.show({ type: "success", text1: "Account created", text2: res?.message || "Customer registered successfully" });
        await AsyncStorage.setItem("isAddressProvided", "false");
        sucessNavigate(navigation, formState.email.trim());
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "Failed to create account", text2: err?.data?.message || "Something went wrong" });
      });
  };

  return (
    <SafeAreaProvider backButtonText="Customer Sign Up">
      <HeaderDesign text="Create Your Account" style={{ marginTop: 10 }} />
      <TextSecondary text="Join our community to easily find and book the services you need, with a smooth and personalized experience from start to finish." />
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
      <Input
        keyboard="phone-pad"
        label="Phone Number"
        placeHolder="Enter Phone Number"
        value={formState.phone}
        handler={(_, value) => setFieldValue("phone", value)}
        name="phone"
        error={!!errors.phone}
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
        handler={() => { void onContinue(); }}
      />
    </SafeAreaProvider>
  );
};

export default CustomerAccountScreen;

