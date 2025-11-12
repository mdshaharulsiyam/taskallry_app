import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import { otherIcons } from "../../constant/images";
import ScreenSize from "../../utils/ScreenSize";

const ProfilePictureName = () => {
  const { width } = ScreenSize();
  return (
    <>
      <Image
        source={otherIcons.ProfileImage as ImageSourcePropType}
        style={{
          width: width,
          top: 0,
          left: 0,
          zIndex: -1000000,
        }}
      />
      <FlexText
        style={{
          flexDirection: "column",
          marginTop: -60,
          paddingHorizontal: 20,
        }}
      >
        <Image
          src="https://placehold.co/400x400.png"
          style={{
            width: 120,
            height: 120,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#F9FAFB",
          }}
        />
        <HeaderSecondary
          style={{
            fontWeight: 700,
          }}
          text="Shaharul Siyam"
        />
      </FlexText>
    </>
  );
};

export default ProfilePictureName;

const styles = StyleSheet.create({});
