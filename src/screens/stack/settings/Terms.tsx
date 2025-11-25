import React from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Loader from "../../../components/ui/loader/Loader";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { useGetTermsConditionsQuery } from "../../../redux/apis";

const Terms = () => {
  const { data, isLoading, isFetching } = useGetTermsConditionsQuery();

  const htmlContent =
    (data?.data as any)?.description ||
    (typeof data?.data === "string" ? (data?.data as string) : "");

  if (isLoading || isFetching) {
    return (
      <SafeAreaProvider backButtonText="Terms & Condition">
        <Loader />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider backButtonText="Terms & Condition">
      <WebView
        originWhitelist={["*"]}
        source={{
          html:
            htmlContent ||
            "<html><body><p>No terms & conditions content available.</p></body></html>",
        }}
        style={{ flex: 1 }}
      />
    </SafeAreaProvider>
  );
};

export default Terms;

const styles = StyleSheet.create({});
