import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";

const ButtonTransparentBG = ({
  style,
  text,
  handler,
  activeOpacity = 0.7,
  disabled = false,
}: {
  style?: ViewStyle;
  text?: string;
  handler?: () => void;
  activeOpacity?: number;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (disabled) return;
        handler?.();
      }}
      activeOpacity={activeOpacity}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        borderColor: "#115E59",
        borderWidth: 2,
        backgroundColor: "transparent",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...style,
      }}
    >
      <Text
        style={{
          color: "#115E59",
        }}
      >
        {text ? text : "Close"}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonTransparentBG;
