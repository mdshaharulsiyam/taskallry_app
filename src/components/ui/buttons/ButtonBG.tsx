import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const ButtonBG = ({
  style,
  text,
  handler,
  textStyle,
  disabled,
}: {
  style?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  handler: () => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (disabled) return;
        handler?.();
      }}
      activeOpacity={0.7}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#115E59",
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
          lineHeight: 23,
          color: "#FFFFFF",
          ...textStyle,
        }}
      >
        {text ? text : "Close"}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonBG;
