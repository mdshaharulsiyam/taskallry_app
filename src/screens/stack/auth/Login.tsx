import React from "react";
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
import LoginFields from "../../../formFields/LoginFields";
import { handleSignIn } from "../../../handler/signIn";
import { useGlobalContext } from "../../../providers/GlobalContextProvider";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useLoginMutation } from "../../../redux/apis";
import { setToken } from "../../../redux/slices/authSlice";
import type { AppDispatch } from "../../../redux/store";
import { FieldsType } from "../../../types/Types";
import Navigate from "../../../utils/Navigate";
import { RenderField } from "../../../utils/RenderField";

const Login = () => {
  const { height } = Dimensions.get("window");
  const { fields, setFields } = LoginFields();
  const { top, bottom } = useSafeAreaInsets();
  const { setRole } = useGlobalContext();
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = Navigate();
  return (
    <SafeAreaProvider>
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
        {fields?.map((field: FieldsType) => RenderField(field, setFields))}
        <TouchableOpacity
          onPress={() => navigate("Forget")}
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
          <TouchableOpacity onPress={() => navigate("ChooseSignUp")}>
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
          handler={() => {
            handleSignIn(
              fields,
              setFields,
              login,
              setRole,
              () => navigate("TabLayout"),
              (token) => dispatch(setToken(token))
            );
            // const email = fields[0]?.value + "";
            // setRole(email?.includes("user") ? "user" : "service");
            // navigate("TabLayout");
          }}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default Login;

const styles = StyleSheet.create({
  forget: {
    marginLeft: "auto",
    marginTop: -24,
  },
});
