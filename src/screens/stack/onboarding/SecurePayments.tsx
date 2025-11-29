import React, { Suspense, useCallback } from "react";
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
  const goNext = useCallback(() => navigate("TabLayout"), [navigate]);
  return (
    <SafeAreaProviderNoScroll>
      <Suspense>
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
            handler={goNext}
            text="Continue"
          />
        </View>
      </Suspense>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(SecurePayments);

const styles = StyleSheet.create({});
