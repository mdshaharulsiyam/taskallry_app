import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useGetAllServicesQuery } from "../../redux/apis";
import EmptyList from "../shered/EmptyList";
import ProviderCard from "../shered/ProviderCard";

const FilteredProvider = () => {
  const [limit, setLimit] = useState(20);

  const { data, isFetching, isLoading, refetch } = useGetAllServicesQuery({ page: 1, limit });

  const services = data?.data?.result || [];

  const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);
  const renderItem = useCallback(({ item }: { item: any }) => <ProviderCard item={item} />, []);

  return (
    <View style={{ marginTop: 10 }}>
      {services.length === 0 ? (
        <EmptyList
          title="No providers found"
          description="Try adjusting your filters or pull to refresh."
          showImage={false}
          refetch={refetch}
          refetchLoading={isLoading || isFetching}
        />
      ) : (
        <FlatList
          data={services}
          keyExtractor={keyExtractor}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            const total = data?.data?.meta?.total || 0;
            if (!isFetching && total > services.length) {
              setLimit((prev) => prev + 20);
            }
          }}
          ListFooterComponent={
            isFetching && services.length > 0 ? (
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

export default React.memo(FilteredProvider);

const styles = StyleSheet.create({});

