import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import ChangePasswordFields from "../../../formFields/ChangePasswordFields";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useChangePasswordMutation } from "../../../redux/apis";
import { FieldsType } from "../../../types/Types";
import { RenderField } from "../../../utils/RenderField";
import { validateFields } from "../../../utils/formValidate";

const ChangePassword = () => {
  const { fields, setFields } = ChangePasswordFields();
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleChangePassword = () => {
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
  };

  return (
    <SafeAreaProvider backButtonText="Change Password">
      {fields?.map((field: FieldsType) => RenderField(field, setFields))}
      <ButtonBG
        style={{
          marginTop: 10,
        }}
        text={isLoading ? "Updating..." : "Update"}
        handler={handleChangePassword}
        disabled={isLoading}
      />
    </SafeAreaProvider>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
