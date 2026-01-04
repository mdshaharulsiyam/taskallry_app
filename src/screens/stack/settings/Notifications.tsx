import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import NotificationCard from "../../../components/notification/NotificationCard";
import TextPrimary from "../../../components/shered/TextPrimary";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import {
  useGetNotificationQuery,
  useReadAllMutation,
} from "../../../redux/apis/profileItemApi";

const Notifications = () => {
  const { data, isLoading } = useGetNotificationQuery();
  // useReadAllMutation
  const [readAllMutation, { isLoading: isReadingAll }] = useReadAllMutation();
  const readAll = async () => {
    try {
      const res = await readAllMutation().unwrap();
    } catch (err) {
    }
  };

  return (
    <SafeAreaProviderNoScroll backButtonText="Notifications">
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={readAll}
          disabled={isReadingAll}
          style={styles.readAllBtn}
        >
          {isReadingAll ? (
            <ActivityIndicator size="small" color="#0EA5E9" />
          ) : (
            <TextPrimary style={styles.readAllText} text="Read All" />
          )}
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={data?.data?.result}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          ListEmptyComponent={
            <TextPrimary
              style={{ textAlign: "center", marginTop: 40 }}
              text="No notifications found."
            />
          }
        />
      )}
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(Notifications);

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  readAllBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  readAllText: {
    color: "#0EA5E9",
  },
});
