import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import NotificationCard from "../../../components/notification/NotificationCard";
import TextPrimary from "../../../components/shered/TextPrimary";
import SafeAreaProviderNoScroll from "../../../providers/SafeAreaProviderNoScroll";
import {
  useGetNotificationQuery,
  useReadAllMutation,
} from "../../../redux/apis/profileItemApi";

const Notifications = () => {
  const { data, isLoading } = useGetNotificationQuery();
  // useReadAllMutation
  const [readAllMutation, { isLoading: isReadingAll }] = useReadAllMutation();

  const readAll = async () => {
    try {
      const res = await readAllMutation().unwrap();
      console.log("Read all API Response:", res);
    } catch (err) {
      console.log("Read all error:", err);
    }
  };

  // console.log("Notification data:", data?.data?.result, isLoading);
  return (
    <SafeAreaProviderNoScroll backButtonText="Notifications">
      <TouchableOpacity
        onPress={readAll}
        style={{
          marginLeft: "auto",
        }}
      >
        <TextPrimary
          style={{
            color: "#0EA5E9",
          }}
          text="Read All"
        />
      </TouchableOpacity>
      <FlatList
        data={data?.data?.result}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <NotificationCard notification={item} />
        )}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
