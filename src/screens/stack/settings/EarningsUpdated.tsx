import moment from "moment";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FlexText from "../../../components/shered/FlexText";
import HeaderDesign from "../../../components/shered/HeaderDesign";
import HeaderSecondary from "../../../components/shered/HeaderSecondary";
import TextPrimary from "../../../components/shered/TextPrimary";
import TextSecondary from "../../../components/shered/TextSecondary";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";

const tabs = ["Daily", "Weekly", "Monthly", "Yearly", "Lifetime"] as const;

const mockTransactions = [
  { id: "tx-001", name: "DF", amount: 4000, date: "2026-01-03" },
  { id: "tx-002", name: "Premium clean up", amount: 18500, date: "2026-01-02" },
  { id: "tx-003", name: "DF", amount: 2500, date: "2025-12-30" },
];

const ArrowButton = ({
  direction,
  onPress,
}: {
  direction: "left" | "right";
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.arrowBtn} onPress={onPress}>
    <Text style={styles.arrowText}>{direction === "left" ? "‹" : "›"}</Text>
  </TouchableOpacity>
);

const EarningsUpdated = () => {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("Daily");
  const [referenceDate, setReferenceDate] = useState(moment());

  const displayLabel = useMemo(() => {
    switch (activeTab) {
      case "Weekly":
        const startOfWeek = referenceDate.clone().startOf("week");
        const endOfWeek = referenceDate.clone().endOf("week");
        return `${startOfWeek.format("DD MMM")} - ${endOfWeek.format("DD MMM YYYY")}`;
      case "Monthly":
        return referenceDate.format("MMM YYYY");
      case "Yearly":
        return referenceDate.format("YYYY");
      case "Daily":
        return referenceDate.format("DD MMM YYYY");
      default:
        return "";
    }
  }, [activeTab, referenceDate]);

  const shiftDate = (direction: "prev" | "next") => {
    const delta = direction === "prev" ? -1 : 1;
    switch (activeTab) {
      case "Daily":
        setReferenceDate((prev) => prev.clone().add(delta, "day"));
        break;
      case "Weekly":
        setReferenceDate((prev) => prev.clone().add(delta, "week"));
        break;
      case "Monthly":
        setReferenceDate((prev) => prev.clone().add(delta, "month"));
        break;
      case "Yearly":
        setReferenceDate((prev) => prev.clone().add(delta, "year"));
        break;
      default:
        break;
    }
  };

  return (
    <SafeAreaProviderNoScroll backButtonText="Earnings">
      <View style={styles.card}>
        <FlexText style={{ alignItems: "center", marginBottom: 16 }}>
          <View style={styles.badge}>
            <Text style={{ color: "#115E59" }}>₦</Text>
          </View>
          <HeaderSecondary text="Earnings Breakdown" />
        </FlexText>
        <View style={styles.tabsRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => {
                setActiveTab(tab);
                setReferenceDate(moment());
              }}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab && styles.tabButtonTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab !== "Lifetime" && (
          <FlexText style={styles.navRow}>
            <ArrowButton direction="left" onPress={() => shiftDate("prev")} />
            <Text style={styles.periodLabel}>{displayLabel}</Text>
            <ArrowButton direction="right" onPress={() => shiftDate("next")} />
          </FlexText>
        )}
      </View>

      <FlatList
        data={mockTransactions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <FlexText style={{ gap: 12 }}>
              <View style={styles.iconWrapper}>
                <Text style={{ color: "#115E59", fontWeight: "700" }}>₦</Text>
              </View>
              <View>
                <HeaderDesign text={item.name} />
                <TextSecondary text={moment(item.date).format("DD MMM YYYY")} />
              </View>
            </FlexText>
            <TextPrimary
              style={{ color: "#115E59", fontWeight: "700" }}
              text={`+ ₦ ${item.amount.toLocaleString()}`}
            />
          </View>
        )}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default EarningsUpdated;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  badge: {
    backgroundColor: "#E6F4F1",
    padding: 8,
    borderRadius: 10,
    marginRight: 8,
  },
  tabsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tabButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 40,
    backgroundColor: "#F1F5F9",
  },
  tabButtonActive: {
    backgroundColor: "#115E59",
  },
  tabButtonText: {
    color: "#334155",
    fontWeight: "500",
  },
  tabButtonTextActive: {
    color: "#FFFFFF",
  },
  navRow: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 18,
    gap: 16,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#115E59",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  periodLabel: {
    fontWeight: "600",
    color: "#0F172A",
  },
  transactionCard: {
    backgroundColor: "#F8FAFC",
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E6F4F1",
    alignItems: "center",
    justifyContent: "center",
  },
});
