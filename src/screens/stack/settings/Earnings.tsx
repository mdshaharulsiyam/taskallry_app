import React from "react";
import { FlatList, StyleSheet } from "react-native";
import EarningCard from "../../../components/earning/EarningCard";
import Transitions from "../../../components/earning/Transitions";
import SectionHeading from "../../../components/shered/SectionHeading";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";

const Earnings = () => {
  const elements = [
    <EarningCard key={1} />,
    <SectionHeading
      style={{
        marginTop: 20,
      }}
      color="#115E59"
      text="Transaction Log"
      showViewButton={false}
      key={2}
    />,
    <Transitions key={3} />,
  ];
  return (
    <SafeAreaProviderNoScroll backButtonText="Earnings">
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        data={elements}
        renderItem={({ item }) => item}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Earnings;

const styles = StyleSheet.create({});
