import React from "react";
import { View } from "react-native";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";

interface ReviewCardProps {
  type?: "review";
  author?: string;
  rating?: number;
  details?: string;
  image: string;
}

const ReviewCard = ({
  type = "review",
  author,
  rating,
  details,
  image,
}: ReviewCardProps) => {
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <ImageFlex
        showText1={type == "review"}
        text={author || "Ronald Richards"}
        text1={`⭐ ${rating ?? 4.5}`}
        image={image}
      />
      <TextSecondary
        text={
          details ||
          "I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn’t connect with my data plan, since the new phones don’t have the physical Sim tray anymore."
        }
      />
    </View>
  );
};

export default ReviewCard;
