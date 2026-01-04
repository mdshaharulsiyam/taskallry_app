import { useRoute } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from "react-native-webview";
import BackButton from '../../components/shered/BackButton';
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { website_home } from "../../redux/baseApi";
import Navigate from "../../utils/Navigate";

const PaymentWebView = () => {
  const {
    params: { url, title } = { url: undefined, title: undefined },
  } = useRoute() as {
    params?: {
      url?: string;
      title?: string;
    };
  };
  const { top, bottom } = useSafeAreaInsets();

  const [isLoading, setIsLoading] = useState(true);
  const navigate = Navigate();
  const TARGET_URL = website_home ?? "https://taskalley-deploy-5lzv.vercel.app/";

  const normalizeUrl = (value: string) => value.replace(/\/+$/, "");

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
    const currentUrl = navState?.url;
    if (!currentUrl) return;

    if (
      normalizeUrl(currentUrl) === normalizeUrl(TARGET_URL)
    ) {
      navigate("TabLayout", { screen: "Home" });
      return;
    }
    if (currentUrl.includes("success")) {
      navigate("TabLayout", { screen: "Home" });
    }

  };
  return (
    <View style={[styles.container, {
      paddingTop: top,
      paddingBottom: bottom,
    }]}>
      <View style={{ paddingHorizontal: 20 }}>
        <BackButton text='Payment' />
      </View>
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
