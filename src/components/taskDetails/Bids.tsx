import React from "react";
import { View } from "react-native";
import { useGetBidsByTaskIdQuery } from '../../redux/apis';
import Bids_QuestionCard from "./Bids_QuestionCard";

const Bids = ({
  from = "service",
  status,
  id,
  role,
  customer,
}: {
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
  id: string;
  role?: "user" | "service";
  customer?: string;
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
        <Bids_QuestionCard type="bids" from={from} status={status} item={item} customer={customer} />
      ))}
    </View>
  );
};

export default Bids;
