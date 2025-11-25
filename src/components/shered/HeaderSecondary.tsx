import React from "react";
import { Text, TextStyle } from "react-native";

const HeaderSecondary = ({
  text,
  style,
  numberOfLines,
}: {
  text?: string;
  style?: TextStyle;
  numberOfLines?: number;
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        {
          fontFamily: "Poppins",
          fontSize: 14,
          color: "#111827",
          fontWeight: 500,
          textTransform: "capitalize",
          lineHeight: 24,
        },
        style,
      ]}
    >
      {text ?? "text here"}
    </Text>
  );
};

export default HeaderSecondary;
