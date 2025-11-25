import Toast from "react-native-toast-message";
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

const handleUpdateProfile = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  updateProfile: any,
  imageFile?: { uri?: string } | null,
  successHandler?: () => void
) => {
  const isValid = validateFields(fields, setFields);
  if (!isValid) {
    return isValid;
  }

  const values = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);

  const payload: any = {
    name: values.name,
    city: values.city,
    street: values.street,
  };
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));
  formData.append("profile_image", imageFile);

  updateProfile(formData)
    .unwrap()
    .then(() => {
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile has been updated successfully",
      });
      successHandler?.();
    })
    .catch((err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to update profile",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};

export default handleUpdateProfile;
