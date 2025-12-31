import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useEffect, useState } from "react";
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
  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseDateString = (str?: string) => {
    if (!str) return undefined;
    const match = str.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!match) return undefined;
    const [_, year, month, day] = match;
    const parsed = new Date();
    parsed.setSeconds(0, 0);
    parsed.setFullYear(Number(year), Number(month) - 1, Number(day));
    return parsed;
  };

  const [date, setDate] = useState<Date>(
    () => parseDateString(value) || new Date()
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    const parsed = parseDateString(value);
    if (parsed) {
      setDate(parsed);
    }
  }, [value]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    if (Platform.OS === "android") {
      setShow(false);
    } else {
      setShow(true);
    }
    setDate(currentDate);
    if (selectedDate && handler && name) {
      handler(name, formatDate(selectedDate));
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
          {value && value.length > 0 ? value : formatDate(date)}
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
