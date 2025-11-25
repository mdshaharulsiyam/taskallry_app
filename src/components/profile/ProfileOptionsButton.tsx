import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { otherIcons } from "../../constant/images";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import TextSecondary from "../shered/TextSecondary";

const ProfileOptionsButton = ({
  name,
  icon,
  href,
}: {
  name: string;
  icon: ImageSourcePropType;
  href: string;
}) => {
  const navigate = Navigate();
  return (
    <TouchableOpacity
      onPress={() => navigate(href)}
      style={{
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 14,
      }}
    >
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <FlexText>
          <Image
            source={icon}
            style={{
              tintColor: "#115E59",
            }}
          />
          <TextSecondary text={name} />
        </FlexText>
        <Image
          style={{
            transform: [{ rotate: "-90deg" }],
          }}
          source={otherIcons.arrowDown as ImageSourcePropType}
        />
      </FlexText>
    </TouchableOpacity>
  );
};

export default ProfileOptionsButton;

const styles = StyleSheet.create({});
