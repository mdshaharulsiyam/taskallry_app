import React from "react";
import { View } from "react-native";
import { useGetQuestionsByTaskIdQuery } from '../../redux/apis';
import Bids_QuestionCard from "./Bids_QuestionCard";
import QuestionForm from "./QuestionForm";

const Questions = ({
  status,
  id,
  role,
  customer,
}: {
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE",
  id: string;
  role?: "user" | "service";
  customer?: string;
}) => {
  const { data } = useGetQuestionsByTaskIdQuery(id)
  return (
    <View
      style={{
        marginTop: role != "user" ? 0 : 10,
      }}
    >
      {role != "user" && <QuestionForm taskId={id} />}
      {data?.data?.map((item) => (
        <Bids_QuestionCard type="question" status={status} question={item} customer={customer} />
      ))}
    </View>
  );
};

export default Questions;
