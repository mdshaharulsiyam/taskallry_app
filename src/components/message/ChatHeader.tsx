import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { otherIcons } from "../../constant/images";
import { ImgUrl } from "../../redux/baseApi";
import FlexText from "../shered/FlexText";
import CircleButton from "../ui/buttons/CircleButton";

interface propType {
  text?: string;
  show?: boolean;
  imageSource?: ImageSourcePropType;
  handler?: () => void;
  name?: string;
  email?: string;
  avatar?: string;
}
const ChatHeader = ({
  text,
  show = false,
  imageSource,
  handler,
  name,
  email,
  avatar,
}: propType) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        justifyContent: "space-between",
        marginTop: 5,
        marginBottom: 10,
        height: 60,
      }}
    >
      <FlexText
        style={{
          alignItems: "center",
        }}
      >
        <CircleButton
          style={{
            height: 30,
            width: 30,
            borderRadius: 30,
            marginTop: 10,
            backgroundColor: "#E6F4F1",
            borderColor: "#115E59",
            borderWidth: 1,
          }}
          imageSource={otherIcons.ArrowLeft as ImageSourcePropType}
          onPress={() => navigation.goBack()}
        />
        <FlexText
          style={{
            marginBottom: -6,
          }}
        >
          <Image
            src={ImgUrl(avatar || "https://placehold.co/400x400.png")}
            style={{
              height: 40,
              width: 40,
              borderRadius: 100,
            }}
          />
          <View>
            <Text
              style={{
                fontWeight: 600,
              }}
            >
              {name || text || ""}
            </Text>
            <Text
              style={{
                fontSize: 12,
              }}
            >
              {email || ""}
            </Text>
          </View>
        </FlexText>
      </FlexText>
      {show ? (
        <CircleButton
          style={{
            height: 30,
            width: 30,
            borderRadius: 30,
            marginTop: 10,
            backgroundColor: "#E6F4F1",
            borderColor: "#115E59",
            borderWidth: 1,
          }}
          imageSource={
            imageSource
              ? imageSource
              : (otherIcons.Report as ImageSourcePropType)
          }
          onPress={() => handler?.()}
        />
      ) : (
        <Text></Text>
      )}
    </View>
  );
};
export default ChatHeader;
