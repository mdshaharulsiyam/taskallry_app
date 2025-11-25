import React from "react";
import { FlatList, ImageSourcePropType, View } from "react-native";
import Toast from "react-native-toast-message";
import { otherIcons } from "../../constant/images";
import { Service, useToggleServiceStatusMutation } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextSecondary from "../shered/TextSecondary";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";

const Description = ({ service }: { service?: Service }) => {
  const data = [
    `Certified & Verified: ✅`,
    `Customer Rating: ⭐ ${service?.averageRating}(${service?.totalRating} + Reviews)`,
    `Price Range: Starting from ₦${service?.price}`,
  ];
  const navigate = Navigate();
  const [toggleServiceStatus, { isLoading }] = useToggleServiceStatusMutation();
  const elem = [
    <View
      style={{
        marginTop: 10,
        paddingBottom: 120,
      }}
    >
      <HeaderSecondary text="Description  :- " />
      <TextSecondary text={service?.description} />
      {data.map((item, index) => (
        <TextSecondary key={index} text={item} />
      ))}
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
            borderColor: service?.isActive ? "red" : "green",
          }}
          color={service?.isActive ? "red" : "green"}
          handler={async () => {
            if (isLoading || !service?._id) return;
            try {
              await toggleServiceStatus({ id: service._id }).unwrap();
              Toast.show({
                type: "success",
                text1: "Service status updated",
              });
            } catch (error: any) {
              Toast.show({
                type: "error",
                text1: error?.data?.message || "Failed to update status",
              });
            }
          }}
          text={
            isLoading
              ? "Updating..."
              : service?.isActive
              ? "Make Inactive"
              : "Make Active"
          }
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
