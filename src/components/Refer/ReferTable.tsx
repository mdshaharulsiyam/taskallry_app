import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import { useGetReferralQuery } from "../../redux/apis";

const data = [
  {
    id: "1",
    type: "Signup Bonus",
    status: "Active",
    value: "$50",
    date: "2025-09-21",
  },
  {
    id: "2",
    type: "Referral Friend",
    status: "Pending",
    value: "$30",
    date: "2025-09-19",
  },
  {
    id: "3",
    type: "Promo Code",
    status: "Expired",
    value: "$20",
    date: "2025-09-15",
  },
];

const ReferTable = () => {
  // useGetReferralQuery
  const { data: referralData, isLoading, isError } = useGetReferralQuery();
  console.log("Referral Data:", referralData?.data?.result, isLoading, isError);
  return (
    <View style={styles.table}>
      {/* Header Row */}
      <FlexText style={styles.headerRow}>
        <HeaderSecondary style={styles.headerCell} text="Referral Type" />
        <HeaderSecondary
          style={{ ...styles.headerCell, ...styles.middleCell }}
          text="Status"
        />
        <HeaderSecondary style={styles.headerCell} text="Value" />
        <HeaderSecondary style={styles.headerCell} text="Applied Date" />
      </FlexText>

      {/* Data Rows */}
      <FlatList
        data={referralData?.data?.result || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <FlexText style={styles.row}>
            <Text style={styles.cell}>
              {item.isMeReferrer ? "Joined with a referral" : "Got a referral"}
            </Text>

            <Text style={[styles.cell, styles.middleCell]}>{item.status}</Text>
            <Text style={styles.cell}>{item.value}</Text>

            <Text style={styles.cell}>
              {item.isMeReferrer
                ? new Date(item.createdAt).toLocaleDateString()
                : ""}
            </Text>
          </FlexText>
        )}
      />
    </View>
  );
};

export default ReferTable;

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 10,
  },
  headerRow: {
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingVertical: 6,
    backgroundColor: "#E6F4F1",
  },
  row: {
    borderBottomWidth: 1,
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  headerCell: {
    textAlign: "center",
    flex: 1,
    fontWeight: "bold",
    fontSize: 12,
  },
  cell: {
    textAlign: "center",
    flex: 1,
    paddingHorizontal: 4,
    fontSize: 12,
  },
  middleCell: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});
