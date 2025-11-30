import { useEffect, useMemo, useState } from "react";
import { useGetAllCategoriesQuery } from "../redux/apis";
import { useAppSelector } from "../redux/hooks";
import { selectSearchType } from "../redux/slices/filterSlice";
import { FieldsType, FieldType, KeyboardType } from "../types/Types";

const PROVIDER_SORT_OPTIONS = [
  { label: "Top Rated", value: "TOP_RATED" },
  { label: "Price High to Low", value: "PRICE_HIGH_TO_LOW" },
  { label: "Price Low to High", value: "PRICE_LOW_TO_HIGH" },
  { label: "Newest Service", value: "NEWEST_SERVICE" },
];

const TASK_SORT_OPTIONS = [
  { label: "Newest First", value: "Newest First" },
  { label: "Oldest First", value: "Oldest First" },
  { label: "Open for Bid", value: "OPEN_FOR_BID" },
  { label: "Assigned", value: "IN_PROGRESS" },
];

const TO_BE_DONE_OPTIONS = [
  { label: "in-person", value: "in-person" },
  { label: "online", value: "online" },
];

const FilterOptionsFields = () => {
  const { data } = useGetAllCategoriesQuery({ limit: 9999999 });
  const searchType = useAppSelector(selectSearchType);

  const categoryOptions = useMemo(() => {
    if (!data?.data?.result) return [];
    return data.data.result.map((item: any) => ({
      label: item.name,
      value: item._id,
    }));
  }, [data]);

  const sortOptions = useMemo(
    () => (searchType === "Provider" ? PROVIDER_SORT_OPTIONS : TASK_SORT_OPTIONS),
    [searchType]
  );

  const buildFields = (): FieldsType[] => [
    {
      name: "category",
      type: FieldType.SELECT,
      placeHolder: "Select Category",
      label: "Category",
      error: false,
      value: "",
      required: true,
      keyboard: KeyboardType.DEFAULT,
      options: categoryOptions,
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
      options: TO_BE_DONE_OPTIONS,
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
      options: sortOptions,
    },
  ];

  const [fields, setFields] = useState<FieldsType[]>(buildFields());

  useEffect(() => {
    setFields(buildFields());
  }, [categoryOptions, sortOptions]);

  return { fields, setFields };
};

export default FilterOptionsFields;
