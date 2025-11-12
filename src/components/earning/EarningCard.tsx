import { TouchableOpacity } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { otherIcons } from "../../constant/images";
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextPrimary from "../shered/TextPrimary";
import Divider from "../ui/devider/Divider";
const data = {
  today: {
    amount: 150,
    total_tasks: 5,
    total_time: "6h 0m",
  },
  yesterday: {
    amount: 200,
    total_tasks: 7,
    total_time: "8h 0m",
  },
  "this week": {
    amount: 1200,
    total_tasks: 30,
    total_time: "40h 0m",
  },
  "this month": {
    amount: 4500,
    total_tasks: 110,
    total_time: "160h 0m",
  },
  yearly: {
    amount: 4500,
    total_tasks: 110,
    total_time: "160h 0m",
  },
  lifetime: {
    amount: 4500,
    total_tasks: 110,
    total_time: "160h 0m",
  },
};

const EarningCard = () => {
  const [tab, setTab] = useState("today");
  return (
    <View
      style={{
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#E6F4F1",
      }}
    >
      <HeaderSecondary
        style={{
          textAlign: "center",
        }}
        text={tab}
      />
      <FlexText
        style={{
          justifyContent: "space-between",
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            switch (tab) {
              case "today":
                setTab("lifetime");
                break;
              case "lifetime":
                setTab("yearly");
                break;
              case "yearly":
                setTab("this month");
                break;
              case "this month":
                setTab("this week");
                break;
              case "this week":
                setTab("yesterday");
                break;
              case "yesterday":
                setTab("today");
                break;
            }
          }}
        >
          <Image source={otherIcons.ArrowLeft as ImageSourcePropType} />
        </TouchableOpacity>
        <HeaderDesign text={"₦" + data[tab as keyof typeof data]?.amount} />
        <TouchableOpacity
          onPress={() => {
            switch (tab) {
              case "today":
                setTab("yesterday");
                break;
              case "yesterday":
                setTab("this week");
                break;
              case "this week":
                setTab("this month");
                break;
              case "this month":
                setTab("yearly");
                break;
              case "yearly":
                setTab("lifetime");
                break;
              case "lifetime":
                setTab("today");
                break;
            }
          }}
        >
          <Image
            style={{
              transform: [{ rotate: "180deg" }],
            }}
            source={otherIcons.ArrowLeft as ImageSourcePropType}
          />
        </TouchableOpacity>
      </FlexText>
      <Divider />
      <FlexText
        style={{
          marginTop: 10,
          justifyContent: "space-between",
        }}
      >
        <FlexText>
          <Image source={otherIcons.ArrowBoth as ImageSourcePropType} />
          <TextPrimary
            text={data[tab as keyof typeof data].total_tasks + " Tasks"}
          />
        </FlexText>
        <FlexText>
          <Image source={otherIcons.Time as ImageSourcePropType} />
          <TextPrimary text={data[tab as keyof typeof data].total_time} />
        </FlexText>
      </FlexText>
    </View>
  );
};

export default EarningCard;

const styles = StyleSheet.create({});
