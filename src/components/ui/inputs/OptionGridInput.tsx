import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import HeaderSecondary from "../../shered/HeaderSecondary";

type Option = {
  label: string;
  value: string;
};

const OptionGridInput = ({
  options = [],
  value,
  handler,
  name,
  onChange,
  style,
  label = "Select an option",
  required = true,
  showLabel = true,
}: {
  options: Option[];
  value?: string;
  handler?: (name: string, value: string) => void;
  name?: string;
  onChange?: (value: string) => void;
  style?: ViewStyle;
  label?: string;
  required?: boolean;
  showLabel?: boolean;
}) => {
  const onSelect = (v: string) => {
    if (name && handler) handler(name, v);
    else onChange?.(v);
  };

  return (
    <View style={{ backgroundColor: "transparent", ...style }}>
      {showLabel && (
        <HeaderSecondary
          style={{
            color: required ? (false ? "red" : "#111827") : "#111827",
            marginBottom: 5,
          }}
          text={label}
        />
      )}

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
      >
        {options.map((opt, idx) => {
          const selected = value === opt.value;
          return (
            <TouchableOpacity
              key={opt.value + idx}
              activeOpacity={0.8}
              onPress={() => onSelect(opt.value)}
              style={{
                marginRight: 12,
                marginBottom: 0,
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderRadius: 12,
                backgroundColor: selected ? "#DCEFEA" : "#E6F4F1",
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? "#115E59" : "#D1D5DB",
                flexDirection: "row",
                alignItems: "center",
                width: 180,
              }}
              accessibilityRole="button"
              accessibilityState={{ selected }}
            >
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  borderWidth: selected ? 6 : 1.5,
                  borderColor: selected ? "#115E59" : "#9CA3AF",
                  backgroundColor: selected ? "#115E59" : "transparent",
                  marginRight: 10,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  color: "#111827",
                  fontSize: 15,
                  fontWeight: selected ? "600" : "500",
                }}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default OptionGridInput;
