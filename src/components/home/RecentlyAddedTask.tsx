import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useGetAllTasksQuery, useGetMyTaskQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import SectionHeading from "../shered/SectionHeading";
import TaskCard from "../shered/TaskCard";

const RecentlyAddedTask = () => {
  const navigate = Navigate();
  const { role } = useGlobalContext()
  const { data } = role == "user" ? useGetMyTaskQuery({
    sortOrder: "desc",
    sortBy: "createdAt",
  }) : useGetAllTasksQuery({
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
