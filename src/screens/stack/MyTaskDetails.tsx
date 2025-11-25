import { useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import DetailsTask from "../../components/taskDetails/DetailsTask";

const MyTaskDetails = () => {
  const {
    params: { heading, from, id },
  } = useRoute().params as {
    params: {
      heading: "Tasks Details" | "My Tasks Details";
      from: "user" | "service";
      id: string;
    };
  };
  return <DetailsTask heading={heading} from={from} id={id} />;
};

export default MyTaskDetails;

const styles = StyleSheet.create({});
