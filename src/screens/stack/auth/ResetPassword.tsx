import React, { Suspense, useCallback } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import PasswordInput from "../../../components/ui/inputs/PasswordInput";
import ResetPasswordFields from "../../../formFields/ResetPasswordFields";
import { handleResetPassword } from "../../../handler/resetPassword";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import Navigate from "../../../utils/Navigate";

const ResetPassword = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ResetPasswordFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  const getField = useCallback(
    (name: string) => fields.find((field) => field.name === name),
    [fields]
  );
  const updateField = useCallback(
    (name: string, value: string) => {
      setFields((prev) =>
        prev.map((field) =>
          field.name === name ? { ...field, value, error: false } : field
        )
      );
    },
    [setFields]
  );
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
            <PasswordInput
              label="New Password"
              placeHolder="******"
              name="password"
              value={(getField("password")?.value as string) || ""}
              handler={(_, value) => updateField("password", value)}
              error={!!getField("password")?.error}
              keyboard="default"
            />
            <PasswordInput
              label="New Confirm password"
              placeHolder="******"
              name="confirmPassword"
              value={(getField("confirmPassword")?.value as string) || ""}
              handler={(_, value) => updateField("confirmPassword", value)}
              error={!!getField("confirmPassword")?.error}
              keyboard="default"
            />
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
