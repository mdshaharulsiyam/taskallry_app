import React, { Suspense, useCallback } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import FlexText from "../../../components/shered/FlexText";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import HeaderSecondary from "../../../components/shered/HeaderSecondary";
import TextPrimary from "../../../components/shered/TextPrimary";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import Divider from "../../../components/ui/devider/Divider";
import Input from "../../../components/ui/inputs/Input";
import InputCheckbox from "../../../components/ui/inputs/InputCheckbox";
import PasswordInput from "../../../components/ui/inputs/PasswordInput";
import LoginFields from "../../../formFields/LoginFields";
import { handleSignIn } from "../../../handler/signIn";
import { useGlobalContext } from "../../../providers/GlobalContextProvider";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useLoginMutation } from "../../../redux/apis";
import { setToken } from "../../../redux/slices/authSlice";
import type { AppDispatch } from "../../../redux/store";
import Navigate from "../../../utils/Navigate";

const Login = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = LoginFields();
  const { top, bottom } = useSafeAreaInsets();
  const { setRole } = useGlobalContext();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = Navigate();
  const handleForget = useCallback(() => navigate("Forget"), [navigate]);
  const handleGoSignup = useCallback(() => navigate("ChooseSignUp"), [navigate]);
  const getField = useCallback(
    (name: string) => fields.find((field) => field.name === name),
    [fields]
  );
  const updateField = useCallback(
    (name: string, value: string | boolean) => {
      setFields((prev) =>
        prev.map((field) =>
          field.name === name ? { ...field, value, error: false } : field
        )
      );
    },
    [setFields]
  );
  const handleLogin = useCallback(() => {
    handleSignIn(
      fields,
      setFields,
      login,
      setRole,
      () => navigate("TabLayout"),
      (token) => dispatch(setToken(token))
    );
  }, [dispatch, fields, login, navigate, setFields, setRole]);

  return (
    <SafeAreaProvider>
      <Suspense>
        <View
          style={{
            flex: 1,
            gap: 6,
            justifyContent: "center",
            minHeight: height - top - bottom,
          }}
        >
          <HeaderDesign />
          <TextSecondary text="Log in with your credentials to access your account and manage everything from one place." />
          <Input
            label="Email Address"
            placeHolder="Enter Email Address"
            keyboard="email-address"
            name="email"
            value={(getField("email")?.value as string) || ""}
            handler={(_, value) => updateField("email", value)}
            error={!!getField("email")?.error}
          />
          <PasswordInput
            label="Password"
            placeHolder="******"
            name="password"
            value={(getField("password")?.value as string) || ""}
            handler={(_, value) => updateField("password", value)}
            error={!!getField("password")?.error}
            keyboard="default"
          />
          <InputCheckbox
            label="Remember me"
            name="remember"
            value={!!getField("remember")?.value}
            handler={(_, value) => updateField("remember", value)}
          />
          <TouchableOpacity
            onPress={handleForget}
            style={[styles.forget]}
          >
            <TextSecondary
              style={{
                color: "#115E59",
              }}
              text=" Forget Password ?"
            />
          </TouchableOpacity>

          <FlexText
            style={{
              marginTop: 8,
            }}
          >
            <Divider
              style={{
                width: "45%",
              }}
            />
            <HeaderSecondary text="OR" />
            <Divider
              style={{
                width: "45%",
              }}
            />
          </FlexText>

          <FlexText
            style={{
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            <TextPrimary text="Don’t have an account?" />
            <TouchableOpacity onPress={handleGoSignup}>
              <TextSecondary
                style={{
                  color: "#115E59",
                }}
                text="Sign Up"
              />
            </TouchableOpacity>
          </FlexText>
          <ButtonBG
            text={`${isLoading ? "Loading..." : "Log In"}`}
            handler={handleLogin}
          />
        </View>
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(Login);

const styles = StyleSheet.create({
  forget: {
    marginLeft: "auto",
    marginTop: -24,
  },
});
