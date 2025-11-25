import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import Navigate from "../../../utils/Navigate";
import { useGetBankQuery } from "../../../redux/apis/profileItemApi";

const SavedAccount = () => {
  const navigate = Navigate();
  const { data, isLoading } = useGetBankQuery();

  return (
    <SafeAreaProviderNoScroll backButtonText="Saved Account">
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Account</Text>
          <TouchableOpacity
            onPress={() => navigate("UpdateBankAccount")}
            style={styles.updateBtn}
          >
            <Text style={styles.updateBtnText}>Update</Text>
          </TouchableOpacity>
        </View>

        {/* Row 1 */}
        <View style={styles.row}>
          <Text style={styles.label}>Bank Name</Text>
          <View style={styles.divider} />
          <Text style={styles.value}>{data?.data?.bankName}</Text>
        </View>

        {/* Row 2 */}
        <View style={[styles.row, { borderBottomWidth: 0 }]}>
          <Text style={styles.label}>Account No</Text>
          <View style={styles.divider} />
          <Text style={styles.value}>{data?.data?.bankAccountNumber}</Text>
        </View>
      </View>
    </SafeAreaProviderNoScroll>
  );
};

export default SavedAccount;

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  updateBtn: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  updateBtnText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  label: {
    flex: 1,
    fontWeight: "600",
    fontSize: 13,
    color: "#444",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
  value: {
    flex: 2,
    fontSize: 13,
    color: "#333",
  },
});
