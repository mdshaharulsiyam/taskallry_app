import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import OnboardingBackButton from "../../../components/onboarding/OnboardingBackButton";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import Dots from "../../../components/ui/dots/Dots";
import { otherIcons } from "../../../constant/images";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import Navigate from "../../../utils/Navigate";

const SecurePayments = () => {
  const navigate = Navigate();
  return (
    <SafeAreaProviderNoScroll>
      <OnboardingBackButton show={true} />
      <View
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <Image source={otherIcons.SecurePaymentImage as ImageSourcePropType} />
        <HeaderDesign
          style={{
            textAlign: "center",
          }}
          text="Secure Payments & Verified Reviews"
        />
        <TextSecondary
          style={{
            textAlign: "center",
            marginBottom: 20,
          }}
          text="Pay with confidence through secure gateways and make informed decisions by reading real user reviews."
        />
        <Dots size={3} current={2} />
        <ButtonBG
          style={{
            position: "absolute",
            bottom: 160,
            width: "100%",
          }}
          handler={() => navigate("TabLayout")}
          text="Continue"
        />
      </View>
    </SafeAreaProviderNoScroll>
  );
};

export default SecurePayments;

const styles = StyleSheet.create({});
