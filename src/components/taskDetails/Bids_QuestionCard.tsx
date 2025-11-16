import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { TabIcons } from "../../constant/images";
import { Bid } from '../../redux/apis';
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";
import ButtonBG from "../ui/buttons/ButtonBG";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";

const Bids_QuestionCard = ({
  type,
  from = "service",
  status,
  item,
}: {
  type: "bids" | "question";
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
  item?: Bid;
}) => {
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
        showText1={type == "bids"}
        text={item?.provider?.name}
        text1={`⭐ ${item?.provider?.avgRating} (${item?.provider?.totalRatingCount} Reviews)`}
      />
      {type == "bids" && (
        <FlexText
          key={9}
          style={{
            justifyContent: "space-between",
            marginVertical: 10,
            backgroundColor: "#E6F4F1",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View>
            <TextSecondary text="Offered Price " />
            <HeaderDesign text={`₦${item?.price}`} />
          </View>
          <ButtonBG
            style={{
              width: "auto",
            }}
            text={from == "user" ? "Accept" : "Update Offer"}
            handler={() => { }}
          />
        </FlexText>
      )}
      <TextSecondary text={item?.details} />
      {from == "user" && type == "question" && (
        <IconButtonTransparent
          style={{
            marginTop: 10,
            width: 140,
          }}
          text="Chat Now"
          handler={() => console.log("")}
          icon={TabIcons.Chat as ImageSourcePropType}
        />
      )}
    </View>
  );
};

export default Bids_QuestionCard;

const styles = StyleSheet.create({});
