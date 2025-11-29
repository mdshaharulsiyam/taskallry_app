import React, { Suspense } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import ResetPasswordFields from "../../../formFields/ResetPasswordFields";
import { handleResetPassword } from "../../../handler/resetPassword";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../types/Types";
import Navigate from "../../../utils/Navigate";
import { RenderField } from "../../../utils/RenderField";

const ResetPassword = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ResetPasswordFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  return (
    <SafeAreaProvider backButtonText="Set New Password">
      <Suspense>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              flex: 1,
              gap: 6,
              justifyContent: "center",
              minHeight: height - top - bottom,
            }}
          >
            <HeaderDesign text="Set Your New Password" />
            <TextSecondary text="Create a secure password to protect your account and get started seamlessly!" />
            {fields?.map((field: FieldsType) => RenderField(field, setFields))}
            <ButtonBG
              style={{
                marginTop: 10,
              }}
              text="Confirm"
              handler={() => {
                navigate("Login");
                handleResetPassword(fields, setFields);
              }}
            />
          </View>
        </ScrollView>
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(ResetPassword);

const styles = StyleSheet.create({});
