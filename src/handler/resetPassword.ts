import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

export const handleResetPassword = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>
) => validateFields(fields, setFields);
