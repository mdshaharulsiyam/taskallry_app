import { useRoute } from "@react-navigation/native";
import React, { Suspense, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../components/shered/FlexText";
import SectionHeading from "../../components/shered/SectionHeading";
import TextPrimary from "../../components/shered/TextPrimary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../components/ui/buttons/ButtonTransparentBG";
import ImageUploader from "../../components/ui/file/ImageUploader";
import PostTaskFields from "../../formFields/PostTaskFields";
import { handlePostTask } from "../../handler/postTask";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { Task, useCreateTaskMutation } from "../../redux/apis";
import { FieldsType } from "../../types/Types";
import Navigate from "../../utils/Navigate";
import { RenderField } from "../../utils/RenderField";
import ScreenSize from "../../utils/ScreenSize";
const slide = [
  {
    skip: 0,
    keep: 2,
  },
  {
    skip: 2,
    keep: 1,
  },
  {
    skip: 3,
    keep: 5,
  },
  {
    skip: 8,
    keep: 2,
  },
  {
    skip: 10,
    keep: 1,
  },
];

const title = ["Task Overview", "Task Details", "Date & Time", "Budget "];

const PostTask = () => {
  const route = useRoute() as any;
  const task = route?.params?.task as Task | undefined;
  const provider = route?.params?.id as string | undefined;
  const [create, { isLoading }] = useCreateTaskMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fiels, setFiels] = useState<any>([]);
  const { height } = ScreenSize();
  const { fields, setFields } = PostTaskFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();

  useEffect(() => {
    if (!task) return;
    setFields((prev: FieldsType[]) =>
      prev.map((field) => {
        switch (field.name) {
          case "title":
            return { ...field, value: task.title || "" };
          case "task_category":
            return { ...field, value: task.category?._id || "" };
          case "desc":
            return { ...field, value: task.description || "" };
          case "type":
            return { ...field, value: task.doneBy || "" };
          case "place":
            return { ...field, value: task.address || "" };
          case "flexible":
            return { ...field, value: task.scheduleType || "" };
          case "date":
            return { ...field, value: task.preferredDate || "" };
          case "time":
            return { ...field, value: task.preferredTime || "" };
          case "offer":
            return { ...field, value: String(task.budget ?? "") };
          default:
            return field;
        }
      })
    );
  }, [task, setFields]);
  return (
    <SafeAreaProvider>
      <Suspense>
        <View
          style={{
            flex: 1,
            gap: 6,
            justifyContent: "flex-start",
            minHeight: height - top - bottom,
            paddingBottom: 90,
            marginTop: 10,
          }}
        >
          <SectionHeading text={title[currentSlide]} showViewButton={false} />
          {fields
            ?.slice(
              slide[currentSlide].skip,
              slide[currentSlide].keep + slide[currentSlide].skip
            )
            ?.map((field: FieldsType) => RenderField(field, setFields))}
          {currentSlide == 1 && (
            <View>
              <TextPrimary text="Attachments (optional)" />
              <FlexText>
                {fiels?.length > 0 && (
                  <Image
                    source={{ uri: fiels?.[0]?.uri }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 8,
                      marginRight: 8,
                      resizeMode: "contain",
                    }}
                  />
                )}
                <ImageUploader setFiels={setFiels} />
              </FlexText>
            </View>
          )}
          <FlexText
            style={{
              marginTop: 6,
            }}
          >
            {currentSlide != 0 && (
              <ButtonTransparentBG
                disabled={isLoading}
                style={{
                  width: "auto",
                }}
                text="Previous"
                handler={() => setCurrentSlide((prev) => prev - 1)}
              />
            )}
            <ButtonBG
              disabled={isLoading}
              style={{
                width: "auto",
              }}
              text={
                currentSlide == 3
                  ? isLoading
                    ? "loading..."
                    : "Post"
                  : "Continue"
              }
              handler={() => {
                const isValid = handlePostTask(
                  fields?.slice(
                    slide[currentSlide].skip,
                    slide[currentSlide].keep + slide[currentSlide].skip
                  ),
                  setFields,
                  currentSlide,
                  fields,
                  create,
                  fiels,
                  () => {
                    navigate("Task");
                    setCurrentSlide(0);
                    setFiels([]);
                  },
                  provider
                );

                if (isValid && currentSlide < 3) {
                  setCurrentSlide((prev) => prev + 1);
                }
              }}
            />
          </FlexText>
        </View>
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(PostTask);
