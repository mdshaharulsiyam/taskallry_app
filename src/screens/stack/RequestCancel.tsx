import { useRoute } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import TextPrimary from "../../components/shered/TextPrimary";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../../components/ui/buttons/ButtonGreenOpacity30";
import ImageUploader from "../../components/ui/file/ImageUploader";
import Input from "../../components/ui/inputs/Input";
import SelectInput from "../../components/ui/inputs/SelectInput";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { useCreateCancelRequestMutation } from "../../redux/apis";
import { Navigation } from "../../utils/Navigate";

const RequestCancel = () => {
  const { height } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();
  const navigation = Navigation();
  const route = useRoute() as { params?: { id?: string } };
  const taskId = route?.params?.id;
  const [uploadFiles, setUploadFiles] = useState<any[]>([]);
  const [formState, setFormState] = useState({
    reason: "",
    desc: "",
  });
  const [errors, setErrors] = useState({
    reason: "",
  });
  const [createCancelRequest, { isLoading }] =
    useCreateCancelRequestMutation();

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

  const handleRemoveEvidence = useCallback((index: number) => {
    setUploadFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

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
          <FlexText
            style={{
              flexWrap: "wrap",
              gap: 12,
              marginTop: 12,
            }}
          >
            {uploadFiles?.map((file, index) => (
              <View key={`${file?.uri}-${index}`}>
                <Image
                  source={{ uri: file?.uri }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    marginBottom: 6,
                  }}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveEvidence(index)}
                  style={{
                    alignSelf: "center",
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 999,
                    backgroundColor: "#F87171",
                  }}
                >
                  <TextSecondary
                    text="Remove"
                    style={{ color: "#FFF", fontSize: 12 }}
                  />
                </TouchableOpacity>
              </View>
            ))}
            <ImageUploader
              setFiels={setUploadFiles}
              currentCount={uploadFiles.length}
              maxFiles={3}
            />
          </FlexText>
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
            text={isLoading ? "Submitting..." : "Submit"}
            disabled={isLoading}
            handler={async () => {
              if (!validate()) return;
              if (!taskId) {
                Toast.show({
                  type: "error",
                  text1: "Task missing",
                  text2: "Unable to locate the task ID for this request.",
                });
                return;
              }
              try {
                const formData = new FormData();
                formData.append(
                  "data",
                  JSON.stringify({
                    task: taskId,
                    reason: formState.reason,
                    description: formState.desc?.trim(),
                  })
                );
                if (uploadFiles?.[0]) {
                  formData.append("reject_evidence", uploadFiles[0]);
                }
                await createCancelRequest(formData).unwrap();
                Toast.show({
                  type: "success",
                  text1: "Request submitted",
                  text2: "Cancellation request has been sent for review.",
                });
                navigation.goBack();
              } catch (error: any) {
                Toast.show({
                  type: "error",
                  text1: "Failed to submit",
                  text2: error?.data?.message || "Please try again later.",
                });
              }
            }}
          />
        </FlexText>
      </View>
    </SafeAreaProvider>
  );
};

export default RequestCancel;

const styles = StyleSheet.create({});
