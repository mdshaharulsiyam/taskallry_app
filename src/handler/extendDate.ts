import Toast from "react-native-toast-message";
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

export const handleExtendDate = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  taskId: string,
  createExtensionRequest: any,
  navigation: any
) => {
  const isValid = validateFields(fields, setFields);
  if (!isValid) {
    return isValid;
  }

  const values = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);

  const date = values?.date as string;
  const time = values?.time as string;
  const reason = (values?.reason as string) || "";

  const newDateTime = `${date}T${time}:00.000Z`;
  createExtensionRequest({
    "task": taskId,
    "requestedDateTime": newDateTime,
    "reason": reason
  })
    .unwrap()
    .then((res: any) => {
      Toast.show({
        type: "success",
        text1: "Extension requested successfully",
        text2: res?.message || "Your extension request has been submitted",
      });

      navigation.goBack();
      setFields(fields.map((field) => ({ ...field, value: "" })));
    })
    .catch((err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to request extension",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};
