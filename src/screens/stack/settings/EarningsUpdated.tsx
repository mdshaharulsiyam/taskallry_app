import moment from "moment";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
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
import { useGetProviderEarningsQuery } from "../../../redux/apis";

const tabs = ["Daily", "Weekly", "Monthly", "Yearly", "Lifetime"] as const;

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
  const [page, setPage] = useState(1);
  const limit = 10;

  const queryInput = useMemo(() => {
    const base = { page, limit };
    switch (activeTab) {
      case "Daily":
        return {
          ...base,
          type: "daily" as const,
          day: referenceDate.date(),
          month: referenceDate.month() + 1,
          year: referenceDate.year(),
        };
      case "Weekly":
        return {
          ...base,
          type: "weekly" as const,
          week: referenceDate.isoWeek(),
          year: referenceDate.year(),
        };
      case "Monthly":
        return {
          ...base,
          type: "monthly" as const,
          month: referenceDate.month() + 1,
          year: referenceDate.year(),
        };
      case "Yearly":
        return {
          ...base,
          type: "yearly" as const,
          year: referenceDate.year(),
        };
      default:
        return base;
    }
  }, [activeTab, limit, page, referenceDate]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProviderEarningsQuery(queryInput);

  const earnings = data?.data?.data ?? [];
  const showNav = activeTab !== "Lifetime";

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

  const handleTabPress = (tab: (typeof tabs)[number]) => {
    setActiveTab(tab);
    setReferenceDate(moment());
    setPage(1);
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
              onPress={() => handleTabPress(tab)}
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

        {showNav && (
          <FlexText style={styles.navRow}>
            <ArrowButton direction="left" onPress={() => shiftDate("prev")} />
            <Text style={styles.periodLabel}>{displayLabel}</Text>
            <ArrowButton direction="right" onPress={() => shiftDate("next")} />
          </FlexText>
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : isError ? (
        <TouchableOpacity onPress={() => refetch()} style={styles.errorBox}>
          <Text style={styles.errorText}>
            Unable to load earnings. Tap to retry.
          </Text>
        </TouchableOpacity>
      ) : (
        <FlatList
          data={earnings}
          keyExtractor={(item) => item._id}
          refreshing={isFetching}
          onRefresh={refetch}
          contentContainerStyle={{ paddingBottom: 24 }}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <FlexText style={{ gap: 12 }}>
                <View style={styles.iconWrapper}>
                  <Text style={{ color: "#115E59", fontWeight: "700" }}>₦</Text>
                </View>
                <View>
                  <HeaderDesign text={item.taskTitle} />
                  <TextSecondary
                    text={moment(item.updatedAt).format("DD MMM YYYY")}
                  />
                </View>
              </FlexText>
              <TextPrimary
                style={{ color: "#115E59", fontWeight: "700" }}
                text={`+ ₦ ${item.amount.toLocaleString()}`}
              />
            </View>
          )}
          ListEmptyComponent={
            <TextSecondary
              style={{ textAlign: "center", marginTop: 20 }}
              text="No transactions found for this range."
            />
          }
          ListFooterComponent={<View style={{ height: 20 }} />}
        />
      )}
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
  errorBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#FEF2F2",
  },
  errorText: {
    color: "#991B1B",
    textAlign: "center",
    fontWeight: "600",
  },
});
