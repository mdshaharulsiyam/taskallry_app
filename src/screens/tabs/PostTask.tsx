import { useRoute } from "@react-navigation/native";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../components/shered/FlexText";
import SectionHeading from "../../components/shered/SectionHeading";
import TextPrimary from "../../components/shered/TextPrimary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../components/ui/buttons/ButtonTransparentBG";
import ImageUploader from "../../components/ui/file/ImageUploader";
import DatePicker from "../../components/ui/inputs/DatePicker";
import Input from "../../components/ui/inputs/Input";
import InputCheckbox from "../../components/ui/inputs/InputCheckbox";
import LocationInput from "../../components/ui/inputs/LocationInput";
import OptionGridInput from "../../components/ui/inputs/OptionGridInput";
import SelectInput from "../../components/ui/inputs/SelectInput";
import TextArea from "../../components/ui/inputs/TextArea";
import TimePicker from "../../components/ui/inputs/TimePicker";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { Task, useCreateTaskMutation, useGetAllCategoriesQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";

const SLIDE_TITLES = [
  "Task Overview",
  "Task Details",
  "Date & Time",
  "Budget ",
];

const TASK_TYPE_OPTIONS = [
  { label: "In-Person", value: "IN_PERSON" },
  { label: "Online", value: "ONLINE" },
];

const FLEXIBILITY_OPTIONS = [
  { label: "Fixed Date & Time", value: "FIXED_DATE_AND_TIME" },
  { label: "Flexible", value: "FLEXIBLE" },
];

const SLIDE_FIELD_MAP: Record<number, (keyof FormState)[]> = {
  0: ["title", "task_category"],
  1: ["desc"],
  2: ["type", "place", "flexible", "date", "time"],
  3: ["offer", "confirm"],
};

type FormState = {
  title: string;
  task_category: string;
  desc: string;
  type: string;
  place: string;
  flexible: string;
  date: string;
  time: string;
  offer: string;
  confirm: boolean;
};

const PostTask = () => {
  const route = useRoute() as any;
  const task = route?.params?.task as Task | undefined;
  const provider = route?.params?.id as string | undefined;
  const [create, { isLoading }] = useCreateTaskMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fiels, setFiels] = useState<any>([]);
  const { height } = ScreenSize();
  const { data: categoryData } = useGetAllCategoriesQuery({ limit: 9999999 });
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  const [formState, setFormState] = useState<FormState>({
    title: "",
    task_category: "",
    desc: "",
    type: "",
    place: "",
    flexible: "",
    date: "",
    time: "",
    offer: "1000",
    confirm: true,
  });
  const [errors, setErrors] = useState<Record<keyof FormState, string | undefined>>({
    title: undefined,
    task_category: undefined,
    desc: undefined,
    type: undefined,
    place: undefined,
    flexible: undefined,
    date: undefined,
    time: undefined,
    offer: undefined,
    confirm: undefined,
  });

  const categoryOptions = useMemo(
    () =>
      categoryData?.data?.result?.map((item: any) => ({
        label: item.name,
        value: item._id,
      })) ?? [],
    [categoryData]
  );

  useEffect(() => {
    if (!task) return;
    setFormState((prev) => ({
      ...prev,
      title: task.title || "",
      task_category: task.category?._id || "",
      desc: task.description || "",
      type: task.doneBy || prev.type,
      place: task.address || prev.place,
      flexible: task.scheduleType || prev.flexible,
      date: task.preferredDate || prev.date,
      time: task.preferredTime || prev.time,
      offer: String(task.budget ?? prev.offer),
    }));
  }, [task]);

  const setFieldValue = useCallback(
    (name: keyof FormState, value: string | boolean) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    },
    []
  );

  const validateSlide = useCallback(
    (slideIndex: number) => {
      const requiredFields = SLIDE_FIELD_MAP[slideIndex] || [];
      const newErrors: Record<keyof FormState, string | undefined> = {
        ...errors,
      };
      let isValid = true;
      requiredFields.forEach((field) => {
        const value = formState[field];
        if (field === "confirm") {
          if (!value) {
            newErrors[field] = "Please confirm";
            isValid = false;
          }
          return;
        }
        if (!value || (typeof value === "string" && value.trim() === "")) {
          newErrors[field] = "Required";
          isValid = false;
        }
      });
      if (!isValid) {
        setErrors(newErrors);
      }
      return isValid;
    },
    [errors, formState]
  );

  const buildFormData = () => {
    const latino = formState.place?.split("|")?.[1]
      ? JSON.parse(formState.place.split("|")[1])
      : { lat: 0, lng: 0 };

    const data = {
      title: formState.title,
      category: formState.task_category,
      budget: Number(formState.offer) || 0,
      payOn: "completion",
      ...(provider && { provider }),
      location: {
        type: "Point",
        coordinates: [latino?.lng ?? 0, latino?.lat ?? 0],
      },
      doneBy: formState.type || "ONLINE",
      address: formState.place?.split("|")?.[0] ?? "",
      scheduleType: formState.flexible,
      preferredDate: formState.date,
      preferredTime: formState.time,
      description: formState.desc,
      preferredDeliveryDateTime: `${formState.date} ${formState.time}`,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (fiels?.length) {
      formData.append("task_attachments", fiels[fiels.length - 1]);
    }
    return formData;
  };

  const handleSubmit = () => {
    if (!validateSlide(currentSlide)) return;
    if (currentSlide !== SLIDE_TITLES.length - 1) {
      setCurrentSlide((prev) => prev + 1);
      return;
    }

    const formData = buildFormData();
    create(formData)
      .unwrap()
      .then(() => {
        navigate("Task");
        setCurrentSlide(0);
        setFiels([]);
      })
      .catch(() => { });
  };

  const renderSlideContent = () => {
    switch (currentSlide) {
      case 0:
        return (
          <>
            <Input
              keyboard="default"
              label="Task Title"
              placeHolder="Enter Task Title"
              value={formState.title}
              handler={(name, value) => setFieldValue("title", value)}
              name="title"
              error={!!errors.title}
            />
            <SelectInput
              label="Task Category"
              placeHolder="Select Task Category"
              options={categoryOptions}
              value={formState.task_category}
              handler={(name, value) =>
                setFieldValue("task_category", value as string)
              }
              name="task_category"
              required
              error={!!errors.task_category}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextArea
              keyboard="default"
              label="Enter Task Description"
              placeHolder="Clearly explain what needs to be done"
              value={formState.desc}
              handler={(name, value) => setFieldValue("desc", value)}
              name="desc"
              error={!!errors.desc}
            />
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
          </>
        );
      case 2:
        return (
          <>
            <OptionGridInput
              label="How should the task be done?"
              options={TASK_TYPE_OPTIONS}
              value={formState.type}
              handler={(name, value) => setFieldValue("type", value)}
              name="type"
              required
            />
            <LocationInput
              label="Where to Go to Complete the Task"
              placeHolder="Enter address"
              value={formState.place}
              handler={(name, value) => setFieldValue("place", value)}
              name="place"
              error={!!errors.place}
            />
            <OptionGridInput
              label="When should the task be done?"
              options={FLEXIBILITY_OPTIONS}
              value={formState.flexible}
              handler={(name, value) => setFieldValue("flexible", value)}
              name="flexible"
              required
            />
            <DatePicker
              label="Preferred Date"
              value={formState.date}
              handler={(name, value) => setFieldValue("date", value)}
              name="date"
              error={!!errors.date}
            />
            <TimePicker
              label="Preferred Time"
              value={formState.time}
              handler={(name, value) => setFieldValue("time", value)}
              name="time"
              error={!!errors.time}
            />
          </>
        );
      case 3:
      default:
        return (
          <>
            <Input
              keyboard="numeric"
              label="How much are you offering?"
              placeHolder="Enter budget"
              value={formState.offer}
              handler={(name, value) => setFieldValue("offer", value)}
              name="offer"
              error={!!errors.offer}
            />
            <InputCheckbox
              label="I confirm this task complies with all platform rules and community guidelines."
              value={formState.confirm}
              handler={(name, value) => setFieldValue("confirm", value)}
              name="confirm"
            />
          </>
        );
    }
  };

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
          <SectionHeading text={SLIDE_TITLES[currentSlide]} showViewButton={false} />
          {renderSlideContent()}
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
                currentSlide === SLIDE_TITLES.length - 1
                  ? isLoading
                    ? "loading..."
                    : "Post"
                  : "Continue"
              }
              handler={handleSubmit}
            />
          </FlexText>
        </View>
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(PostTask);
