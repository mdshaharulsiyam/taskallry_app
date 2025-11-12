import React from "react";

import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  StyleSheetProperties,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { otherIcons } from "../../../constant/images";
import HeaderSecondary from "../../shered/HeaderSecondary";
import TextPrimary from "../../shered/TextPrimary";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
const SelectInput = ({
  value,
  placeHolder = "please select",
  style,
  options = [
    { label: "options 1 ", value: "options 1" },
    { label: "options 2 ", value: "options 2" },
  ],
  label = "select item",
  error = false,
  handler,
  name,
  required = true,
  multiple = false,
}: {
  value?: string | string[];
  placeHolder?: string;
  style?: StyleSheetProperties;
  options?: { label: string; value: string }[];
  label?: string;
  error?: boolean;
  handler?: (name: string, value: string | string[]) => void;
  name?: string;
  required: boolean;
  multiple?: boolean;
}) => {
  const { bottom } = useSafeAreaInsets();
  const baseStyle = {
    padding: 15,
    borderRadius: 6,
    backgroundColor: "#E6F4F1",
    paddingVertical: 12,
    ...style,
  } as any;

  return (
    <>
      <HeaderSecondary
        style={{ color: required ? (error ? "red" : "#111827") : "#111827" }}
        text={label}
      />
      {multiple ? (
        <MultiSelect
          data={options}
          labelField="label"
          valueField="value"
          //  mode="modal"
          placeholder={placeHolder}
          value={Array.isArray(value) ? value : []}
          style={baseStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={[
            styles.containerStyle,
            {
              zIndex: 9999,
              elevation: 12,
              paddingBottom: bottom + 16,
              marginBottom: 8,
            },
          ]}
          dropdownPosition="auto"
          maxHeight={320}
          onChange={(vals: string[]) => handler?.(name as string, vals)}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity
              style={styles.tag}
              onPress={() => unSelect && unSelect(item)}
            >
              <Text style={styles.tagText}>{item.label}</Text>
              <Image
                source={otherIcons.Close as ImageSourcePropType}
                style={styles.tagClose}
              />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Dropdown
          data={options}
          labelField="label"
          valueField="value"
          // mode="modal"
          placeholder={placeHolder}
          value={typeof value === "string" ? value : undefined}
          style={baseStyle}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          containerStyle={[
            styles.containerStyle,
            { zIndex: 9999, elevation: 12, marginBottom: bottom + 50 },
          ]}
          dropdownPosition="auto"
          maxHeight={320}
          onChange={(item: { label: string; value: string }) =>
            handler?.(name as string, item.value)
          }
          renderRightIcon={() => (
            <Image source={otherIcons.arrowDown as ImageSourcePropType} />
          )}
        />
      )}
    </>
  );
};

export default SelectInput;

const styles = StyleSheet.create({
  placeholderStyle: {
    color: "#6B7280",
  },
  selectedTextStyle: {
    color: "#111827",
  },
  containerStyle: {
    borderRadius: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#C1E0DA",
    borderRadius: 12,
    marginRight: 6,
    marginTop: 6,
  },
  tagText: {
    color: "#111827",
    marginRight: 6,
  },
  tagClose: {
    width: 12,
    height: 12,
    tintColor: "#111827",
  },
});
