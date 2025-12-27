import React from "react";
import { StyleSheet, View } from "react-native";
import { useGetProviderMetaDataQuery } from '../../redux/apis';
import FlexText from "../shered/FlexText";
import SectionHeading from "../shered/SectionHeading";
import MyStatsCard from "./MyStatsCard";

const MyStats = () => {
  const { data: providerMetaData } = useGetProviderMetaDataQuery();
  const statsData = [
    {
      name: "Total Tasks Completed",
      value: providerMetaData?.data?.completedCount + "",
    },
    {
      name: "Tasks in Progress",
      value: providerMetaData?.data?.inProgressCount + "",
    },
    {
      name: "Pending Tasks",
      value: providerMetaData?.data?.pendingCount + "",
    },
    {
      name: "Offers Made",
      value: providerMetaData?.data?.bidOpenForBidCount + "",
    },
  ];
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <SectionHeading text="My Stats" showViewButton={false} />
      <FlexText
        style={{
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {statsData.map((item, i) => (
          <MyStatsCard item={item} key={i} />
        ))}
      </FlexText>
    </View>
  );
};

export default MyStats;

const styles = StyleSheet.create({});
