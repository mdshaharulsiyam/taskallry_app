import AsyncStorage from '@react-native-async-storage/async-storage';
import React from "react";
import Toast from "react-native-toast-message";
import { FieldsType } from "../types/Types";
import { validateFields } from '../utils/formValidate';

export const handleProviderSignUp = (
  fields: FieldsType[],
  _setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  register: any,
  successHandler?: (email: string) => void,
) => {
  const isValid = validateFields(fields, _setFields);
  if (!isValid) {
    return isValid;
  }
  const values = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);

  // Required fields (no border changes)
  const required = ["name", "email", "phone", "password", "confirmPassword", "agree"];
  const missing = required.some((k) => !values[k] || String(values[k]).trim() === "");
  if (missing) {
    Toast.show({ type: "error", text1: "Invalid form", text2: "Please fill all required fields" });
    return false;
  }

  // Email format validation
  const email = String(values.email || "").trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    Toast.show({ type: "error", text1: "Invalid email", text2: "Please enter a valid email address" });
    return false;
  }

  // Password match validation
  const password = String(values.password || "");
  const confirmPassword = String(values.confirmPassword || "");
  if (password !== confirmPassword) {
    Toast.show({ type: "error", text1: "Password mismatch", text2: "Password and Confirm Password do not match" });
    return false;
  }

  const payload = { ...values, role: "provider" as const };

  register(payload)
    .unwrap()
    .then(async (res: any) => {
      Toast.show({
        type: "success",
        text1: "Registered successfully",
        text2: res?.message || "Provider registered successfully",
      });
      await AsyncStorage.setItem("isAddressProvided", "false");
      await AsyncStorage.setItem("isBankNumberVerified", "false");
      successHandler?.(values?.email as string);
    })
    .catch((err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to register",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};
