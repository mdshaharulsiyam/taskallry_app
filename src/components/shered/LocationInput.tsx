import React from "react";
import { View, ViewStyle } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import HeaderSecondary from "./HeaderSecondary";
import { CONFIG } from "../../constant/config";

interface LocationInputProps {
  style?: ViewStyle;
  label?: string;
  placeHolder?: string;
  required?: boolean;
  showLabel?: boolean;
  onLocationSelect: (data: any, details: any) => void;
  value?: string;
  error?: boolean;
}

const LocationInput = ({
  style,
  label = "Location",
  placeHolder = "Search for location",
  required = true,
  showLabel = true,
  onLocationSelect,
  value = "",
  error = false,
}: LocationInputProps) => {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        ...style,
      }}
    >
      {showLabel && (
        <HeaderSecondary
          style={{
            color: required ? (error ? "red" : "#111827") : "#111827",
            marginBottom: 5,
          }}
          text={label}
        />
      )}

      <GooglePlacesAutocomplete
        placeholder={placeHolder}
        onPress={(data, details = null) => {
          onLocationSelect(data, details);
        }}
        query={{
          key: CONFIG.GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        textInputProps={{
          value: value,
          placeholderTextColor: "#9CA3AF",
        }}
        styles={{
          textInputContainer: {
            backgroundColor: "transparent",
          },
          textInput: {
            backgroundColor: "#E6F4F1",
            color: "#000000",
            fontSize: 14,
            lineHeight: 26,
            paddingHorizontal: 15,
            paddingVertical: 12,
            borderRadius: 8,
            height: 50,
            ...(error
              ? {
                  borderColor: "red",
                  borderWidth: 1,
                }
              : {}),
          },
          predefinedPlacesDescription: {
            color: "#1A56DB",
          },
          listView: {
            backgroundColor: "#FFFFFF",
            borderRadius: 8,
            marginTop: 5,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            elevation: 3,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          row: {
            backgroundColor: "#FFFFFF",
            padding: 13,
            minHeight: 50,
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#F3F4F6",
          },
          separator: {
            height: 0,
          },
          description: {
            color: "#374151",
            fontSize: 14,
          },
          loader: {
            flexDirection: "row",
            justifyContent: "flex-end",
            height: 20,
          },
          poweredContainer: {
            display: "none",
          },
        }}
      />
    </View>
  );
};

export default LocationInput;
