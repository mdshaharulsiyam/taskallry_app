import React from "react";
import { TouchableOpacity } from "react-native";
import { Conversation } from "../../redux/apis/conversationApi";
import { ImgUrl } from "../../redux/baseApi";
import Navigate from "../../utils/Navigate";
import FlexText from "../shered/FlexText";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";

interface ChatItemsProps {
  item: Conversation;
}

const ChatItems = ({ item }: ChatItemsProps) => {
  const navigate = Navigate();

  const timeString = new Date(item.updatedAt || item.lastMessage?.createdAt).toLocaleTimeString(
    undefined,
    { hour: "2-digit", minute: "2-digit" }
  );

  return (
    <TouchableOpacity onPress={() => navigate("Messages", {
      id: item?.userData?._id,
      name: item?.userData?.name,
      image: item?.userData?.profile_image,
      email: item?.userData?.email,
    })}>
      <FlexText
        style={{
          padding: 10,
          borderRadius: 10,
          backgroundColor: "#FFFFFF",
          marginVertical: 5,
          justifyContent: "space-between",
        }}
      >
        <ImageFlex
          image={ImgUrl(item.userData?.profile_image || "")}
          text={item.userData?.name || ""}
          text1={item.lastMessage?.text || ""}
        />
        <TextSecondary
          style={{
            fontSize: 12,
          }}
          text={timeString}
        />
      </FlexText>
    </TouchableOpacity>
  );
};

export default ChatItems;

