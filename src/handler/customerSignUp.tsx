import React from "react";
import Toast from "react-native-toast-message";
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";
export const sucessNavigate = (navigate: any, phone: string) => {
  navigate("Verify", {
    params: { phoneNumber: phone, from: "signup" },
  });
};

export const handleCustomerSignUp = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  currentSlide: number,
  register: any,
  slide: { skip: number, keep: number, field: string }[],
  completedStep: { signup: boolean, isAddressProvided: boolean, coupon: boolean },
  sucessHandler?: (phone: string) => void,
) => {
  console.log(slide);
  const isValid = validateFields(fields, setFields);
  if (currentSlide !== 2 && !isValid) {
    return isValid;
  }
  const values = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);
  register({ ...values, role: "customer" })
    .unwrap()
    .then((res: any) => {
      Toast.show({
        type: "success",
        text1: "Registered successfully",
        text2: res?.message || "User registered successfully",
      });
      sucessHandler?.(values?.phone);
    })
    .catch((err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to register",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};
