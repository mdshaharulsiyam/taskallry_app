import React from "react";
import { Image } from "react-native";
import { ImgUrl } from "../../redux/baseApi";
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";

const FlexImages = ({ images = [] as string[] }: { images?: string[] }) => {
  const { width } = ScreenSize();
  const safeImages = (images || []).filter(Boolean);

  if (safeImages.length === 0) {
    return null;
  }

  const primaryImage = safeImages[0];
  const secondaryImages = safeImages.slice(1);
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
        source={{ uri: ImgUrl(primaryImage) }}
      />
      <FlexText
        style={{
          width: (width - 60) / 2,
          height: 150,
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {secondaryImages.map((img, index) => (
          <Image
            key={`${img}-${index}`}
            style={{
              width: (width - 70) / 4,
              height: 70,
              borderRadius: 4,
            }}
            source={{ uri: ImgUrl(img) }}
          />
        ))}
      </FlexText>
    </FlexText>
  );
};

export default FlexImages;
