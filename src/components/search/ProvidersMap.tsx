import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { CONFIG } from "../../constant/config";

const ProvidersMap = () => {
  const hasApiKey = !!CONFIG.GOOGLE_MAPS_API_KEY;
  const mapsUrl = hasApiKey
    ? `https://www.google.com/maps/search/?api=1&query=Task+Provider`
    : "https://www.google.com/maps";
  return (
    <View style={styles.container}>
      {!hasApiKey && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            GOOGLE_MAPS_API_KEY is not set in CONFIG. Showing default map.
          </Text>
        </View>
      )}
      <View style={styles.mapWrapper}>
        <WebView source={{ uri: mapsUrl }} style={styles.webview} />
      </View>
    </View>
  );
};

export default ProvidersMap;

const styles = StyleSheet.create({
  container: {
    height: 400,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  banner: {
    padding: 8,
    backgroundColor: "#FEF3C7",
  },
  bannerText: {
    fontSize: 12,
    color: "#92400E",
  },
  mapWrapper: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
