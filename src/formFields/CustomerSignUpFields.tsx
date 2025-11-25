import { useState } from "react";
import { StyleSheet } from "react-native";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const CustomerSignUpFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "name",
      type: FieldType.STRING,
      placeHolder: "Enter Full Name",
      label: "Full Name",
      error: false,
      value: "siyam",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "email",
      type: FieldType.STRING,
      placeHolder: "Enter Email Address",
      label: "Email Address",
      error: false,
      value: "siyamoffice0273@gmail.com",
      required: true,
      keyboard: KeyboardType.EMAIL_ADDRESS,
    },
    {
      name: "phone",
      type: FieldType.STRING,
      placeHolder: "Enter Phone Number",
      label: "Phone Number",
      error: false,
      value: "1234567890",
      required: true,
      keyboard: KeyboardType.PHONE_PAD,
    },
    {
      name: "password",
      type: FieldType.PASSWORD,
      placeHolder: "******",
      label: "Password",
      error: false,
      value: "123456",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "confirmPassword",
      type: FieldType.PASSWORD,
      placeHolder: "******",
      label: "Confirm Password",
      error: false,
      value: "123456",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "agree",
      type: FieldType.CHECKBOX,
      placeHolder: "",
      label: "I agree to the terms and conditions",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "address",
      type: FieldType.STRING,
      placeHolder: "Enter Street Address",
      label: "Street Address",
      error: false,
      value: "123 Main St",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "city",
      type: FieldType.STRING,
      placeHolder: "Enter City / LGA",
      label: "City / LGA",
      error: false,
      value: "New York",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "referralCode",
      type: FieldType.STRING,
      placeHolder: "Enter Referral Code (Optional)",
      label: "Referral Code (Optional)",
      error: false,
      value: "",
      required: false,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  return { fields, setFields };
};

export default CustomerSignUpFields;

const styles = StyleSheet.create({});
