import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import LocationInput from "../ui/inputs/LocationInput";

/**
 * Example component demonstrating how to use the LocationInput component
 *
 * Usage:
 * 1. Import LocationInput from "../shered/LocationInput"
 * 2. Use the onLocationSelect callback to get selected location data
 * 3. The component returns both the place data and full details (if fetchDetails is enabled)
 */
const LocationInputExample = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [locationAddress, setLocationAddress] = useState("");

  const handleLocationSelect = (data: any, details: any) => {
    console.log("Selected place data:", data);
    console.log("Selected place details:", details);

    setSelectedLocation(details);
    setLocationAddress(data.description);

  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Location Autocomplete Example</Text>

      {/* Basic Usage */}
      <View style={styles.section}>
        <LocationInput
          label="Select Location"
          placeHolder="Search for a location..."
          onLocationSelect={handleLocationSelect}
          value={locationAddress}
          showLabel={true}
          required={true}
          style={{ marginBottom: 20 }}
        />
      </View>

      {/* Display Selected Location Info */}
      {selectedLocation && (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Selected Location:</Text>
          <Text style={styles.resultText}>
            Address: {selectedLocation.formatted_address}
          </Text>
          <Text style={styles.resultText}>
            Latitude: {selectedLocation.geometry?.location.lat}
          </Text>
          <Text style={styles.resultText}>
            Longitude: {selectedLocation.geometry?.location.lng}
          </Text>
          <Text style={styles.resultText}>
            Place ID: {selectedLocation.place_id}
          </Text>
        </View>
      )}

      {/* Another Example with Custom Styling */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Styled Example:</Text>
        <LocationInput
          label="Delivery Address"
          placeHolder="Enter delivery location"
          onLocationSelect={(data, details) => {
            console.log("Delivery location:", data.description);
          }}
          showLabel={true}
          required={false}
          style={{
            marginBottom: 20,
            backgroundColor: "#F9FAFB",
          }}
        />
      </View>

      {/* Example without Label */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Without Label:</Text>
        <LocationInput
          placeHolder="Search location..."
          onLocationSelect={(data, details) => {
            console.log("Location:", data.description);
          }}
          showLabel={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 10,
  },
  resultSection: {
    backgroundColor: "#E6F4F1",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#115E59",
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
  },
});

export default LocationInputExample;
