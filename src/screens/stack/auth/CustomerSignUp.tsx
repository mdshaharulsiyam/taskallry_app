import React, { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import FlexText from "../../../components/shered/FlexText";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import HeaderSecondary from "../../../components/shered/HeaderSecondary";
import TextPrimary from "../../../components/shered/TextPrimary";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import ButtonTransparentBG from "../../../components/ui/buttons/ButtonTransparentBG";
import Divider from "../../../components/ui/devider/Divider";
import ImageUploader from "../../../components/ui/file/ImageUploader";
import CustomerSignUpFields from "../../../formFields/CustomerSignUpFields";
import { handleCustomerSignUp } from "../../../handler/customerSignUp";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { FieldsType } from "../../../types/Types";
import Navigate, { Navigation } from "../../../utils/Navigate";
import { RenderField } from "../../../utils/RenderField";
import { useRegisterMutation } from "../../../redux/apis";
import { useRoute } from "@react-navigation/native";

const slide = [
  {
    skip: 0,
    keep: 6,
    field: "signup",
  },
  {
    skip: 6,
    keep: 2,
    field: "isAddressProvided",
  },
  {
    skip: 8,
    keep: 1,
    field: "coupon",
  },
];

const Content = [
  {
    heading: "Create Your Account",
    text: "Join our community to easily find and book the services you need, with a smooth and personalized experience from start to finish.",
  },
  {
    heading: "Provide Your Address",
    text: "Please provide your valid address, and verify it to confirm your identity.",
  },
  {
    heading: "Have a Referral Code? Unlock Your Reward",
    text: "Apply a referral code and get 10% OFF your first task – up to ₦50!",
  },
];

const CustomerSignUp = () => {
  const params = useRoute().params;
  const [register, { isLoading }] = useRegisterMutation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const { height } = Dimensions.get("window");
  const { fields, setFields } = CustomerSignUpFields();
  const { top, bottom } = useSafeAreaInsets();
  const [fiels, setFiels] = useState<any>([]);
  const navigate = Navigate();
  const [completedStep, setCompletedStep] = useState<any>({
    signup: false,
    isAddressProvided: false,
    coupon: false,
  });
  const navigation = Navigation();
  const backHandler = () => {
    if (currentSlide == 0) {
      navigation.goBack();
    } else {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <SafeAreaProvider
      backButtonText="Sign Up as Customer"
      handler={backHandler}
    >
      <View
        style={{
          flex: 1,
          gap: 6,
          justifyContent: "center",
          minHeight: height - top - bottom,
          paddingBottom: 90,
        }}
      >
        <HeaderDesign text={Content[currentSlide].heading as string} />
        <TextSecondary text={Content[currentSlide].text as string} />
        {fields
          ?.slice(
            slide[currentSlide].skip,
            slide[currentSlide].keep + slide[currentSlide].skip
          )
          ?.map((field: FieldsType) => RenderField(field, setFields))}
        {currentSlide == 1 && (
          <View>
            <TextPrimary text="Address Verification Document" />
            <FlexText>
              {fiels?.length > 0 && (
                <Image
                  source={{ uri: fiels?.[0]?.uri }}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                    marginRight: 8,
                    resizeMode: "contain",
                  }}
                />
              )}
            </FlexText>
            <ImageUploader setFiels={setFiels} />
          </View>
        )}

        {currentSlide == 0 && (
          <>
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
              }}
            >
              <TextPrimary text="Already have an account?" />
              <TouchableOpacity onPress={() => navigate("Login")}>
                <TextSecondary
                  style={{
                    color: "#115E59",
                  }}
                  text="Login"
                />
              </TouchableOpacity>
            </FlexText>
          </>
        )}
        <ButtonBG
          style={{
            marginTop: 6,
          }}
          text={
            isLoading
              ? "Loading..."
              : currentSlide == 2
              ? "Apply Code & Continue"
              : "Continue"
          }
          handler={() => {
            const isValid = handleCustomerSignUp(
              fields?.slice(
                slide[currentSlide].skip,
                slide[currentSlide].keep + slide[currentSlide].skip
              ),
              setFields,
              currentSlide,
              register,
              (phone: string) =>
                navigate("Verify", {
                  params: { phoneNumber: phone, from: "signup" },
                })
            );
            if (isValid && currentSlide < 2) {
              setCurrentSlide((prev) => prev + 1);
            } else if (currentSlide == 2) {
              navigate("Verify", {
                params: { phoneNumber: "", from: "signup" },
              });
            }
          }}
        />
        {currentSlide == 2 && (
          <ButtonTransparentBG
            text="Skip & Continue Without Code"
            handler={() => {
              navigate("Verify", {
                params: { phoneNumber: "", from: "signup" },
              });
            }}
          />
        )}
      </View>
    </SafeAreaProvider>
  );
};

export default CustomerSignUp;
