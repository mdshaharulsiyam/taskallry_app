import React from "react";
import { ActivityIndicator, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

const ButtonBG = ({
  style,
  text,
  handler,
  textStyle,
  disabled,
  loading,
}: {
  style?: ViewStyle;
  textStyle?: TextStyle;
  text?: string;
  handler: () => void;
  disabled?: boolean;
  loading?: boolean;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (disabled || loading) return;
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
      {loading ? (
        <ActivityIndicator size="small" color="#FFFFFF" />
      ) : (
        <Text
          style={{
            lineHeight: 23,
            color: "#FFFFFF",
            ...textStyle,
          }}
        >
          {text ? text : "Close"}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonBG;
