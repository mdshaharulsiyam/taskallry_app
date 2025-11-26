import React from "react";
import { ImageSourcePropType, View, Share } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import Toast from "react-native-toast-message";
import { otherIcons } from "../../constant/images";
import FlexText from "../shered/FlexText";
import SectionHeading from "../shered/SectionHeading";
import TextPrimary from "../shered/TextPrimary";
import ButtonBG from "../ui/buttons/ButtonBG";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";
import { useGetMyProfileQuery } from "../../redux/apis";

const CreateReferral = () => {
  const { data, isLoading, isError } = useGetMyProfileQuery();
  console.log("Profile Data:", data?.data?.referralCode, isLoading, isError);
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <SectionHeading
        showViewButton={false}
        color="#115E59"
        text="Your Referral Code"
      />
      <FlexText
        style={{
          borderWidth: 2,
          borderRadius: 6,
          borderColor: "#115E59",
          justifyContent: "space-between",
        }}
      >
        <TextPrimary
          style={{
            padding: 3,
          }}
          text={data?.data?.referralCode || ""}
        />
        <ButtonBG
          handler={() => {
            const code = data?.data?.referralCode || "";
            Clipboard.setString(code);
            Toast.show({
              type: "success",
              text1: "Copied",
              text2: `${code} copied`,
            });
          }}
          text="Copy Code"
          style={{
            width: "auto",
            borderRadius: 0,
          }}
        />
      </FlexText>
      <FlexText
        style={{
          marginTop: 10,
        }}
      >
        <IconButtonTransparent
          handler={async () => {
            const code = data?.data?.referralCode || "";
            const url = `https://taskalley.app/ref/${code}`;
            try {
              await Share.share({
                message: `Join me on TaskAlley! Use my code ${code} to sign up: ${url}`,
                title: "Share your TaskAlley referral",
                url,
              });
            } catch (e) {}
          }}
          style={{
            width: "auto",
          }}
          text="Share Link"
          icon={otherIcons.Share as ImageSourcePropType}
        />
      </FlexText>
    </View>
  );
};

export default CreateReferral;
