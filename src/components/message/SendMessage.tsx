import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { otherIcons } from "../../constant/images";
import { SelectImage } from "../../utils/imagePick";
import FlexText from "../shered/FlexText";

const SendMessage = ({ onSend }: { onSend: (text: string) => void }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  };
  return (
    <FlexText
      style={{
        height: 60,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={() => SelectImage()}>
        <Image
          source={otherIcons.Image as ImageSourcePropType}
          style={{
            tintColor: "#115E59",
          }}
        />
      </TouchableOpacity>
      <TextInput
        style={{
          borderWidth: 1,
          width: "70%",
          height: 40,
          borderRadius: 20,
          color: "#000000",
          paddingHorizontal: 12,
        }}
        placeholder="Type a message"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleSend}
        returnKeyType="send"
      />
      <TouchableOpacity onPress={handleSend}>
        <Image
          source={otherIcons.Send as ImageSourcePropType}
          style={{
            tintColor: "#115E59",
          }}
        />
      </TouchableOpacity>
    </FlexText>
  );
};

export default SendMessage;

const styles = StyleSheet.create({});
