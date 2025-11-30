import React, { Suspense, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-toast-message";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import PasswordInput from "../../../components/ui/inputs/PasswordInput";
import ChangePasswordFields from "../../../formFields/ChangePasswordFields";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useChangePasswordMutation } from "../../../redux/apis";
import { validateFields } from "../../../utils/formValidate";

const ChangePassword = () => {
  const { fields, setFields } = ChangePasswordFields();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
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

  const handleChangePassword = useCallback(() => {
    const isValid = validateFields(fields, setFields);
    if (!isValid) return;

    const values = fields.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {} as any);

    const payload = {
      oldPassword: values.password,
      newPassword: values.nPassword,
      confirmNewPassword: values.cPassword,
    };

    changePassword(payload)
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: "success",
          text1: "Password updated",
          text2: res?.message || "Your password has been changed successfully",
        });
      })
      .catch((err: any) => {
        Toast.show({
          type: "error",
          text1: "Failed to update password",
          text2: err?.data?.message || "Something went wrong",
        });
      });
  }, [changePassword, fields, setFields]);

  return (
    <SafeAreaProvider backButtonText="Change Password">
      <Suspense>
        <View
          style={{
            gap: 12,
          }}
        >
          <PasswordInput
            label="Old Password"
            placeHolder="******"
            name="password"
            value={(getField("password")?.value as string) || ""}
            handler={(_, value) => updateField("password", value)}
            error={!!getField("password")?.error}
            keyboard="default"
          />
          <PasswordInput
            label="New Password"
            placeHolder="******"
            name="nPassword"
            value={(getField("nPassword")?.value as string) || ""}
            handler={(_, value) => updateField("nPassword", value)}
            error={!!getField("nPassword")?.error}
            keyboard="default"
          />
          <PasswordInput
            label="Confirm New password"
            placeHolder="******"
            name="cPassword"
            value={(getField("cPassword")?.value as string) || ""}
            handler={(_, value) => updateField("cPassword", value)}
            error={!!getField("cPassword")?.error}
            keyboard="default"
          />
        </View>
        <ButtonBG
          style={{
            marginTop: 10,
          }}
          text={isLoading ? "Updating..." : "Update"}
          handler={handleChangePassword}
          disabled={isLoading}
        />
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(ChangePassword);

const styles = StyleSheet.create({});
