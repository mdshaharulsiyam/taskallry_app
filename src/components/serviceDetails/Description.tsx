import React from "react";
import { FlatList, ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextSecondary from "../shered/TextSecondary";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";

const Description = () => {
  const navigate = Navigate();
  const elem = [
    <View
      style={{
        marginTop: 10,
        paddingBottom: 120,
      }}
    >
      <HeaderSecondary text="Description  :- " />
      <TextSecondary
        text={`─Delivering professional, reliable, and efficient service in your area, this provider brings a strong reputation and years of experience. Whether it's home maintenance, repairs, or skilled labor, you'll benefit from clean execution, attention to detail, and a commitment to customer satisfaction.
📋 Service Details
Category: Home Cleaning & Maintenance
Experience: 5+ Years
Location: Manhattan, New York
Availability: 7 Days a Week
On-Site Support: Yes
Tools Provided: Yes
Certified & Verified: ✅
Customer Rating: ⭐ 4.8 (320+ Reviews)
Languages Spoken: English, Spanish
Price Range: Starting from ₦50`}
      />
      <FlexText>
        <IconButtonTransparent
          style={{
            width: "auto",
          }}
          handler={() => navigate("AddUpdateService")}
          icon={otherIcons.Edit as ImageSourcePropType}
          text="Update Details"
        />
        <IconButtonTransparent
          icon={otherIcons.Block as ImageSourcePropType}
          style={{
            width: "auto",
            borderColor: "red",
          }}
          color="red"
          handler={() => console.log("")}
          text="Make Inactive"
        />
      </FlexText>
    </View>,
  ];
  return (
    <FlatList
      data={elem}
      keyExtractor={(item, i) => i?.toString()}
      renderItem={({ item }) => item}
    />
  );
};

export default Description;
