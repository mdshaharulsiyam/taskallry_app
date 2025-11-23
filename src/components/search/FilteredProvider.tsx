import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useGetAllServicesQuery } from "../../redux/apis";
import ProviderCard from "../shered/ProviderCard";

const FilteredProvider = () => {
  const { data } = useGetAllServicesQuery({ page: 1, limit: 10 });
  const services = data?.data?.result || [];

  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProviderCard item={item} />}
      />
    </View>
  );
};

export default FilteredProvider;

const styles = StyleSheet.create({});
