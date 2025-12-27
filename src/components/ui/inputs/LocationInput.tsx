import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { CONFIG } from "../../../constant/config";
import HeaderSecondary from "../../shered/HeaderSecondary";

interface LocationInputProps {
  style?: ViewStyle;
  label?: string;
  placeHolder?: string;
  required?: boolean;
  showLabel?: boolean;
  handler: (name: string, value: string) => void;
  name: string;
  value?: string;
  error?: boolean;
}

const LocationInput = ({
  style,
  label = "Location",
  placeHolder = "Search for location",
  required = true,
  showLabel = true,
  handler,
  name,
  value = "",
  error = false,
}: LocationInputProps) => {
  const [query, setQuery] = useState(value);
  const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handleSearchLocation = async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) {
      setLocationSuggestions([]);
      return;
    }

    if (!CONFIG.GOOGLE_MAPS_API_KEY) {
      console.error("Missing Google Maps API key");
      return;
    }

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);

    try {
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        q
      )}&key=${CONFIG.GOOGLE_MAPS_API_KEY}`;

      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = await res.json();
      if (data.status !== "OK" && data.status !== "ZERO_RESULTS") {
        throw new Error(
          data.error_message || `Places API status: ${data.status}`
        );
      }

      setLocationSuggestions(data.results || []);
    } catch (e: any) {
      if (e?.name !== "AbortError") {
        console.error(e?.message || "Something went wrong");
        setLocationSuggestions([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (text: string) => {
    setQuery(text);
    if (text.length > 2) {
      handleSearchLocation(text);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSelectLocation = (item: any) => {
    const locationValue = item.formatted_address || item.name;
    const geometry = JSON.stringify(item.geometry.location);
    setQuery(locationValue + "|" + geometry);
    setLocationSuggestions([]);
    handler(name, locationValue + "|" + geometry);
  };
  useEffect(() => {
    if (value) {
      setQuery(value);
    }
  }, [value]);
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

      <TextInput
        style={[styles.textInput, error && styles.textInputError]}
        placeholder={placeHolder}
        placeholderTextColor="#9CA3AF"
        value={query?.split("|")?.[0]}
        onChangeText={handleTextChange}
      />

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#1A56DB" />
        </View>
      )}

      {locationSuggestions.length > 0 && (
        <FlatList
          data={locationSuggestions}
          keyExtractor={(item) => item.place_id}
          style={styles.listView}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() => handleSelectLocation(item)}
            >
              <Text style={styles.description}>
                {item.formatted_address || item.name}
              </Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#E6F4F1",
    color: "#000000",
    fontSize: 14,
    lineHeight: 26,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    height: 50,
  },
  textInputError: {
    borderColor: "red",
    borderWidth: 1,
  },
  loaderContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 20,
    marginTop: 5,
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
});

export default LocationInput;
