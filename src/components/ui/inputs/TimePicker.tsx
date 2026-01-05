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
const TimePicker = ({
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
  const formatTime = (d: Date) => {
    const hrs = d.getHours().toString().padStart(2, "0");
    const mins = d.getMinutes().toString().padStart(2, "0");
    return `${hrs}:${mins}`;
  };

  const parseTimeString = (str?: string) => {
    if (!str) return undefined;
    const m = str.match(/^(\d{1,2}):(\d{2})$/);
    if (!m) return undefined;
    const d = new Date();
    d.setSeconds(0, 0);
    d.setHours(Math.min(23, parseInt(m[1], 10)));
    d.setMinutes(Math.min(59, parseInt(m[2], 10)));
    return d;
  };

  const [date, setDate] = useState<Date>(
    () => parseTimeString(value) || new Date()
  );
  const [show, setShow] = useState(false);
  const [picked, setPicked] = useState(false);

  useEffect(() => {
    const parsed = parseTimeString(value);
    if (parsed) {
      setDate(parsed);
      setPicked(true);
    }
  }, [value]);

  const onChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShow(false);
    } else {
    }

    if (event?.type === "dismissed") return;

    const currentDate = selectedDate || date;
    setDate(currentDate);
    setPicked(true);
    if (handler && name) {
      handler(name, formatTime(currentDate));
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
          {value && value.length > 0
            ? value
            : picked
              ? formatTime(date)
              : placeHolder}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"time"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TimePicker;

const styles = StyleSheet.create({});
