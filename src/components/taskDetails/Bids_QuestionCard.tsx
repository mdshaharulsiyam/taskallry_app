import React from "react";
import { ImageSourcePropType, StyleSheet, View } from "react-native";
import { TabIcons } from "../../constant/images";
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
}: {
  type: "bids" | "question";
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
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
        text="Ronald Richards"
        text1="⭐ 4.5 (149 Reviews)"
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
            <HeaderDesign text="₦24.00" />
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
      <TextSecondary text="I was a bit nervous to be buying a secondhand phone from Amazon, but I couldn’t be happier with my purchase!! I have a pre-paid data plan so I was worried that this phone wouldn’t connect with my data plan, since the new phones don’t have the physical Sim tray anymore." />
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
