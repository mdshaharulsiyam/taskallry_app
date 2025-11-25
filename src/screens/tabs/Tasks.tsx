import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
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
          return "DISPUTE" as const;
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
        return "DISPUTE" as const;
      default:
        return undefined;
    }
  };

  const status = getStatusFromTab(tab, role);

  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLimit(20);
  }, [status]);

  const { data, isLoading, isFetching } = useGetMyTaskQuery(
    status ? { status, page: 1, limit } : { page: 1, limit }
  );

  const tasks = data?.data?.result || [];

  const elements = [
    <SectionHeading
      style={{
        marginVertical: 10,
      }}
      text="My Task"
      showViewButton={false}
      key={1}
    />,

    <TabButton handler={(tab) => setTab(tab)} key={2} />,
    isLoading || isFetching ? (
      <Loader />
    ) : (
      <FlatList
        key={3}
        data={tasks}
        keyExtractor={(_item, index) => index.toString()}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          const total = data?.data?.pagination?.total || 0;
          if (!isFetching && total > tasks.length) {
            setLimit((prev) => prev + 20);
          }
        }}
        renderItem={({ item }) => (
          <TaskCard
            from={role === "service" ? "service" : "user"}
            tab={tab}
            showDetailsButton={true}
            task={item}
          />
        )}
      />
    ),
  ];
  return (
    <SafeAreaProviderNoScroll>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        data={elements}
        renderItem={({ item }) => item}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Tasks;

const styles = StyleSheet.create({});
