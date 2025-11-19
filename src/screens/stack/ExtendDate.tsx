import { useRoute } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../../components/ui/buttons/ButtonGreenOpacity30";
import ExtendDateFields from "../../formFields/ExtendDateFields";
import { handleExtendDate } from "../../handler/extendDate";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { useCreateExtensionRequestMutation } from "../../redux/apis";
import { FieldsType } from "../../types/Types";
import { Navigation } from "../../utils/Navigate";
import { RenderField } from "../../utils/RenderField";

const ExtendDate = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ExtendDateFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigation = Navigation();
  const { params: { id } } = useRoute() as {
    params: {
      id: string;
    };
  };
  const [createExtensionRequest, { isLoading }] = useCreateExtensionRequestMutation();
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

      {fields?.map((field: FieldsType) => RenderField(field, setFields))}

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
            handleExtendDate(fields, setFields, id, createExtensionRequest, navigation);
          }}
        />
      </FlexText>
      {/* </View> */}
    </SafeAreaProvider>
  );
};

export default ExtendDate;
