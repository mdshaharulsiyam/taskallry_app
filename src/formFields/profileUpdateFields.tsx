import { useEffect, useState } from "react";
import { useGetMyProfileQuery } from '../redux/apis';
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const profileUpdateFields = () => {
  const { data } = useGetMyProfileQuery()
  const [fields, setFields] = useState<FieldsType[]>([
    {
      name: "name",
      type: FieldType.STRING,
      placeHolder: "Enter Full Name",
      label: "Full Name",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    // {
    //   name: "email",
    //   type: FieldType.STRING,
    //   placeHolder: "Enter Email Address",
    //   label: "Email Address",
    //   error: false,
    //   value: "",
    //   required: true,
    //   keyboard: KeyboardType.EMAIL_ADDRESS,
    // },
    // {
    //   name: "phone",
    //   type: FieldType.STRING,
    //   placeHolder: "Enter Phone Number",
    //   label: "Phone Number",
    //   error: false,
    //   value: "",
    //   required: true,
    //   keyboard: KeyboardType.DEFAULT,
    // },
    {
      name: "street",
      type: FieldType.STRING,
      placeHolder: "Enter Street Address",
      label: "Street Address",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
    {
      name: "city",
      type: FieldType.STRING,
      placeHolder: "Enter City / LGA",
      label: "City / LGA",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
    },
  ]);
  useEffect(() => {
    if (data) {
      setFields((prev) => {
        return prev.map((item) => {
          if (item.name === "name") {
            return { ...item, value: data.data.name };
          } else if (item.name === "email") {
            return { ...item, value: data.data.email };
          } else if (item.name === "phone") {
            return { ...item, value: data.data.phone };
          } else if (item.name === "street") {
            return { ...item, value: data.data.street };
          } else if (item.name === "city") {
            return { ...item, value: data.data.city };
          }
          return item;
        });
      });
    }
  }, [data]);
  return { fields, setFields };
};

export default profileUpdateFields;
