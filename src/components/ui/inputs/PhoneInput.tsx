import React, { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { otherIcons } from "../../../constant/images";
import HeaderSecondary from "../../shered/HeaderSecondary";

const COUNTRY_OPTIONS = [
  { label: "United States (+1)", value: "US", dialCode: "+1" },
  { label: "Canada (+1)", value: "CA", dialCode: "+1" },
  { label: "United Kingdom (+44)", value: "UK", dialCode: "+44" },
  { label: "Nigeria (+234)", value: "NG", dialCode: "+234" },
] as const;

export type PhoneCountryCode = (typeof COUNTRY_OPTIONS)[number]["value"];

type PhoneInputProps = {
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  label?: string;
  placeholder?: string;
  required?: boolean;
  showLabel?: boolean;
  country?: PhoneCountryCode;
  number?: string;
  error?: boolean;
  countryError?: boolean;
  onCountryChange?: (country: PhoneCountryCode, dialCode: string) => void;
  onNumberChange?: (value: string) => void;
  onChange?: (value: {
    country: PhoneCountryCode;
    dialCode: string;
    number: string;
  }) => void;
};

const PhoneInput = ({
  style,
  inputStyle,
  label = "Phone Number",
  placeholder = "Enter phone number",
  required = true,
  showLabel = true,
  country = "US",
  number = "",
  error = false,
  countryError = false,
  onCountryChange,
  onNumberChange,
  onChange,
}: PhoneInputProps) => {
  const selectedCountry = useMemo(
    () =>
      COUNTRY_OPTIONS.find((option) => option.value === country) ??
      COUNTRY_OPTIONS[0],
    [country]
  );

  const emitChange = (
    nextCountry: PhoneCountryCode,
    dialCode: string,
    phoneNumber: string
  ) => {
    onChange?.({ country: nextCountry, dialCode, number: phoneNumber });
  };

  const handleCountryChange = (value: PhoneCountryCode) => {
    const option =
      COUNTRY_OPTIONS.find((item) => item.value === value) || selectedCountry;
    onCountryChange?.(option.value, option.dialCode);
    emitChange(option.value, option.dialCode, number);
  };

  const handleNumberChange = (text: string) => {
    onNumberChange?.(text);
    emitChange(selectedCountry.value, selectedCountry.dialCode, text);
  };

  return (
    <View style={[styles.container, style]}>
      {showLabel && (
        <HeaderSecondary
          style={{
            color: required
              ? error || countryError
                ? "red"
                : "#111827"
              : "#111827",
            marginBottom: 5,
          }}
          text={label}
        />
      )}
      <View style={styles.row}>
        <Dropdown
          data={
            COUNTRY_OPTIONS as unknown as Array<Record<string, string>>
          }
          labelField="dialCode"
          valueField="value"
          value={selectedCountry.value}
          style={[
            styles.countryDropdown,
            countryError ? styles.errorBorder : undefined,
          ]}
          containerStyle={styles.dropdownContainer}
          placeholder={selectedCountry.label}
          renderRightIcon={() => (
            <Image source={otherIcons.arrowDown as ImageSourcePropType} />
          )}
          renderItem={(item) => (
            <View style={styles.dropdownItem}>
              <Text style={styles.dropdownItemLabel}>{item.label}</Text>
            </View>
          )}
          onChange={(item) =>
            handleCountryChange(item.value as PhoneCountryCode)
          }
        />
        <View
          style={[
            styles.inputWrapper,
            error ? styles.errorBorder : undefined,
            inputStyle,
          ]}
        >
          <TextInput
            value={number}
            style={styles.input}
            placeholder={placeholder}
            keyboardType="phone-pad"
            onChangeText={handleNumberChange}
          />
        </View>
      </View>
    </View>
  );
};

export default PhoneInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  countryDropdown: {
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#E6F4F1",
  },
  dropdownContainer: {
    borderRadius: 12,
    paddingVertical: 8,
    marginTop: 4,
    borderColor: "transparent",
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  dropdownItemLabel: {
    color: "#111827",
    fontSize: 14,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E6F4F1",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    color: "#111827",
    padding: 0,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
});
