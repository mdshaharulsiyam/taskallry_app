import { useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../../components/ui/buttons/ButtonGreenOpacity30";
import DatePicker from "../../components/ui/inputs/DatePicker";
import TextArea from "../../components/ui/inputs/TextArea";
import TimePicker from "../../components/ui/inputs/TimePicker";
import { handleExtendDate } from "../../handler/extendDate";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { useCreateExtensionRequestMutation } from "../../redux/apis";
import { Navigation } from "../../utils/Navigate";

const ExtendDate = () => {
  const { height } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();
  const navigation = Navigation();
  const {
    params: { id },
  } = useRoute() as {
    params: {
      id: string;
    };
  };
  const [createExtensionRequest, { isLoading }] =
    useCreateExtensionRequestMutation();
  const [formState, setFormState] = useState({
    date: "",
    time: "",
    reason: "",
  });
  const [errors, setErrors] = useState({
    date: "",
    time: "",
    reason: "",
  });

  const setFieldValue = useCallback(
    (name: keyof typeof formState, value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const validate = () => {
    const nextErrors = { ...errors };
    let hasError = false;
    (Object.keys(formState) as (keyof typeof formState)[]).forEach((key) => {
      if (!formState[key] || formState[key].trim() === "") {
        nextErrors[key] = "Required";
        hasError = true;
      }
    });
    setErrors(nextErrors);
    return !hasError;
  };

  return (
    <SafeAreaProvider backButtonText=" ">
      {/* <View
        style={{
          flex: 1,
          gap: 6,
          justifyContent: "center",
          minHeight: height - top - bottom,
        }}
      > */}
      <HeaderDesign text="Request Change of Task Completion Date" />
      <TextSecondary text="Submit a request to update the agreed completion date." />

      <DatePicker
        label="New Proposed Date"
        placeHolder="Select Date"
        value={formState.date}
        handler={(_, value) => setFieldValue("date", value)}
        name="date"
        error={!!errors.date}
      />
      <TimePicker
        label="New Proposed Time"
        placeHolder="Select Time"
        value={formState.time}
        handler={(_, value) => setFieldValue("time", value)}
        name="time"
        error={!!errors.time}
      />
      <TextArea
        keyboard="default"
        label="Reason for Request"
        placeHolder="Write Reason for Request"
        value={formState.reason}
        handler={(_, value) => setFieldValue("reason", value)}
        name="reason"
        error={!!errors.reason}
      />

      <FlexText
        style={{
          justifyContent: "flex-start",
          paddingBottom: 20,
        }}
      >
        <ButtonGreenOpacity30
          style={{
            marginTop: 10,
            width: "auto",
            borderWidth: 1,
            borderColor: "#115E59",
          }}
          text="Cancel"
          handler={() => navigation.goBack()}
        />
        <ButtonBG
          style={{
            marginTop: 10,
            width: "auto",
          }}
          text={isLoading ? "Submitting..." : "Submit"}
          disabled={isLoading}
          handler={() => {
            if (!validate()) return;
            const fields = [
              { name: "date", value: formState.date },
              { name: "time", value: formState.time },
              { name: "reason", value: formState.reason },
            ] as any;
            handleExtendDate(
              fields,
              () => null,
              id,
              createExtensionRequest,
              navigation
            );
          }}
        />
      </FlexText>
      {/* </View> */}
    </SafeAreaProvider>
  );
};

export default ExtendDate;
