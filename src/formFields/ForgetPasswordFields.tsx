import { useState } from "react";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const ForgetPasswordFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "phone",
      type: FieldType.STRING,
      placeHolder: "Enter Phone Number",
      label: "Phone Number",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.NUMBER_PAD,
    },
  ]);
  return { fields, setFields };
};

export default ForgetPasswordFields;
