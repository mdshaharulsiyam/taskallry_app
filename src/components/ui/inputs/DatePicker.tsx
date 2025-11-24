import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import HeaderSecondary from "../../shered/HeaderSecondary";
const DatePicker = ({
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
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    // Close picker on Android after selection, keep it open on iOS
    if (Platform.OS === "android") {
      setShow(false);
    } else {
      setShow(true);
    }
    setDate(currentDate);
    console.log(event);

    // Propagate selected date to parent as a formatted string
    if (selectedDate && handler && name) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const formatted = `${year}-${month}-${day}`;
      handler(name, formatted);
    }
  };
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
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text
          style={{
            backgroundColor: "#E6F4F1",
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
        >
          {value != "" ? value : placeHolder}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
