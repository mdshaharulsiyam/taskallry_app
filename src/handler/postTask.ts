import moment from "moment";
import React from "react";
import Toast from "react-native-toast-message";
import { FieldsType, KeyboardType } from "../types/Types";
import { validateFields } from "../utils/formValidate";

export const handlePostTask = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>,
  currentSlide: number,
  allFields: FieldsType[],
  create: any,
  files: any,
  successFn: () => void,
  provider: string | undefined,
) => {
  const isValid = validateFields(fields, setFields);
  if (!isValid || currentSlide != 3) {
    return isValid;
  }
  const values = allFields.reduce((acc, field) => {
    acc[field.name] =
      field?.keyboard == KeyboardType.NUMERIC
        ? Number(field.value)
        : field.value;
    return acc;
  }, {} as any);

  const latino = values?.place?.split("|")?.[1]
    ? JSON.parse(values?.place?.split("|")?.[1])
    : { lat: 0, lng: 0 };
  const data = {
    title: values?.title,
    category: values?.task_category,
    budget: values?.offer,
    payOn: "completion",
    ...(provider && { provider }),
    location: {
      type: "Point",
      coordinates: [latino?.lng, latino?.lat],
    },
    doneBy: "ONLINE",
    address: values?.place?.split("|")?.[0],
    scheduleType: values?.flexible,
    preferredDate: values?.date,
    preferredTime: values?.time,
    description: values?.desc,
    preferredDeliveryDateTime: moment(
      `${values?.date} ${values?.time}`,
      "YYYY-MM-DD HH:mm"
    )
      .utc()
      .toISOString(),
  };
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
      successFn();
      setFields(allFields.map((field) => ({ ...field, value: "" })));
    })
    .catch((err: any) => {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Failed to create task",
        text2: err?.data?.message || "Something went wrong",
      });
    });
};
