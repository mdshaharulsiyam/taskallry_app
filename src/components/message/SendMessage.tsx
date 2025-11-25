import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { otherIcons } from "../../constant/images";
import { useUploadConversationFileMutation } from "../../redux/apis/conversationApi";
import { PickedFile, SelectImage } from "../../utils/imagePick";
import FlexText from "../shered/FlexText";

type SendPayload = {
  text: string;
  imageUrls?: string[];
  pdfUrls?: string[];
};

const SendMessage = ({
  onSend,
}: {
  onSend: (payload: SendPayload) => void | Promise<void>;
}) => {
  const [text, setText] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [file, setFile] = useState<PickedFile | null>(null);
  const [uploadConversationFile] = useUploadConversationFileMutation();

  const handlePickFile = async () => {
    const picked = await SelectImage();
    if (picked) {
      setFile(picked);
    }
  };
  const handleSend = async () => {
    const trimmed = text.trim();
    if ((!trimmed && !file) || isSending) return;

    try {
      setIsSending(true);

      let imageUrls: string[] | undefined;
      let pdfUrls: string[] | undefined;

      if (file) {
        const formData = new FormData();
        const isImage = file.type?.startsWith("image/");

        formData.append(
          isImage ? "conversation_image" : "conversation_pdf",
          {
            uri: file.uri,
            name: file.name,
            type: file.type,
          } as any
        );

        const res = await uploadConversationFile(formData).unwrap();
        if (res?.success) {
          if (res.data.images?.length > 0) imageUrls = [res.data.images?.[0]];
          else if (res.data.pdfs?.length > 0) pdfUrls = [res.data.pdfs?.[0]];
        }
      }

      await onSend({ text: trimmed, imageUrls, pdfUrls });
      setText("");
      setFile(null);
    } finally {
      setIsSending(false);
    }
  };
  return (
    <FlexText
      style={{
        height: 60,
        justifyContent: "space-between",
      }}
    >
      <TouchableOpacity onPress={handlePickFile}>
        <Image
          source={otherIcons.Image as ImageSourcePropType}
          style={{
            tintColor: "#115E59",
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          marginHorizontal: 8,
          position: "relative",
        }}
      >
        <TextInput
          style={{
            borderWidth: 1,
            width: "100%",
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
        {file && (
          <View
            style={{
              position: "absolute",
              bottom: 40 + 6,
              left: 8,
              flexDirection: "row",
              alignItems: "center",
              maxWidth: "85%",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor: "#FFFFFF",
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Image
              source={otherIcons.Image as ImageSourcePropType}
              style={{
                width: 18,
                height: 18,
                tintColor: "#115E59",
                marginRight: 6,
              }}
            />
            <Text
              numberOfLines={1}
              style={{ flex: 1, fontSize: 13, color: "#111827" }}
            >
              {file.name}
            </Text>
            <TouchableOpacity onPress={() => setFile(null)}>
              <Text style={{ fontSize: 14, color: "#EF4444", marginLeft: 8 }}>
                ×
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <TouchableOpacity onPress={handleSend} disabled={isSending}>
        {isSending ? (
          <ActivityIndicator size="small" color="#115E59" />
        ) : (
          <Image
            source={otherIcons.Send as ImageSourcePropType}
            style={{
              tintColor: "#115E59",
            }}
          />
        )}
      </TouchableOpacity>
    </FlexText>
  );
};

export default SendMessage;

const styles = StyleSheet.create({});
