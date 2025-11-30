import React, { useEffect, useMemo, useState } from "react";
import { ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import { useGetAllCategoriesQuery } from "../../redux/apis";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetFilters,
  selectFilters,
  selectSearchType,
  setFilterCategory,
  setFilterDistanceRange,
  setFilterPriceRange,
  setFilterSort,
  setFilterToBeDone,
  setFilterWorkLocation,
  setViewMode,
} from "../../redux/slices/filterSlice";
import Navigate from "../../utils/Navigate";
import ButtonBG from "../ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../ui/buttons/ButtonGreenOpacity30";
import IconButtonBG from "../ui/buttons/IconButtonBG";
import LocationInput from "../ui/inputs/LocationInput";
import OptionGridInput from "../ui/inputs/OptionGridInput";
import RangeSelect from "../ui/inputs/RangeSelect";
import SelectInput from "../ui/inputs/SelectInput";
import FlexText from "./FlexText";

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

const FIlterOptions = (props: any) => {
  const { setRole } = useGlobalContext();
  const navigate = Navigate();
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selectFilters);
  const searchType = useAppSelector(selectSearchType);
  const { data: categoryData } = useGetAllCategoriesQuery({ limit: 9999999 });

  const categoryOptions = useMemo(
    () =>
      categoryData?.data?.result?.map((item: any) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
    [categoryData]
  );

  const [formState, setFormState] = useState({
    category: filterState.category || "",
    to_be_done: filterState.to_be_done || "",
    work_location: filterState.work_location || "",
    distance_range:
      typeof filterState.distance_range === "number"
        ? filterState.distance_range
        : Number(filterState.distance_range) || 20,
    price_range:
      typeof filterState.price_range === "number"
        ? filterState.price_range
        : Number(filterState.price_range) || 5000000,
    sort: filterState.sort || "",
  });

  useEffect(() => {
    setFormState({
      category: filterState.category || "",
      to_be_done: filterState.to_be_done || "",
      work_location: filterState.work_location || "",
      distance_range:
        typeof filterState.distance_range === "number"
          ? filterState.distance_range
          : Number(filterState.distance_range) || 20,
      price_range:
        typeof filterState.price_range === "number"
          ? filterState.price_range
          : Number(filterState.price_range) || 5000000,
      sort: filterState.sort || "",
    });
  }, [
    filterState.category,
    filterState.to_be_done,
    filterState.work_location,
    filterState.distance_range,
    filterState.price_range,
    filterState.sort,
  ]);

  const handleFieldChange = (name: string, value: any) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    if (formState.category !== filterState.category) {
      dispatch(setFilterCategory(formState.category));
    }
    if (formState.to_be_done !== filterState.to_be_done) {
      dispatch(setFilterToBeDone(formState.to_be_done));
    }
    if (formState.work_location !== filterState.work_location) {
      dispatch(setFilterWorkLocation(formState.work_location));
    }
    if (formState.distance_range !== filterState.distance_range) {
      dispatch(setFilterDistanceRange(formState.distance_range));
    }
    if (formState.price_range !== filterState.price_range) {
      dispatch(setFilterPriceRange(formState.price_range));
    }
    if (formState.sort !== filterState.sort) {
      dispatch(setFilterSort(formState.sort));
    }

    props?.navigation?.closeDrawer();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setFormState({
      category: "",
      to_be_done: "",
      work_location: "",
      distance_range: 20,
      price_range: 5000000,
      sort: "",
    });
    props?.navigation?.closeDrawer();
  };
  return (
    <View
      style={{
        flex: 1,
        gap: 6,
        justifyContent: "flex-start",
        paddingHorizontal: 10,
      }}
    >
      <SelectInput
        label="Category"
        placeHolder="Select Category"
        options={categoryOptions}
        value={formState.category}
        handler={handleFieldChange}
        name="category"
        required
      />
      <OptionGridInput
        label="To be done"
        name="to_be_done"
        options={TO_BE_DONE_OPTIONS}
        value={formState.to_be_done}
        handler={handleFieldChange}
      />
      <LocationInput
        label="Work location"
        name="work_location"
        placeHolder="Work location"
        value={formState.work_location}
        handler={handleFieldChange}
      />
      <RangeSelect
        label="Distance Range"
        name="distance_range"
        min={0}
        max={200}
        step={1}
        value={formState.distance_range}
        handler={handleFieldChange}
      />
      <RangeSelect
        label="Price Range"
        name="price_range"
        min={5000}
        max={5000000}
        step={1000}
        value={formState.price_range}
        handler={handleFieldChange}
      />
      <SelectInput
        label="Sort By"
        placeHolder="Sort By"
        options={
          searchType === "Provider"
            ? PROVIDER_SORT_OPTIONS
            : TASK_SORT_OPTIONS
        }
        value={formState.sort}
        handler={handleFieldChange}
        name="sort"
        required
      />
      <FlexText
        style={{
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <IconButtonBG
          style={{
            width: "auto",
            backgroundColor:
              filterState.viewMode === "map" ? "#115E59" : "#38a19cff",
          }}
          text="Map View"
          handler={() => dispatch(setViewMode("map"))}
        />
        <IconButtonBG
          icon={otherIcons.List as ImageSourcePropType}
          style={{
            width: "auto",
            backgroundColor:
              filterState.viewMode === "list" ? "#115E59" : "#38a19cff",
          }}
          text="List View"
          handler={() => dispatch(setViewMode("list"))}
        />
      </FlexText>
      <ButtonBG text="Apply" handler={handleApply} />
      <ButtonGreenOpacity30 text="Reset Filters" handler={handleReset} />
    </View>
  );
}
  ;

export default FIlterOptions;
