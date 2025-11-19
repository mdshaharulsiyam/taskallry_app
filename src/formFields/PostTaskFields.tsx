import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../redux/apis";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const PostTaskFields = () => {
  const { data } = useGetAllCategoriesQuery({ limit: 9999999 });
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "title",
      type: FieldType.STRING,
      placeHolder: "Enter Task Title",
      label: "Task Title",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "task_category",
      type: FieldType.SELECT,
      placeHolder: "Select Task Category",
      label: "Task Category",
      error: false,
      value: "",
      required: true,
      options: [
      ],
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "desc",
      type: FieldType.TEXTAREA,
      placeHolder:
        "Clearly explain what needs to be done, including details like location, required tools, and specific expectations.",
      label: " Enter Task Description",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "type",
      type: FieldType.GRIDINPUT,
      placeHolder: "How should the task be done?",
      label: "How should the task be done?",
      error: false,
      value: "",
      required: true,
      options: [
        { label: "In-Person", value: "IN_PERSON" },
        { label: "Online", value: "ONLINE" },
      ],
      keyboard: KeyboardType.DEFAULT,
      showLabel: true,
    },
    {
      name: "place",
      type: FieldType.LOCATION,
      placeHolder: "Where to Go to Complete the Task",
      label: "Where to Go to Complete the Task",
      error: false,
      value: "e.g., 123 Allen Avenue, Ikeja, Lagos, 100001",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "flexible",
      type: FieldType.GRIDINPUT,
      placeHolder: "Where to Go to Complete the Task",
      label: "Where to Go to Complete the Task",
      error: false,
      value: "",
      required: true,
      options: [
        { label: "Fixed Date & Time", value: "FIXED_DATE_AND_TIME" },
        { label: "Flexible", value: "FLEXIBLE" },
      ],
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "date",
      type: FieldType.DATE,
      placeHolder: "Preferred Date",
      label: "Preferred Date",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "time",
      type: FieldType.TIME,
      placeHolder: "Preferred Time",
      label: "Preferred Time",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "offer",
      type: FieldType.STRING,
      placeHolder: "How much are you offering?",
      label: "How much are you offering?",
      error: false,
      value: "1000",
      required: true,
      keyboard: KeyboardType.NUMERIC,
    },
    {
      name: "confirm",
      type: FieldType.CHECKBOX,
      placeHolder: "",
      label:
        "I confirm this task complies with all platform rules and community guidelines. ",
      error: false,
      value: true,
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  useEffect(() => {
    if (data) {
      const category_options = data?.data?.result?.map((item: any) => ({
        label: item.name,
        value: item._id,
      }));
      setFields((prev) => {
        return prev.map((field) => {
          if (field.name === "task_category") {
            return {
              ...field,
              options: category_options,
            };
          }
          return field;
        });
      });
    }
  }, [data]);
  return { fields, setFields };
};

export default PostTaskFields;
