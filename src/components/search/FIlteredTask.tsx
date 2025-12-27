import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View
} from "react-native";
import { useGetAllTasksQuery } from "../../redux/apis";
import { useAppSelector } from "../../redux/hooks";
import EmptyList from "../shered/EmptyList";
import TaskCard from "../shered/TaskCard";

const FIlteredTask = ({ search }: { search: string }) => {
  const {
    category,
    to_be_done,
    work_location,
    distance_range,
    price_range,
    sort,
  } = useAppSelector((state) => state.filter);
  const latino = work_location?.split("|")?.[1]
    ? JSON.parse(work_location?.split("|")?.[1])
    : null;
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
    searchTerm?: string;
    maxDistance?: number;
  } = isStatusFilter
      ? {
        status: sort,
        ...(category ? { category } : {}),
        ...(latino
          ? {
            latitude: latino?.lat,
            longitude: latino?.lng,
            maxDistance:
              Number(distance_range) <= 0 ? 20 : Number(distance_range),
          }
          : {}),
        minPrice: 5000,
        maxPrice: Number(price_range) < 5000 ? 5100 : Number(price_range),
        ...(search ? { searchTerm: search } : {}),
        ...(to_be_done
          ? { doneBy: to_be_done == "in-person" ? "IN_PERSON" : "ONLINE" }
          : {}),
      }
      : {
        sortOrder: sort === "Oldest First" ? "asc" : "desc",
        sortBy: "createdAt",
        ...(category ? { category } : {}),
        ...(latino
          ? {
            latitude: latino?.lat,
            longitude: latino?.lng,
            maxDistance:
              Number(distance_range) <= 0 ? 20 : Number(distance_range),
          }
          : {}),
        minPrice: 5000,
        maxPrice: Number(price_range) < 5000 ? 500000 : Number(price_range),
        ...(search ? { searchTerm: search } : {}),
        ...(to_be_done
          ? { doneBy: to_be_done == "in-person" ? "IN_PERSON" : "ONLINE" }
          : {}),
      };
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    setLimit(20);
  }, [category, to_be_done, work_location, distance_range, price_range, sort, search]);

  const { data, isFetching, isLoading, refetch } = useGetAllTasksQuery({
    ...queryParams,
    page: 1,
    limit,
  });
  const keyExtractor = useCallback(
    (item: any, index: number) => (item?._id || item?.id || index).toString(),
    []
  );
  const renderItem = useCallback(
    ({ item }: { item: any }) => <TaskCard task={item} />,
    []
  );
  return (
    <View style={{ marginTop: 10 }}>
      {(data?.data?.result && data?.data?.result?.length < 1) ||
        !data?.data?.result ? (
        <EmptyList
          title="No tasks found"
          description="Try adjusting your filters or pull to refresh."
          showImage={false}
          refetch={refetch}
          refetchLoading={isLoading || isFetching}
        />
      ) : (
        <FlatList
          data={data?.data?.result || []}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            const total = data?.data?.pagination?.total || 0;
            const current = data?.data?.result?.length || 0;
            if (!isFetching && total > current) {
              setLimit((prev) => prev + 20);
            }
          }}
          ListHeaderComponent={
            isFetching && (data?.data?.result?.length || 0) > 0 ? (
              <ActivityIndicator style={{ marginVertical: 8 }} />
            ) : null
          }
          renderItem={renderItem}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews
          updateCellsBatchingPeriod={50}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default React.memo(FIlteredTask);


