import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Loader from "../../../components/ui/loader/Loader";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useGetPrivacyPolicyQuery } from "../../../redux/apis";

const PrivacyPolicy = () => {
  const { data, isLoading, isFetching } = useGetPrivacyPolicyQuery();

  const htmlContent =
    (data?.data as any)?.description ||
    (typeof data?.data === "string" ? (data?.data as string) : "");

  if (isLoading || isFetching) {
    return (
      <SafeAreaProvider backButtonText="Privacy Policy">
        <Loader />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider backButtonText="Privacy Policy">
      <WebView
        originWhitelist={["*"]}
        source={{
          html:
            htmlContent ||
            "<html><body><p>No privacy policy content available.</p></body></html>",
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaProvider>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({});
