import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import { useGetAllTasksQuery, useGetMyTaskQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import EmptyList from "../shered/EmptyList";
import SectionHeading from "../shered/SectionHeading";
import TaskCard from "../shered/TaskCard";

const RecentlyAddedTask = () => {
  const navigate = Navigate();
  const { role } = useGlobalContext();
  const myTasks = useGetMyTaskQuery(
    { sortOrder: "desc", sortBy: "createdAt" },
    { skip: role !== "user" }
  );
  const allTasks = useGetAllTasksQuery(
    { sortOrder: "desc", sortBy: "createdAt" },
    { skip: role === "user" }
  );
  const data = role === "user" ? myTasks.data : allTasks.data;
  const refetch = role === "user" ? myTasks.refetch : allTasks.refetch;
  const refetchLoading = role === "user" ? (myTasks.isFetching || myTasks.isLoading) : (allTasks.isFetching || allTasks.isLoading);
  const items = data?.data?.result || [];
  return (
    <View style={{ marginTop: 10 }}>
      <SectionHeading
        handler={() =>
          navigate("Search", {
            type: "Task",
          })
        }
        color="#115E59"
        text="Recently added task"
      />
      {items.length === 0 ? (
        <EmptyList
          title="No recent tasks"
          description="When new tasks appear, you will see them here."
          showImage={false}
          refetch={refetch}
          refetchLoading={refetchLoading}
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TaskCard task={item} from="service" />}
        />
      )}
    </View>
  );
};

export default RecentlyAddedTask;

const styles = StyleSheet.create({});
