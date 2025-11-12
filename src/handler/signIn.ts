import React from "react";
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const handleSignIn = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  login: any,
  setRole: React.Dispatch<React.SetStateAction<"user" | "service" | null>>,
  sucessHandler?: () => void
) => {
  const isValid = validateFields(fields, setFields);
  if (!isValid) {
    return isValid;
  }
  const values = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);
  login(values)
    .unwrap()
    .then(async (res: any) => {
      if (res?.data?.role === "customer") {
        setRole("user");
      } else {
        setRole("service");
      }

      Toast.show({
        type: "success",
        text1: "Login successfully",
        text2: res?.message || `${res?.data?.role} logged in successfully`,
      });
      await AsyncStorage.setItem("token", res?.data?.accessToken);
      await AsyncStorage.setItem("role", res?.data?.role);
      sucessHandler?.();
    })
    .catch((err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to login",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};
