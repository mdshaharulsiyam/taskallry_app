import React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { ImgUrl } from "../../redux/baseApi";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import TextPrimary from "../shered/TextPrimary";
import TextSecondary from "../shered/TextSecondary";

const CategorySquareButton = ({
  style,
  name,
  width,
  image,
  totalProviders,
}: {
  style?: ViewStyle;
  name: string;
  width?: number;
  image?: string;
  totalProviders?: number;
}) => {
  const navigate = Navigate();
  return (
    <TouchableOpacity
      onPress={() =>
        navigate("Search", {
          category_id: name,
        })
      }
      style={{
        backgroundColor: "#E6F4F1",
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#115E59",
        borderRadius: 8,
      }}
    >
      <FlexText
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
          ...style,
        }}
      >
        <View
          style={{
            width: width ?? "100%",
            flex: 1,
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
        <TextPrimary style={{ fontWeight: 700, textAlign: "center", paddingHorizontal: 5 }} text={name} />
        <TextSecondary
          style={{
            marginTop: -6,
            textAlign: "center",
          }}
          text={`${totalProviders} Providers`}
        />
      </FlexText>
    </TouchableOpacity>
  );
};

export default CategorySquareButton;
