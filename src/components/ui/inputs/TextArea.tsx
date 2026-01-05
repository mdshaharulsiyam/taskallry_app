import React from "react";
import { KeyboardType, TextInput, View, ViewStyle } from "react-native";
import HeaderSecondary from "../../shered/HeaderSecondary";

const TextArea = ({
  keyboard,
  style,
  inputStyle,
  placeHolder = "Please enter",
  label = "Enter your",
  error = false,
  handler,
  value,
  name,
  required = true,
  showLabel = true,
}: {
  keyboard: string;
  style?: ViewStyle;
  inputStyle?: ViewStyle;
  placeHolder?: string;
  label?: string;
  error?: boolean;
  handler?: (name: string, value: string) => void;
  value?: string;
  name?: string;
  required?: boolean;
  showLabel?: boolean;
}) => {
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
        placeholderTextColor="#9CA3AF"
        value={value}
        multiline
        style={{
          backgroundColor: "#E6F4F1",

          padding: 15,
          paddingVertical: 12,
          color: "#000000",
          borderRadius: 8,
          height: 100,
          textAlignVertical: "top",
          ...(error
            ? {
              borderColor: "red",
              borderWidth: 1,
            }
            : {}),
          ...inputStyle,
        }}
        placeholder={placeHolder}
        keyboardType={keyboard as KeyboardType}
        onChangeText={(text) => handler?.(name as string, text)}
      />
    </View>
  );
};

export default TextArea;
