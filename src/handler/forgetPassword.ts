import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

export const handleForgetPassword = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>
) => validateFields(fields, setFields);
