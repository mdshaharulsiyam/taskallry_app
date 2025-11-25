import { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../redux/apis";
import { useAppSelector } from "../redux/hooks";
import { selectSearchType } from "../redux/slices/filterSlice";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const FilterOptionsFields = () => {
  const { data } = useGetAllCategoriesQuery({ limit: 9999999 });
  const searchType = useAppSelector(selectSearchType);

  const buildInitialFields = (): FieldsType[] => {
    if (searchType === "Provider") {
      return [
        {
          name: "category",
          type: FieldType.SELECT,
          placeHolder: "Select Category",
          label: "Category",
          error: false,
          value: "",
          required: true,
          keyboard: KeyboardType.DEFAULT,
          options: [],
        },
        {
          name: "sort",
          type: FieldType.SELECT,
          placeHolder: "Sort By",
          label: "Sort By",
          error: false,
          value: "",
          required: true,
          keyboard: KeyboardType.DEFAULT,
          options: [
            { label: "Top Rated", value: "TOP_RATED" },
            { label: "Price High to Low", value: "PRICE_HIGH_TO_LOW" },
            { label: "Price Low to High", value: "PRICE_LOW_TO_HIGH" },
            { label: "Newest Service", value: "NEWEST_SERVICE" },
          ],
        },
      ];
    }

    return [
      {
        name: "category",
        type: FieldType.SELECT,
        placeHolder: "Select Category",
        label: "Category",
        error: false,
        value: "",
        required: true,
        keyboard: KeyboardType.DEFAULT,
        options: [],
      },
      {
        name: "to_be_done",
        type: FieldType.GRIDINPUT,
        placeHolder: "Select To be done",
        label: "To be done",
        error: false,
        value: "",
        required: true,
        keyboard: KeyboardType.DEFAULT,
        options: [
          { label: "in-person", value: "in-person" },
          { label: "online", value: "online" },
        ],
      },
      {
        name: "work_location",
        type: FieldType.LOCATION,
        placeHolder: "Work location",
        label: "Work location",
        error: false,
        value: "",
        required: true,
        keyboard: KeyboardType.DEFAULT,
      },
      {
        name: "distance_range",
        type: FieldType.RANGE,
        placeHolder: "Distance Range",
        label: "Distance Range",
        error: false,
        value: "",
        required: true,
        keyboard: KeyboardType.DEFAULT,
        max: 200,
        min: 0,
        step: 1,
      },
      {
        name: "price_range",
        type: FieldType.RANGE,
        placeHolder: "Price Range",
        label: "Price Range",
        error: false,
        value: "",
        required: true,
        keyboard: KeyboardType.DEFAULT,
        max: 5000000,
        min: 5000,
        step: 1,
      },
      {
        name: "sort",
        type: FieldType.SELECT,
        placeHolder: "Sort By",
        label: "Sort By",
        error: false,
        value: "",
        required: true,
        keyboard: KeyboardType.DEFAULT,
        options: [
          { label: "Newest First", value: "Newest First" },
          { label: "Oldest First", value: "Oldest First" },
          { label: "Open for Bid", value: "OPEN_FOR_BID" },
          { label: "Assigned", value: "IN_PROGRESS" },
        ],
      },
    ];
  };

  const [fields, setFields] = useState<FieldsType[]>(buildInitialFields());

  useEffect(() => {
    setFields(buildInitialFields());
  }, [searchType]);
  useEffect(() => {
    if (data) {
      const category_options = data?.data?.result?.map((item: any) => ({
        label: item.name,
        value: item._id,
      }));
      setFields((prev) => {
        return prev.map((field) => {
          if (field.name === "category") {
            return {
              ...field,
              options: category_options,
            };
          }
          return field;
        });
      });
    }
  }, [data, searchType]);
  return { fields, setFields };
};

export default FilterOptionsFields;
