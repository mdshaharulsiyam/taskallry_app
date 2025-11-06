import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import TaskCard from "../shered/TaskCard";
import { useGetAllTasksQuery } from "../../redux/apis";
import { useAppSelector } from "../../redux/hooks";
import { selectSortBy, selectSortOrder } from "../../redux/slices/filterSlice";

const FIlteredTask = () => {
  const {
    category,
    to_be_done,
    work_location,
    distance_range,
    price_range,
    sort,
    sortBy,
    sortOrder,
  } = useAppSelector((state) => state.filter);
  console.log({
    category,
    to_be_done,
    work_location,
    distance_range,
    price_range,
    sort,
    sortBy,
    sortOrder,
  })
  const { data } = useGetAllTasksQuery({ sortOrder, sortBy })


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
