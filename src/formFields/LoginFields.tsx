import { useState } from "react";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const LoginFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "email",
      type: FieldType.STRING,
      placeHolder: "Enter Email Address",
      label: "Email Address",
      error: false,
      value: "user@gmail.com",
      required: true,
      keyboard: KeyboardType.EMAIL_ADDRESS,
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
      name: "remember",
      type: FieldType.CHECKBOX,
      placeHolder: "",
      label: "Remember me",
      error: false,
      value: "",
      required: false,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  return { fields, setFields };
};

export default LoginFields;
