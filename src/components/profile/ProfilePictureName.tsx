import React from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";
import { otherIcons } from "../../constant/images";
import { useGetMyProfileQuery } from "../../redux/apis";
import { ImgUrl } from "../../redux/baseApi";
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";

const ProfilePictureName = () => {
  const { width } = ScreenSize();
  const { data, isLoading } = useGetMyProfileQuery();
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
          source={
            data?.data?.profile_image
              ? { uri: ImgUrl(data?.data?.profile_image + "") }
              : (otherIcons.Avater as ImageSourcePropType)
          }
          style={{
            width: 120,
            height: 120,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#F9FAFB",
            backgroundColor: "#F9FAFB",
          }}
        />
        <HeaderSecondary
          style={{
            fontWeight: 700,
          }}
          text={data?.data?.name}
        />
      </FlexText>
    </>
  );
};

export default ProfilePictureName;

const styles = StyleSheet.create({});
