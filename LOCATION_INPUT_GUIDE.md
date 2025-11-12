# Location Input Component Guide

## Overview

The `LocationInput` component provides a Google Places autocomplete input field for your React Native application. It suggests locations as users type and allows them to select a location by clicking on a suggestion.

## Features

- ✅ Real-time location suggestions while typing
- ✅ Google Places API integration
- ✅ Clickable suggestions for easy selection
- ✅ Fetches detailed place information (coordinates, address, etc.)
- ✅ Customizable styling to match your app theme
- ✅ Follows existing app design patterns

## Installation

The required package `react-native-google-places-autocomplete` has already been installed.

## Usage

### Basic Example

```tsx
import React, { useState } from "react";
import LocationInput from "./src/components/shered/LocationInput";

const MyComponent = () => {
  const [location, setLocation] = useState("");

  const handleLocationSelect = (data, details) => {
    console.log("Selected:", data.description);
    console.log("Latitude:", details.geometry.location.lat);
    console.log("Longitude:", details.geometry.location.lng);
    setLocation(data.description);
  };

  return (
    <LocationInput
      label="Select Location"
      placeHolder="Search for a location..."
      onLocationSelect={handleLocationSelect}
      value={location}
    />
  );
};
```

## Props

| Prop               | Type                      | Default               | Required | Description                                   |
| ------------------ | ------------------------- | --------------------- | -------- | --------------------------------------------- |
| `onLocationSelect` | `(data, details) => void` | -                     | ✅       | Callback function when a location is selected |
| `label`            | `string`                  | "Location"            | ❌       | Label text displayed above the input          |
| `placeHolder`      | `string`                  | "Search for location" | ❌       | Placeholder text in the input field           |
| `value`            | `string`                  | ""                    | ❌       | Current value of the input                    |
| `style`            | `ViewStyle`               | -                     | ❌       | Custom styles for the container               |
| `required`         | `boolean`                 | `true`                | ❌       | Shows required indicator in label             |
| `showLabel`        | `boolean`                 | `true`                | ❌       | Whether to show the label                     |
| `error`            | `boolean`                 | `false`               | ❌       | Shows error styling                           |

## Data Returned

### `data` object (first parameter)

```typescript
{
  description: string; // Full formatted address
  place_id: string; // Unique Google Place ID
  // ... other metadata
}
```

### `details` object (second parameter)

```typescript
{
  formatted_address: string;
  geometry: {
    location: {
      lat: number; // Latitude
      lng: number; // Longitude
    }
  }
  place_id: string;
  address_components: Array; // Detailed address parts
  // ... many other useful properties
}
```

## Example Use Cases

### 1. Task Location Selection

```tsx
<LocationInput
  label="Task Location"
  placeHolder="Where is the task located?"
  onLocationSelect={(data, details) => {
    setTaskLocation({
      address: data.description,
      lat: details.geometry.location.lat,
      lng: details.geometry.location.lng,
    });
  }}
/>
```

### 2. Delivery Address

```tsx
<LocationInput
  label="Delivery Address"
  placeHolder="Enter delivery location"
  onLocationSelect={(data, details) => {
    setDeliveryInfo({
      address: details.formatted_address,
      coordinates: details.geometry.location,
      placeId: details.place_id,
    });
  }}
  required={true}
/>
```

### 3. Without Label (Inline Search)

```tsx
<LocationInput
  showLabel={false}
  placeHolder="Search location..."
  onLocationSelect={(data, details) => {
    filterByLocation(details.geometry.location);
  }}
/>
```

## Styling

The component uses the app's existing color scheme:

- Input background: `#E6F4F1`
- Border color: `#115E59`
- Text color: `#000000`
- Error color: `red`

You can override styles using the `style` prop.

## API Key Configuration

The Google Maps API key is stored in:

```
src/constant/config.ts
```

Current key: `AIzaSyDujU29sgrjijtY6Pr5Gm-vR2c1RoFDsiU`

⚠️ **Important**: For production, consider:

1. Moving the API key to environment variables
2. Restricting the API key in Google Cloud Console
3. Setting up billing limits

## Complete Example Component

See the full example implementation in:

```
src/components/examples/LocationInputExample.tsx
```

This file demonstrates:

- Basic usage
- Accessing location details
- Multiple input configurations
- Custom styling options

## Troubleshooting

### No suggestions appearing

- Check your internet connection
- Verify the API key is correct
- Ensure the API key has Places API enabled in Google Cloud Console

### Suggestions appearing but not clickable

- Make sure the parent component has enough height
- Check for any overlapping views with higher z-index

### TypeScript errors

- The component is fully typed
- Import types from the component if needed

## Additional Resources

- [Google Places Autocomplete API](https://developers.google.com/maps/documentation/places/web-service/autocomplete)
- [react-native-google-places-autocomplete Documentation](https://github.com/FaridSafi/react-native-google-places-autocomplete)

## Support

For issues or questions, refer to the example component or check the package documentation.
