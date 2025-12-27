import React, { useCallback, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useGetAllServicesQuery } from "../../redux/apis";
import EmptyList from "../shered/EmptyList";
import ProviderCard from "../shered/ProviderCard";

const FilteredProvider = ({ search }: { search: string }) => {
  const [limit, setLimit] = useState(20);

  const { data, isFetching, isLoading, refetch } = useGetAllServicesQuery({ page: 1, limit });

  const services = data?.data?.result || [];
  const filteredServices = useMemo(() => {
    if (!search?.trim()) return services;
    const term = search.trim().toLowerCase();
    return services.filter((service: any) => {
      const title = service?.title?.toLowerCase() || "";
      const providerName = service?.provider?.name?.toLowerCase() || "";
      return title.includes(term) || providerName.includes(term);
    });
  }, [search, services]);

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

