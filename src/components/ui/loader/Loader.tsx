import React from "react";
import { ActivityIndicator, StyleSheet, View, ViewStyle } from "react-native";

interface LoaderProps {
  style?: ViewStyle;
  color?: string;
  size?: "small" | "large" | number;
}

const Loader = ({ style, color = "#115E59", size = "large" }: LoaderProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
