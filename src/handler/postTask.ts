import React from "react";
import Toast from 'react-native-toast-message';
import { FieldsType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

export const handlePostTask = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  currentSlide: number,
  allFields: FieldsType[],
  create: any,
  files: any
) => {
  const isValid = validateFields(fields, setFields);
  if (!isValid || currentSlide != 3) {
    return isValid;
  }
  const values = allFields.reduce((acc, field) => {
    acc[field.name] = field.value;
    return acc;
  }, {} as any);
  console.log({ values, isValid, files });
  const latino = values?.place?.split("|")?.[1]
    ? JSON.parse(values?.place?.split("|")?.[1])
    : { lat: 0, lng: 0 };
  const data = {
    "title": values?.title,
    "category": values?.task_category,
    "budget": values?.offer,
    "payOn": "completion",
    "location": {
      "type": "Point",
      "coordinates": [latino?.lat, latino?.lng]
    },
    "doneBy": "ONLINE",
    "address": values?.place?.split("|")?.[0],
    "scheduleType": values?.flexible,
    "preferredDate": values?.date,
    "preferredTime": values?.time,
    "description": values?.desc
  }
  const formData = new FormData();
  formData.append("data", JSON.stringify(data));
  formData.append("task_attachments", files[files.length - 1]);
  create(formData)
    .unwrap()
    .then(async (res: any) => {
      Toast.show({
        type: "success",
        text1: "Task created successfully",
        text2: res?.message || `Task created successfully`,
      });


    })
    .catch((err: any) => {
      Toast.show({
        type: "error",
        text1: "Failed to create task",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};
