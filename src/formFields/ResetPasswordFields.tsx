import { useState } from "react";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const ResetPasswordFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "password",
      type: FieldType.PASSWORD,
      placeHolder: "******",
      label: "New Password",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "confirmPassword",
      type: FieldType.PASSWORD,
      placeHolder: "******",
      label: "New Confirm password",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  return { fields, setFields };
};

export default ResetPasswordFields;
