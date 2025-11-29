import React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { svgIcons } from "../../constant/images";
import SvgIcon from "../ui/SvgIcon";

const TabItem = ({
  route,
  label,
  isFocused,
}: {
  route: string;
  label: string;
  isFocused: boolean;
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderTopWidth: isFocused ? 2 : 0,
        borderColor: isFocused ? "#115E59" : "transparent",
        backgroundColor: isFocused ? "#E6F4F1" : "transparent",
      }}
    >
      {/* <Image
        source={TabIcons[label as keyof typeof TabIcons] as ImageSourcePropType}
        style={{
          width: 24,
          height: 24,
          marginBottom: 4,
          tintColor: isFocused ? "#115E59" : "black",
        }}
      /> */}
      <SvgIcon
        component={svgIcons[label as keyof typeof svgIcons] as any}
        width={24}
        height={24}
        color={isFocused ? "#115E59" : "black"}
      />
      <Text
        style={{
          color: isFocused ? "#115E59" : "black",
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default React.memo(TabItem);

const styles = StyleSheet.create({});
