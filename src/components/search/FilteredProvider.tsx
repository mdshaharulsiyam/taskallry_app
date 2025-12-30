import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useGetAllServicesQuery } from "../../redux/apis";
import { useAppSelector } from "../../redux/hooks";
import EmptyList from "../shered/EmptyList";
import ProviderCard from "../shered/ProviderCard";

const FilteredProvider = ({ search }: { search: string }) => {
  const [limit, setLimit] = useState(20);
  const { category, sort } = useAppSelector((state) => state.filter);

  const { data, isFetching, isLoading, refetch } = useGetAllServicesQuery({ page: 1, limit });

  const services = data?.data?.result || [];
  const filteredServices = useMemo(() => {
    let filtered = services;
    if (category) {
      filtered = filtered.filter(
        (service: any) => service?.category?._id === category
      );
    }
    if (search?.trim()) {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter((service: any) => {
        const title = service?.title?.toLowerCase() || "";
        const providerName = service?.provider?.name?.toLowerCase() || "";
        return title.includes(term) || providerName.includes(term);
      });
    }

    const sorted = [...filtered];
    switch (sort) {
      case "TOP_RATED":
        sorted.sort(
          (a: any, b: any) =>
            (b?.averageRating || 0) - (a?.averageRating || 0)
        );
        break;
      case "PRICE_HIGH_TO_LOW":
        sorted.sort((a: any, b: any) => (b?.price || 0) - (a?.price || 0));
        break;
      case "PRICE_LOW_TO_HIGH":
        sorted.sort((a: any, b: any) => (a?.price || 0) - (b?.price || 0));
        break;
      case "NEWEST_SERVICE":
        sorted.sort(
          (a: any, b: any) =>
            new Date(b?.createdAt || "").getTime() -
            new Date(a?.createdAt || "").getTime()
        );
        break;
      default:
        break;
    }
    return sorted;
  }, [category, search, services, sort]);

  const keyExtractor = useCallback((item: any, index: number) => (item?._id || item?.id || index).toString(), []);
  const renderItem = useCallback(({ item }: { item: any }) => <ProviderCard item={item} />, []);
  const handleEndReached = useCallback(() => {
    const total = data?.data?.meta?.total || 0;
    if (!isFetching && total > services.length) {
      setLimit((prev) => prev + 20);
    }
  }, [data?.data?.meta?.total, isFetching, services.length]);
  const listFooter = useMemo(
    () =>
      isFetching && services.length > 0 ? (
        <ActivityIndicator style={{ marginVertical: 8 }} />
      ) : null,
    [isFetching, services.length]
  );

  return (
    <View style={{ marginTop: 10 }}>
      {filteredServices.length === 0 ? (
        <EmptyList
          title="No providers found"
          description="Try adjusting your filters or pull to refresh."
          showImage={false}
          refetch={refetch}
          refetchLoading={isLoading || isFetching}
        />
      ) : (
        <FlatList
          ListHeaderComponent={
            isFetching && (data?.data?.result?.length || 0) > 0 ? (
              <ActivityIndicator style={{ marginVertical: 8 }} />
            ) : null
          }
          data={filteredServices}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.1}
          onEndReached={handleEndReached}
          ListFooterComponent={listFooter}
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

export default React.memo(FilteredProvider);

const styles = StyleSheet.create({});

