import React from "react";
import { KeyboardType, TextInput, View, ViewStyle } from "react-native";
import HeaderSecondary from "../../shered/HeaderSecondary";

const Input = ({
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
  onBlur,
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
  onBlur?: (value: string) => void;
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
        onBlur={() => onBlur?.(value + "")}
        value={value}
        style={{
          backgroundColor: "#E6F4F1",
          color: "#000000",
          lineHeight: 26,
          padding: 15,
          paddingVertical: 12,
          borderRadius: 8,
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

export default Input;
