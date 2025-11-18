import React from "react";
import { Image } from "react-native";
import { ImgUrl } from '../../redux/baseApi';
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";

const FlexImages = ({
  images
}: {
  images: string[];
}) => {
  const { width } = ScreenSize();
  return (
    <FlexText
      style={{
        gap: 10,
        marginTop: 10,
      }}
    >
      <Image
        style={{
          width: (width - 60) / 2,
          height: 150,
          borderRadius: 4,
        }}
        source={{ uri: ImgUrl(images[0]) }}
      />
      <FlexText
        style={{
          width: (width - 60) / 2,
          height: 150,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {[...Array(images.length - 1).keys()].map((item) => (
          <Image
            key={item}
            style={{
              width: (width - 70) / 4,
              height: 70,
              borderRadius: 4,
            }}
            source={{ uri: ImgUrl(images[item + 1]) }}
          />
        ))}
      </FlexText>
    </FlexText>
  );
};

export default FlexImages;
