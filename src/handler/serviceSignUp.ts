import React from "react";
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

export const handleServiceSignUp = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  currentSlide: number
) => {
  const isValid = validateFields(fields, setFields);
  if (currentSlide !== 4) {
    return isValid;
  }
};
