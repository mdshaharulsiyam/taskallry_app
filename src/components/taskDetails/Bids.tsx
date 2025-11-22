import React from "react";
import { View } from "react-native";
import { useGetBidsByTaskIdQuery } from '../../redux/apis';
import Bids_QuestionCard from "./Bids_QuestionCard";

const Bids = ({
  from = "service",
  status,
  id,
  role,
}: {
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
  id: string;
  role?: "user" | "service";
}) => {
  const { data } = useGetBidsByTaskIdQuery(id)
  console.log(data)
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {data?.data?.result?.map((item) => (
        <Bids_QuestionCard type="bids" from={from} status={status} item={item} role={role} />
      ))}
    </View>
  );
};

export default Bids;
