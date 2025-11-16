import React, { useState } from "react";
import { FlatList } from "react-native";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import ButtonBG from "../ui/buttons/ButtonBG";

const TabButton = ({
  tab,
  handler,
}: {
  tab?: string[];
  handler?: (tab: string) => void;
}) => {
  const { role } = useGlobalContext();
  const tabs =
    role == "user"
      ? [
        "All Tasks",
        "open for bids",
        "in Progress",
        "completed",
        "cancelled",
        "dispute",
      ]
      : ["Ongoing Tasks", "Bids  Made", "Bids  Received", "dispute"];
  const [activeTab, setActiveTab] = useState<string>(tab ? tab[0] : tabs[0]);

  return (
    <FlatList
      data={tab || tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <ButtonBG
          text={item}
          handler={() => {
            setActiveTab(item), handler?.(item);
          }}
          style={{
            width: "auto",
            backgroundColor: item == activeTab ? "#115E59" : "#E6F4F1",
            marginHorizontal: 5,
          }}
          textStyle={{
            color: item == activeTab ? "#FFFFFF" : "#000000",
            textTransform: "capitalize",
          }}
        />
      )}
    />
  );
};

export default TabButton;
