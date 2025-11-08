import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import TabButton from "../../components/mytask/TabButton";
import SectionHeading from "../../components/shered/SectionHeading";
import TaskCard from "../../components/shered/TaskCard";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
const data = [
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
  {
    title: "Help move a couch",
    price: "₦24.00",
    location_address: "Los Angeles CA 90024",
    location_city: "New York, USA",
    date: "15 May 2020 8:00 am",
    user: {
      name: "Marvin Fey",
      status: "Open",
      offers: "1 offered",
    },
    image: "",
  },
];
const Tasks = () => {
  const [tab, setTab] = useState("All Tasks");

  const elements = [
    <SectionHeading
      style={{
        marginVertical: 10,
      }}
      text="My Task"
      showViewButton={false}
      key={1}
    />,
    <TabButton handler={(tab) => setTab(tab)} key={2} />,

    <FlatList
      key={3}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TaskCard from="user" tab={tab} showDetailsButton={true} task={item} />
      )}
    />,
  ];
  return (
    <SafeAreaProviderNoScroll>
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

export default Tasks;

const styles = StyleSheet.create({});
