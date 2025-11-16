import React from "react";
import { View } from "react-native";
import { useGetBidsByTaskIdQuery } from '../../redux/apis';
import Bids_QuestionCard from "./Bids_QuestionCard";

const Bids = ({
  from = "service",
  status,
  id,
}: {
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
  id: string;
}) => {
  const { data } = useGetBidsByTaskIdQuery(id)
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {[...Array(5).keys()]?.map((item) => (
        <Bids_QuestionCard type="bids" from={from} status={status} />
      ))}
    </View>
  );
};

export default Bids;
