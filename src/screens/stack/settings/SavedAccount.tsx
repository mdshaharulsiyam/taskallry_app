import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import { useGetBankQuery } from "../../../redux/apis/profileItemApi";
import Navigate from "../../../utils/Navigate";

const SavedAccount = () => {
  const navigate = Navigate();
  const { data, isLoading } = useGetBankQuery();
  const hasBankDetails = useMemo(
    () => !!data?.data?.bankAccountNumber && !!data?.data?.bankName,
    [data?.data?.bankAccountNumber, data?.data?.bankName]
  );
  const handleManageBank = () => {
    navigate("UpdateBankAccount");
  };
  return (
    <SafeAreaProviderNoScroll backButtonText="Saved Account">
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Saved Account</Text>
          <TouchableOpacity onPress={handleManageBank} style={styles.updateBtn}>
            <Text style={styles.updateBtnText}>
              {hasBankDetails ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator />
            <Text style={styles.loadingText}>Loading bank details...</Text>
          </View>
        ) : hasBankDetails ? (
          <>
            <View style={styles.row}>
              <Text style={styles.label}>Bank Name</Text>
              <View style={styles.divider} />
              <Text style={styles.value}>{data?.data?.bankName}</Text>
            </View>
            <View style={[styles.row, { borderBottomWidth: 0 }]}>
              <Text style={styles.label}>Account No</Text>
              <View style={styles.divider} />
              <Text style={styles.value}>
                {data?.data?.bankAccountNumber}
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No bank account saved</Text>
            <Text style={styles.emptyDescription}>
              Tap the {`"${"Add"}"`} button above to add your bank details.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(SavedAccount);

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
  loaderContainer: {
    paddingVertical: 20,
    alignItems: "center",
    gap: 6,
  },
  loadingText: {
    fontSize: 12,
    color: "#555",
  },
  emptyState: {
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  emptyTitle: {
    fontWeight: "600",
    fontSize: 14,
    color: "#333",
  },
  emptyDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
