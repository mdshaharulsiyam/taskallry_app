import React, { useState } from "react";
import { Image, ImageSourcePropType, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { otherIcons } from "../../constant/images";
import { useCreateQuestionMutation } from "../../redux/apis";
import FlexText from "../shered/FlexText";
import ButtonBG from "../ui/buttons/ButtonBG";
import ImageUploader from "../ui/file/ImageUploader";

const QuestionForm = ({ taskId }: { taskId: string }) => {
  const [value, setValue] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [createQuestion, { isLoading }] = useCreateQuestionMutation();

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      Toast.show({
        type: "error",
        text1: "Please enter a question",
      });
      return;
    }

    const data = {
      task: taskId,
      details: trimmed,
    };
    console.log(data);
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("question_image", files[files.length - 1]);

    createQuestion(formData as any)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Question sent successfully",
        });
        setValue("");
        setFiles([]);
      })
      .catch((error) => {
        console.log(error);
        Toast.show({
          type: "error",
          text1: error?.data?.message || "Failed to send question",
        });
      });
  };
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#E6F4F1",
        marginTop: 10,
      }}
    >
      <TextInput
        value={value}
        style={{
          textAlignVertical: "top",
        }}
        multiline={true}
        onChangeText={(text) => setValue(text)}
        placeholder="Type your text here..."
      />
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <ImageUploader
          component={
            files.length > 0 ? (
              <Image
                source={{ uri: files[files.length - 1]?.uri }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 4,
                  marginBottom: 4,
                }}
              />
            ) : (
              <Image source={otherIcons.Image as ImageSourcePropType} />
            )
          }
          setFiels={setFiles}
        />
        <ButtonBG
          text={isLoading ? "Sending..." : "Send"}
          style={{
            width: "auto",
          }}
          handler={handleSend}
        />
      </FlexText>
    </View>
  );
};

export default QuestionForm;
