import React, { useCallback, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import TextPrimary from "../../components/shered/TextPrimary";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../../components/ui/buttons/ButtonGreenOpacity30";
import ImageUploader from "../../components/ui/file/ImageUploader";
import Input from "../../components/ui/inputs/Input";
import SelectInput from "../../components/ui/inputs/SelectInput";
import { handleRequestCancel } from "../../handler/requestCancel";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { Navigation } from "../../utils/Navigate";

const RequestCancel = () => {
  const { height } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();
  const navigation = Navigation();
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [formState, setFormState] = useState({
    reason: "",
    desc: "",
  });
  const [errors, setErrors] = useState({
    reason: "",
  });

  const reasonOptions = [
    { label: "Client unresponsive", value: "CLIENT_UNRESPONSIVE" },
    { label: "Scope changed", value: "SCOPE_CHANGED" },
    { label: "Schedule conflict", value: "SCHEDULE_CONFLICT" },
    { label: "Other", value: "OTHER" },
  ];

  const setFieldValue = useCallback(
    (name: keyof typeof formState, value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
      if (name === "reason") {
        setErrors((prev) => ({ ...prev, reason: "" }));
      }
    },
    []
  );

  const validate = () => {
    if (!formState.reason) {
      setErrors({ reason: "Select a reason" });
      return false;
    }
    return true;
  };

  return (
    <SafeAreaProvider backButtonText=" ">
      <View
        style={{
          flex: 1,
          gap: 6,
          justifyContent: "center",
          minHeight: height - top - bottom,
        }}
      >
        <HeaderDesign text="Request Task Cancellation" />
        <TextSecondary text="Submit a cancellation request with supporting details." />

        <SelectInput
          label="Reason for Cancellation"
          placeHolder="Select Reason"
          options={reasonOptions}
          value={formState.reason}
          handler={(_, value) => setFieldValue("reason", value as string)}
          name="reason"
          required
          error={!!errors.reason}
        />
        <Input
          keyboard="default"
          label="Description (Optional)"
          placeHolder="Provide additional details if needed"
          value={formState.desc}
          handler={(_, value) => setFieldValue("desc", value)}
          name="desc"
        />
        <View>
          <TextPrimary text="Evidence (Optional)" />
          <ImageUploader setFiels={setUploadFiles} />
        </View>
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
            text="Submit"
            handler={() => {
              if (!validate()) return;
              const fields = [
                { name: "reason", value: formState.reason },
                { name: "desc", value: formState.desc },
              ] as any;
              handleRequestCancel(fields, () => null);
            }}
          />
        </FlexText>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestCancel;

const styles = StyleSheet.create({});
