import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery, useGetMyServicesQuery } from "../redux/apis";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const AddUpdateServiceFields = () => {
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "title",
      type: FieldType.STRING,
      placeHolder: "Enter Service Title",
      label: "Service Title",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "price",
      type: FieldType.STRING,
      placeHolder: "Enter Starting Price",
      label: "Starting Price",
      error: false,
      value: "",
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
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);

  const { data } = useGetMyServicesQuery();
  const { data: categoryData } = useGetAllCategoriesQuery({ limit: 9999999 });

  useEffect(() => {
    if (!data?.data) return;

    const service = data.data as any;

    setFields((prev) =>
      prev.map((field) => {
        if (field.name === "title") {
          return { ...field, value: service.title ?? "" };
        }
        if (field.name === "price") {
          return { ...field, value: service.price?.toString() ?? "" };
        }
        if (field.name === "category") {
          return {
            ...field,
            value: service.category?._id ?? "",
          };
        }
        if (field.name === "descriptions") {
          return {
            ...field,
            value: service.description ?? "",
          };
        }
        return field;
      })
    );
  }, [data]);

  useEffect(() => {
    if (!categoryData?.data?.result) return;

    const options = categoryData.data.result.map((cat: any) => ({
      label: cat.name,
      value: cat._id,
    }));

    setFields((prev) =>
      prev.map((field) =>
        field.name === "category" ? { ...field, options } : field
      )
    );
  }, [categoryData]);
  return { fields, setFields };
};

export default AddUpdateServiceFields;
