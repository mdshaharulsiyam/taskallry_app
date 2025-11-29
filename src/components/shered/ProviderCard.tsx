import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import { Service } from "../../redux/apis";
import { ImgUrl } from "../../redux/baseApi";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";
import ButtonGreenOpacity30 from "../ui/buttons/ButtonGreenOpacity30";
import FlexCardIcon from "./FlexCardIcon";
import FlexText from "./FlexText";
import HeaderDesign from "./HeaderDesign";
import TextPrimary from "./TextPrimary";
import TextSecondary from "./TextSecondary";

const ProviderCard = ({ item }: { item: Service }) => {
  const { width } = ScreenSize();
  const navigate = Navigate();
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 6,
        marginTop: 10,
        position: "relative",
      }}
    >
      <Image
        src={ImgUrl(item?.images[0])}
        style={{
          height: (width - 60) / 1.5,
          width: width - 60,
          borderRadius: 5,
        }}
      />
      <FlexText
        style={{
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <FlexCardIcon
          image={otherIcons.Location as ImageSourcePropType}
          text={item?.address}
        />
        <TextPrimary text="⭐ 4.5" />
      </FlexText>
      <HeaderDesign
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginVertical: 6,
        }}
        text={item?.title}
      />
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <FlexText
          style={{
            alignItems: "flex-end",
          }}
        >
          <HeaderDesign
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
            text={`₦${item?.price}`}
          />
          <TextSecondary
            style={{
              textDecorationLine: "line-through",
            }}
            text={`₦${item?.price}`}
          />
        </FlexText>
        <ButtonGreenOpacity30
          textStyle={{
            color: "#115E59",
          }}
          text="Book Now"
          style={{
            width: "auto",
          }}
          handler={() => navigate("ProviderDetails", { id: item?._id })}
        />
      </FlexText>
      <TextSecondary
        text={item?.category?.name}
        style={{
          color: "#115E59",
          backgroundColor: "#E6F4F1",
          position: "absolute",
          paddingHorizontal: 10,
          paddingVertical: 3,
          borderRadius: 5,
          top: 20,
          left: 20,
        }}
      />
    </View>
  );
};

export default React.memo(ProviderCard);
