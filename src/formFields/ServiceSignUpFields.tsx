import { useState } from "react";
import { StyleSheet } from "react-native";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const ServiceSignUpFields = () => {
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
      name: "bvn",
      type: FieldType.STRING,
      placeHolder: "Enter Bank Verification Number (BVN)",
      label: "Bank Verification Number (BVN)",
      error: false,
      value: "1252",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "documentType",
      type: FieldType.SELECT,
      placeHolder: "Select Identification Document",
      label: "Select Identification Document",
      error: false,
      value: "255",
      required: true,
      keyboard: KeyboardType.DEFAULT,
      options: [
        {
          label: "National Identification Number (NIN)",
          value: "National Identification Number (NIN)",
        },
        { label: "Voter’s Card", value: "Voter’s Card" },
        { label: "International Passport", value: "international_passport" },
        { label: "Driver’s License", value: "Driver’s License" },
      ],
    },
    {
      name: "bvn_id",
      type: FieldType.STRING,
      placeHolder: "Enter ID Number",
      label: "Enter ID Number",
      error: false,
      value: "258",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "address",
      type: FieldType.LOCATION,
      placeHolder: "Enter Address",
      label: "Address",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "referralCode",
      type: FieldType.STRING,
      placeHolder: "Enter Referral Code (Optional)",
      label: "Referral Code (Optional)",
      error: false,
      value: "685",
      required: false,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  return { fields, setFields };
};

export default ServiceSignUpFields;

const styles = StyleSheet.create({});
