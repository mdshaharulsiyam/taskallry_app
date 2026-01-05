import React, { useState } from "react";
import {
  Image,
  ImageBackgroundProps,
  KeyboardType,
  StyleSheetProperties,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { otherIcons } from "../../../constant/images";
import HeaderSecondary from "../../shered/HeaderSecondary";

const PasswordInput = ({
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
}: {
  keyboard: string;
  style?: StyleSheetProperties;
  inputStyle?: StyleSheetProperties;
  placeHolder?: string;
  label?: string;
  error?: boolean;
  handler?: (name: string, value: string) => void;
  value?: string;
  name?: string;
  required?: boolean;
}) => {
  const [show, setShow] = useState(true);
  return (
    <View
      style={{
        backgroundColor: "transparent",
        position: "relative",
        ...style,
      }}
    >
      <HeaderSecondary
        style={{
          color: required ? (error ? "red" : "#111827") : "#111827",
          marginBottom: 5,
        }}
        text={label}
      />
      <TextInput
        placeholderTextColor="#9CA3AF"
        secureTextEntry={show}
        value={value}
        style={{
          backgroundColor: "#E6F4F1",
          padding: 15,
          paddingVertical: 12,
          borderRadius: 8,
          color: "#111827",
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
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 4,
          top: 45,
        }}
        activeOpacity={0.7}
        onPress={() => setShow(!show)}
      >
        <Image
          source={
            show
              ? (otherIcons?.EyeX as ImageBackgroundProps)
              : (otherIcons?.Eye as ImageBackgroundProps)
          }
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordInput;
