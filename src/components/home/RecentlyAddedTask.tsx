import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Navigate from "../../utils/Navigate";
import SectionHeading from "../shered/SectionHeading";
import TaskCard from "../shered/TaskCard";
import { useGetAllTasksQuery } from "../../redux/apis";

const RecentlyAddedTask = () => {
  const navigate = Navigate();
  const { data } = useGetAllTasksQuery({
    sortOrder: "desc",
    sortBy: "createdAt",
  });
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
      <FlatList
        data={data?.data?.result || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TaskCard task={item} from="service" />}
      />
    </View>
  );
};

export default RecentlyAddedTask;

const styles = StyleSheet.create({});
