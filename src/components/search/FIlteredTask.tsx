import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TaskCard from "../shered/TaskCard";
import { useGetAllTasksQuery } from "../../redux/apis";
import FilterOptionsFields from "../../formFields/FilterOptionsFields";

const FIlteredTask = () => {
  const { data } = useGetAllTasksQuery({ sortOrder: "asc", sortBy: "createdAt" })


  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={data?.data?.result || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <TaskCard
          task={item}
          from='user'
        />}
      />
    </View>
  );
};

export default FIlteredTask;

const styles = StyleSheet.create({});
