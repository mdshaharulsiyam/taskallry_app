import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import { useGetAllServicesQuery } from "../../redux/apis";
import ProviderCard from "../shered/ProviderCard";

const FilteredProvider = () => {
  const [limit, setLimit] = useState(20);

  const { data, isFetching } = useGetAllServicesQuery({ page: 1, limit });

  const services = data?.data?.result || [];

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
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
        renderItem={({ item }) => <ProviderCard item={item} />}
      />
    </View>
  );
};

export default FilteredProvider;

const styles = StyleSheet.create({});
