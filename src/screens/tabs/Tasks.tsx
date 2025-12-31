import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import TabButton from "../../components/mytask/TabButton";
import SectionHeading from "../../components/shered/SectionHeading";
import TaskCard from "../../components/shered/TaskCard";
import Loader from "../../components/ui/loader/Loader";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetMyTaskQuery } from "../../redux/apis/taskApi";

const Tasks = () => {
  const { role } = useGlobalContext();
  const [tab, setTab] = useState("All Tasks");

  const getStatusFromTab = (
    currentTab: string,
    currentRole: "user" | "service" | null
  ) => {
    if (currentRole === "service") {
      switch (currentTab) {
        case "Ongoing Tasks":
          return "IN_PROGRESS" as const;
        case "Bids  Made":
          return "bidMade" as const;
        case "Bids  Received":
          return "bidReceived" as const;
        case "dispute":
          return "DISPUTED" as const;
        default:
          return undefined;
      }
    }

    switch (currentTab) {
      case "open for bids":
        return "OPEN_FOR_BID" as const;
      case "in Progress":
        return "IN_PROGRESS" as const;
      case "completed":
        return "COMPLETED" as const;
      case "cancelled":
        return "CANCELLED" as const;
      case "dispute":
        return "DISPUTED" as const;
      default:
        return undefined;
    }
  };

  const status = getStatusFromTab(tab, role);

  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLimit(20);
  }, [status]);

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetMyTaskQuery(
    status ? { status, page: 1, limit } : { page: 1, limit }
  );

  const tasks = data?.data?.result || [];

  const header = useMemo(
    () => (
      <>
        <SectionHeading
          style={{
            marginVertical: 10,
          }}
          text="My Task"
          showViewButton={false}
        />
        <TabButton handler={(t) => setTab(t)} activeTab={tab} />
      </>
    ),
    [tab]
  );

  const renderTaskItem = useCallback(
    ({ item }: { item: any }) => (
      <TaskCard
        // from={role === "service" ? "service" : "user"}
        tab={tab}
        showDetailsButton={true}
        task={item}
      />
    ),
    [role, tab]
  );

  const handleEndReached = useCallback(() => {
    const total = data?.data?.pagination?.total || 0;
    if (!isFetching && total > tasks.length) {
      setLimit((prev) => prev + 20);
    }
  }, [data?.data?.pagination?.total, isFetching, tasks.length]);

  return (
    <SafeAreaProviderNoScroll>
      <FlatList
        data={tasks}
        keyExtractor={(item: any, index) =>
          item?._id ? String(item._id) : index.toString()
        }
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        onEndReachedThreshold={0.1}
        onEndReached={handleEndReached}
        renderItem={renderTaskItem}
        ListEmptyComponent={
          isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingTop: 40,
              }}
            >
              <ActivityIndicator size="large" />
            </View>
          ) : null
        }
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
        removeClippedSubviews
        ListFooterComponent={
          isFetching && tasks.length > 0 ? <Loader /> : null
        }
        refreshing={isFetching && tasks.length === 0}
        onRefresh={() => {
          if (!isFetching) {
            refetch();
          }
        }}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Tasks;

