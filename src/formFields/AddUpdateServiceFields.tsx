import { useState } from "react";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const AddUpdateServiceFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "title",
      type: FieldType.STRING,
      placeHolder: "Enter Service Title",
      label: "Service Title",
      error: false,
      value: "user@gmail.com",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "price",
      type: FieldType.STRING,
      placeHolder: "Enter Starting Price",
      label: "Starting Price",
      error: false,
      value: "123456",
      required: true,
      keyboard: KeyboardType.NUMERIC,
    },
    {
      name: "category",
      type: FieldType.SELECT,
      placeHolder: "Service Category",
      label: "Service Category",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
      options: [
        { label: "options 1", value: "options 1" },
        { label: "options 2", value: "options 2" },
      ],
    },
    {
      name: "descriptions",
      type: FieldType.TEXTAREA,
      placeHolder: "Enter Service Description",
      label: "Service Description",
      error: false,
      value: "user@gmail.com",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  return { fields, setFields };
};

export default AddUpdateServiceFields;
