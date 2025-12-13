import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, ImageSourcePropType, TouchableOpacity } from "react-native";
import BackButton from "../../components/shered/BackButton";
import FlexText from "../../components/shered/FlexText";
import TextSecondary from "../../components/shered/TextSecondary";
import { otherIcons } from "../../constant/images";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import Navigate from "../../utils/Navigate";

const RegulationsCenter = () => {
  const {
    params: { id },
  } = useRoute() as {
    params: {
      id: string;
    };
  };
  const navigate = Navigate();
  return (
    <SafeAreaProviderNoScroll>
      <BackButton text={`Resolution Center`} />
      <TouchableOpacity
        onPress={() => navigate("ExtendDate", { id })}
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#E6F4F1",
        }}
      >
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <FlexText>
            <Image source={otherIcons.Calendar as ImageSourcePropType} />
            <TextSecondary text="Ask to Change Completion Date" />
          </FlexText>
          <Image
            style={{
              transform: [{ rotate: "-90deg" }],
            }}
            source={otherIcons.arrowDown as ImageSourcePropType}
          />
        </FlexText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate("RequestCancel", { id })}
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#E6F4F1",
        }}
      >
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <FlexText>
            <Image source={otherIcons.Block as ImageSourcePropType} />
            <TextSecondary text="Request Cancellation" />
          </FlexText>
          <Image
            style={{
              transform: [{ rotate: "-90deg" }],
            }}
            source={otherIcons.arrowDown as ImageSourcePropType}
          />
        </FlexText>
      </TouchableOpacity>
    </SafeAreaProviderNoScroll>
  );
};

export default RegulationsCenter;
