import React, { useRef, useEffect, useState } from "react";
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
  handler?: (name: string, value: String) => void;
  value?: string;
  name?: string;
  error?: boolean;
}

const LocationInput = ({
  style,
  label = "Location",
  placeHolder = "Search for location",
  required = true,
  showLabel = true,
  handler,
  value = "",
  name,
  error = false,
}: LocationInputProps) => {
  const ref = useRef<any>(null);

  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    console.log(
      "LocationInput MOUNTED - API Key:",
      CONFIG.GOOGLE_MAPS_API_KEY ? "EXISTS" : "MISSING"
    );
  }, []);

  useEffect(() => {
    if (ref.current && value) {
      ref.current.setAddressText(value);
    }
  }, [value]);

  useEffect(() => {
    if (selectedLocation) {
      console.log(
        "✅ DIAGNOSTIC LOG (Selected Location State):",
        selectedLocation
      );
    }
  }, [selectedLocation]);
  console.log(selectedLocation);
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
        ref={ref}
        placeholder={placeHolder}
        onPress={(data, details = null) => {
          console.log("LOCATION SELECTED (onPress):", { data, details });
          handler?.(name as string, "");

          setSelectedLocation({ data, details });
        }}
        onFail={(error) => console.log("PLACES API ERROR:", error)}
        onNotFound={() => console.log("NO RESULTS FOUND")}
        query={{
          key: CONFIG.GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        predefinedPlaces={[]}
        minLength={2}
        timeout={20000}
        listViewDisplayed="auto"
        keyboardShouldPersistTaps="handled"
        suppressDefaultStyles={false}
        textInputProps={{
          placeholderTextColor: "#9CA3AF",
          onChangeText: (text) => console.log("TEXT CHANGED:", text),
        }}
        onTimeout={() => console.log("REQUEST TIMEOUT")}
        requestUrl={{
          url: "https://maps.googleapis.com/maps/api",
          useOnPlatform: "web",
        }}
        styles={{
          container: {
            flex: 0,
          },
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
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            maxHeight: 300,
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
