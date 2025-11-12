import React from "react";
import { FlatList, View } from "react-native";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextPrimary from "../shered/TextPrimary";
import TextSecondary from "../shered/TextSecondary";
const transactions = [
  {
    id: "Tr_1A2B3C4D5E",
    date: "27 Aug 2020",
    time: "10:42 AM",
    amount: "₦9.89",
  },
  {
    id: "Tr_6F7G8H9I0J",
    date: "27 Aug 2020",
    time: "2:45 PM",
    amount: "₦9.89",
  },
  {
    id: "Tr_Z6A7B8C9D0",
    date: "27 Aug 2020",
    time: "12:52 PM",
    amount: "₦9.89",
  },
  {
    id: "Tr_E1F2G3H4I5",
    date: "27 Aug 2020",
    time: "1:56 PM",
    amount: "₦9.89",
  },
];
interface ITransactions {
  id: string;
  date: string;
  time: string;
  amount: string;
}
const Transitions = () => {
  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item?.id}
      renderItem={({ item }) => <TransitionCard item={item} />}
    />
  );
};

export default Transitions;

const TransitionCard = ({ item }: { item: ITransactions }) => {
  return (
    <FlexText
      style={{
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: "space-between",
        backgroundColor: "#FFF",
        marginVertical: 5,
      }}
    >
      <View>
        <HeaderSecondary text={item?.id} />
        <TextSecondary text={item?.date + " " + item?.time} />
      </View>
      <TextPrimary text={item?.amount} />
    </FlexText>
  );
};
