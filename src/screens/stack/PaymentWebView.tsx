import { useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";

const PaymentWebView = () => {
  const {
    params: { url, title } = { url: undefined, title: undefined },
  } = useRoute() as {
    params?: {
      url?: string;
      title?: string;
    };
  };


  const [isLoading, setIsLoading] = useState(true);

  const sanitizedUrl = useMemo(() => {
    if (!url || typeof url !== "string") return undefined;
    try {
      const parsed = new URL(url);
      return parsed.href;
    } catch (error) {
      return undefined;
    }
  }, [url]);

  if (!sanitizedUrl) {
    return (
      <SafeAreaProviderNoScroll backButtonText="Payment" zeroPadding>
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            Unable to load the payment link. Please try again later.
          </Text>
        </View>
      </SafeAreaProviderNoScroll>
    );
  }
  const handleNavigationChange = (navState: any) => {
    const currentUrl = navState.url;

    if (currentUrl.includes('success')) {
      // setPaymentStatus('success');
    } else if (currentUrl.includes('cancel')) {
      // setPaymentStatus('cancel');
    }
  };
  return (
    <View style={styles.container}>
      {isLoading && <LoaderOverlay />}
      <WebView
        originWhitelist={["*"]}
        source={{ uri: sanitizedUrl }}
        style={{ flex: 1 }}
        javaScriptEnabled
        domStorageEnabled
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        onNavigationStateChange={handleNavigationChange}
        renderError={() => (

          <View style={styles.fallbackContainer}>

            <Text style={styles.fallbackText}>

              Unable to load the payment link. Please try again later.

            </Text>

          </View>

        )}
      />
    </View>
  );
};

const LoaderOverlay = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#115E59" />
  </View>
);

export default PaymentWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    zIndex: 1,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  fallbackText: {
    textAlign: "center",
    color: "#4B5563",
    fontSize: 16,
    lineHeight: 24,
  },
});
