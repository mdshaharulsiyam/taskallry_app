import React from "react";
import { ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import FilterOptionsFields from "../../formFields/FilterOptionsFields";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetFilters,
  selectFilters,
  setFilterCategory,
  setFilterDistanceRange,
  setFilterPriceRange,
  setFilterSort,
  setFilterToBeDone,
  setFilterWorkLocation,
  setViewMode,
} from "../../redux/slices/filterSlice";
import { FieldsType } from "../../types/Types";
import Navigate from "../../utils/Navigate";
import { RenderField } from "../../utils/RenderField";
import ButtonBG from "../ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../ui/buttons/ButtonGreenOpacity30";
import IconButtonBG from "../ui/buttons/IconButtonBG";
import FlexText from "./FlexText";

const FIlterOptions = (props: any) => {
  const { fields, setFields } = FilterOptionsFields();
  const { setRole } = useGlobalContext();
  const navigate = Navigate();
  const dispatch = useAppDispatch();
  const filterState = useAppSelector(selectFilters);

  const handleApply = () => {
    // Sync field values to Redux when Apply is clicked
    fields.forEach((field) => {
      const value = field.value;
      switch (field.name) {
        case "category":
          if (value !== filterState.category) {
            dispatch(setFilterCategory(value as string));
          }
          break;
        case "to_be_done":
          if (value !== filterState.to_be_done) {
            dispatch(setFilterToBeDone(value as string));
          }
          break;
        case "work_location":
          if (value !== filterState.work_location) {
            dispatch(setFilterWorkLocation(value as string));
          }
          break;
        case "distance_range":
          if (value !== filterState.distance_range) {
            dispatch(setFilterDistanceRange(value as string | number));
          }
          break;
        case "price_range":
          if (value !== filterState.price_range) {
            dispatch(setFilterPriceRange(value as string | number));
          }
          break;
        case "sort":
          if (value !== filterState.sort) {
            dispatch(setFilterSort(value as string));
          }
          break;
      }
    });

    // Close the drawer
    props?.navigation?.closeDrawer();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setFields(fields.map((f) => ({ ...f, value: "" })));
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
      {fields?.map((field: FieldsType) => RenderField(field, setFields))}
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
          // textStyle={{
          //   color: filterState.viewMode === "map" ? "white" : "black",
          // }}
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
          // textStyle={{
          //   color: filterState.viewMode === "list" ? "white" : "black",
          // }}
          text="List View"
          handler={() => dispatch(setViewMode("list"))}
        />
      </FlexText>
      <ButtonBG text="Apply" handler={handleApply} />
      <ButtonGreenOpacity30 text="Reset Filters" handler={handleReset} />
    </View>
  );
};

export default FIlterOptions;
