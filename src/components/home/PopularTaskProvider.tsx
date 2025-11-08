import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Navigate from "../../utils/Navigate";
import ProviderCard from "../shered/ProviderCard";
import SectionHeading from "../shered/SectionHeading";
import { useGetAllServicesQuery } from "../../redux/apis";

const PopularTaskProvider = () => {
  const { data } = useGetAllServicesQuery({ page: 1, limit: 10 });
  const navigate = Navigate();
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
      <FlatList
        data={data?.data?.result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <ProviderCard item={item} />}
      />
    </View>
  );
};

export default PopularTaskProvider;

const styles = StyleSheet.create({});
