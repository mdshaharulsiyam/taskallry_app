import { useRoute } from '@react-navigation/native';
import React, { Suspense, useCallback } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import PasswordInput from "../../../components/ui/inputs/PasswordInput";
import ResetPasswordFields from "../../../formFields/ResetPasswordFields";
import { handleResetPassword } from "../../../handler/resetPassword";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useResetPasswordMutation } from "../../../redux/apis";
import Navigate from "../../../utils/Navigate";

const ResetPassword = () => {
  const {
    params: { phoneNumber },
  } = useRoute().params as { params: { phoneNumber?: string; } };
  const { height } = Dimensions.get("window");
  const { fields, setFields } = ResetPasswordFields();
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
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
              disabled={isLoading}
              loading={isLoading}
              handler={() => {
                const isValid = handleResetPassword(fields, setFields);
                if (!isValid) return;

                const trimmedPhone = (phoneNumber || "").trim();
                if (!trimmedPhone) {
                  Toast.show({
                    type: "error",
                    text1: "Missing phone number",
                    text2: "Return to verification and try again.",
                  });
                  return;
                }

                const password = ((getField("password")?.value as string) || "").trim();
                const confirmPassword = ((getField("confirmPassword")?.value as string) || "").trim();

                if (password.length < 6) {
                  Toast.show({
                    type: "error",
                    text1: "Weak password",
                    text2: "Password must be at least 6 characters.",
                  });
                  setFields((prev) =>
                    prev.map((field) =>
                      field.name === "password" ? { ...field, error: true } : field
                    )
                  );
                  return;
                }

                if (password !== confirmPassword) {
                  Toast.show({
                    type: "error",
                    text1: "Password mismatch",
                    text2: "Passwords must match.",
                  });
                  setFields((prev) =>
                    prev.map((field) =>
                      field.name === "confirmPassword" ? { ...field, error: true } : field
                    )
                  );
                  return;
                }

                resetPassword({ phone: trimmedPhone, password, confirmPassword })
                  .unwrap()
                  .then((res) => {
                    Toast.show({
                      type: "success",
                      text1: "Password updated",
                      text2: res?.message || "You can now log in with the new password.",
                    });
                    navigate("Login");
                  })
                  .catch((err: any) => {
                    Toast.show({
                      type: "error",
                      text1: "Reset failed",
                      text2: err?.data?.message || "Unable to reset password",
                    });
                  });
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
