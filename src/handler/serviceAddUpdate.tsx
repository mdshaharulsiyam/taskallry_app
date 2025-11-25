import Toast from "react-native-toast-message";
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

const handleServiceAddUpdate = async (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  existingImages: string[],
  newFiles: any[],
  removedImages: string[],
  id?: string,
  createService?: any,
  updateService?: any,
  navigate?: any
) => {
  const isValid = validateFields(fields, setFields);
  if (!isValid) {
    return isValid;
  }

  const values = fields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);

  try {
    const data = {
      category: values?.category,
      title: values?.title,
      description: values?.description,
      price: Number(values?.price),
      deletedImages: removedImages,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    newFiles.forEach((file) => {
      formData.append("service_image", file);
    });
    if (id) {
      updateService(formData)
        .unwrap()
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Service updated successfully",
          });
          navigate.goBack();
        })
        .catch((error: any) => {
          Toast.show({
            type: "error",
            text1: error?.data?.message || "Failed to update service",
          });
        });
    } else {
      createService(formData)
        .unwrap()
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Service added successfully",
          });
          navigate.goBack();
        })
        .catch((error: any) => {
          Toast.show({
            type: "error",
            text1: error?.data?.message || "Failed to add service",
          });
        });
    }
  } catch (error) {
    console.log("Failed to get current location", error);
  }
};

export default handleServiceAddUpdate;




