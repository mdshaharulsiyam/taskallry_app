import React from "react";
import { View } from "react-native";
import { useGetQuestionsByTaskIdQuery } from '../../redux/apis';
import Bids_QuestionCard from "./Bids_QuestionCard";
import QuestionForm from "./QuestionForm";

const Questions = ({
  from = "service",
  status,
  id,
}: {
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE",
  id: string;
}) => {
  const { data } = useGetQuestionsByTaskIdQuery(id)
  return (
    <View
      style={{
        marginTop: from == "service" ? 0 : 10,
      }}
    >
      {from == "service" && <QuestionForm taskId={id} />}
      {data?.data?.map((item) => (
        <Bids_QuestionCard type="question" status={status} from={from} question={item} />
      ))}
    </View>
  );
};

export default Questions;
