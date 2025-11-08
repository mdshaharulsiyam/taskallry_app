import React from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import TaskCard from "../shered/TaskCard";
import { useGetAllTasksQuery } from "../../redux/apis";
import { useAppSelector } from "../../redux/hooks";
import { selectSortBy, selectSortOrder } from "../../redux/slices/filterSlice";
import { otherIcons } from "../../constant/images";

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


  const isStatusFilter = sort === "OPEN_FOR_BID" || sort === "IN_PROGRESS";

  const queryParams: {
    sortOrder?: string;
    sortBy?: string;
    category?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
  } = isStatusFilter
      ? {
        status: sort,
        ...(category ? { category } : {}),
        minPrice: 5000,
        maxPrice: Number(price_range),
      }
      : {
        sortOrder: sort === "Oldest First" ? "asc" : "desc",
        sortBy: "createdAt",
        ...(category ? { category } : {}),
        minPrice: 5000,
        maxPrice: Number(price_range),
      };
  const { data } = useGetAllTasksQuery(queryParams)

  return (
    <View style={{ marginTop: 10 }}>
      {
        (data?.data?.result && data?.data?.result?.length < 1) || !data?.data?.result ? <>
          <Image
            source={otherIcons.Empty as ImageSourcePropType}
            style={{
              height: 100,
              alignSelf: "center",
            }}
          />
        </> :
          <FlatList
            data={data?.data?.result || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TaskCard
              task={item}
              from='user'
            />}
          />
      }

    </View>
  );
};

export default FIlteredTask;

const styles = StyleSheet.create({});
