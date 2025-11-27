import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useGetAllServicesQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import EmptyList from "../shered/EmptyList";
import ProviderCard from "../shered/ProviderCard";
import SectionHeading from "../shered/SectionHeading";

const PopularTaskProvider = () => {
  const { data, refetch, isLoading, isFetching } = useGetAllServicesQuery({ page: 1, limit: 10 });
  const navigate = Navigate();
  const items = data?.data?.result || [];
  return (
    <View style={{ marginTop: 10 }}>
      <SectionHeading
        handler={() =>
          navigate("Search", {
            type: "Provider",
          })
        }
        color="#115E59"
        text="Popular Task Provider"
      />
      {items.length === 0 ? (
        <EmptyList
          title="No providers yet"
          description="When providers are available, you'll see them here."
          showImage={false}
          refetch={refetch}
          refetchLoading={isLoading || isFetching}
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ProviderCard item={item} />}
        />
      )}
    </View>
  );
};

export default PopularTaskProvider;

const styles = StyleSheet.create({});
