import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { otherIcons } from "../../constant/images";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import TextSecondary from "../shered/TextSecondary";
import { ImgUrl } from "../../redux/baseApi";

const CategoryButton = ({
  style,
  name,
  width,
  image,
}: {
  style?: ViewStyle;
  name: string;
  width?: number;
  image?: string;
}) => {
  const navigate = Navigate();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate("Search", {
          category_id: name,
        })
      }
    >
      <FlexText
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          marginHorizontal: 5,
          ...style,
        }}
      >
        <View
          style={{
            backgroundColor: "#E6F4F1",
            width: width ?? "100%",
            height: width,
            flex: 1,
            borderRadius: 1000,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              objectFit: "contain",
              height: 40,
              width: 40,
            }}
            source={{
              uri: image ? ImgUrl(image) : "https://placehold.co/400x400.png",
            }}
          />
        </View>
        <TextSecondary
          style={{
            textAlign: "center",
          }}
          text={name}
        />
      </FlexText>
    </TouchableOpacity>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({});
