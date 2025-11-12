import React from "react";
import { FlatList, Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import { otherIcons } from "../../constant/images";
import { useGetAllTasksQuery } from "../../redux/apis";
import { useAppSelector } from "../../redux/hooks";
import TaskCard from "../shered/TaskCard";

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
  const latino = work_location?.split("|")?.[1] ? JSON.parse(work_location?.split("|")?.[1]) : null
  const isStatusFilter = sort === "OPEN_FOR_BID" || sort === "IN_PROGRESS";

  const queryParams: {
    sortOrder?: string;
    sortBy?: string;
    category?: string;
    status?: string;
    minPrice?: number;
    maxPrice?: number;
    latitude?: number;
    longitude?: number;
  } = isStatusFilter
      ? {
        status: sort,
        ...(category ? { category } : {}),
        ...(latino ? { latitude: latino?.lat, longitude: latino?.lng } : {}),
        minPrice: 5000,
        maxPrice: Number(price_range),
      }
      : {
        sortOrder: sort === "Oldest First" ? "asc" : "desc",
        sortBy: "createdAt",
        ...(category ? { category } : {}),
        ...(latino ? { latitude: latino?.lat, longitude: latino?.lng } : {}),
        minPrice: 5000,
        maxPrice: Number(price_range),
      };
  console.log(to_be_done)
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
