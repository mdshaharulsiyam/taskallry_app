import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";
import { CONFIG } from "../../constant/config";
import { useGetAllTasksQuery } from "../../redux/apis";
import { useAppSelector } from "../../redux/hooks";

const ProvidersMap = () => {
  const hasApiKey = !!CONFIG.GOOGLE_MAPS_API_KEY;

  // Reuse the same filter logic as FIlteredTask to keep results in sync
  const {
    category,
    to_be_done,
    work_location,
    distance_range,
    price_range,
    sort,
  } = useAppSelector((state) => state.filter);

  const latino = work_location?.split("|")?.[1]
    ? JSON.parse(work_location?.split("|")?.[1])
    : null;
  const isStatusFilter = sort === "OPEN_FOR_BID" || sort === "IN_PROGRESS";

  const queryParams: {
    sortOrder?: string;
    sortBy?: string;
    category?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    doneBy?: string;
    searchTerm?: string;
    maxDistance?: number;
  } = isStatusFilter
      ? {
        status: sort,
        ...(category ? { category } : {}),
        ...(latino
          ? {
            maxDistance:
              Number(distance_range) <= 0
                ? 20
                : Number(distance_range),
          }
          : {}),
        minPrice: 5000,
        maxPrice:
          Number(price_range) < 5000 ? 5100 : Number(price_range),
        ...(to_be_done
          ? { doneBy: to_be_done == "in-person" ? "IN_PERSON" : "ONLINE" }
          : {}),
      }
      : {
        sortOrder: sort === "Oldest First" ? "asc" : "desc",
        sortBy: "createdAt",
        ...(category ? { category } : {}),
        ...(latino
          ? {
            maxDistance:
              Number(distance_range) <= 0
                ? 20
                : Number(distance_range),
          }
          : {}),
        minPrice: 5000,
        maxPrice:
          Number(price_range) < 5000 ? 500000 : Number(price_range),
        ...(to_be_done
          ? { doneBy: to_be_done == "in-person" ? "IN_PERSON" : "ONLINE" }
          : {}),
      };

  const { data } = useGetAllTasksQuery(queryParams);
  const tasks = data?.data?.result || [];

  // Extract coordinates from tasks (GeoJSON: [lng, lat])
  const markers = tasks
    .map((task) => {
      const coords = task.location?.coordinates || [];
      if (!coords || coords.length < 2) return null;
      const lng = Number(coords[0]);
      const lat = Number(coords[1]);
      if (!isFinite(lat) || !isFinite(lng)) return null;
      return { lat, lng };
    })
    .filter(Boolean) as { lat: number; lng: number }[];

  if (!hasApiKey) {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>
            GOOGLE_MAPS_API_KEY is not set in CONFIG. Unable to load map.
          </Text>
        </View>
      </View>
    );
  }

  if (!markers.length) {
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>No tasks found to display on map.</Text>
        </View>
      </View>
    );
  }

  const center = markers[0];
  const markersJson = JSON.stringify(markers);

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <style>
          html, body, #map { height: 100%; margin: 0; padding: 0; }
        </style>
        <script src="https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}"></script>
        <script>
          function initMap() {
            const center = { lat: ${center.lat}, lng: ${center.lng} };
            const map = new google.maps.Map(document.getElementById('map'), {
              center,
              zoom: 12,
            });

            const markers = ${markersJson};
            markers.forEach((m) => {
              new google.maps.Marker({
                position: { lat: m.lat, lng: m.lng },
                map,
              });
            });
          }
          window.onload = initMap;
        </script>
      </head>
      <body>
        <div id="map"></div>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={styles.webview}
      />
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
    backgroundColor: "#E5E7EB",
  },
  banner: {
    padding: 8,
    backgroundColor: "#FEF3C7",
  },
  bannerText: {
    fontSize: 12,
    color: "#92400E",
  },
  webview: {
    width: "100%",
    height: "100%",
  },
});
