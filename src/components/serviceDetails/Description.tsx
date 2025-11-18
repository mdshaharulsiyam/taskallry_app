import React from "react";
import { FlatList, ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextSecondary from "../shered/TextSecondary";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";

const Description = ({
  service
}: {
  service?: any;
}) => {
  const data = [
    `Certified & Verified: ✅`,
    `Customer Rating: ⭐ ${service?.averageRating}(${service?.totalRating} + Reviews)`,
    `Price Range: Starting from ₦${service?.price}`,
  ];
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
        text={service?.description}
      />
      {
        data.map((item, index) => (
          <TextSecondary key={index} text={item} />
        ))
      }
      <FlexText>
        <IconButtonTransparent
          style={{
            width: "auto",
          }}
          handler={() => navigate("AddUpdateService", { id: service?._id })}
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
