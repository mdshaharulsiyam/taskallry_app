import React, { Suspense, useCallback } from "react";
import {
  Dimensions,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import TextSecondary from "../../../components/shered/TextSecondary";
import ImageButton from "../../../components/ui/buttons/ImageButton";
import { otherIcons } from "../../../constant/images";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import Navigate from "../../../utils/Navigate";

const ChooseSignUp = () => {
  const { height } = Dimensions.get("window");
  const { top, bottom } = useSafeAreaInsets();
  const navigate = Navigate();
  const goCustomer = useCallback(() => navigate("CustomerSignUp"), [navigate]);
  const goService = useCallback(() => navigate("ServiceSignUp"), [navigate]);
  return (
    <SafeAreaProvider backButtonText="Sign Up as">
      <Suspense>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              flex: 1,
              gap: 6,
              justifyContent: "center",
              minHeight: height - top - bottom,
              paddingBottom: 90,
            }}
          >
            <HeaderDesign text="Choose Your Role to Get Started" />
            <TextSecondary text="Select the profile that best suits your journey. Whether you're here to book reliable services or offer them, we’ve built the right tools just for you." />
            <ImageButton
              imageSource={otherIcons.Customer as ImageSourcePropType}
              title="TASKER"
              onPress={goCustomer}
            />
            <ImageButton
              imageSource={otherIcons.Service as ImageSourcePropType}
              title="FREELANCER"
              onPress={goService}
            />
          </View>
        </ScrollView>
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(ChooseSignUp);

const styles = StyleSheet.create({});
