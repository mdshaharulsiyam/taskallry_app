import React, { useCallback, useMemo, useState } from "react";
import { FlatList } from "react-native";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import ButtonBG from "../ui/buttons/ButtonBG";

const TabButton = ({
  tab,
  handler,
  activeTab,
}: {
  tab?: string[];
  handler?: (tab: string) => void;
  activeTab?: string;
}) => {
  const { role } = useGlobalContext();
  const tabs = useMemo(
    () =>
      role == "user"
        ? [
          "All Tasks",
          "open for bids",
          "in Progress",
          "completed",
          "cancelled",
          "dispute",
        ]
        : [
          "Ongoing Tasks",
          "Bids  Made",
          "Bids  Received",
          "Completed",
          "Cancelled",
          "dispute",
        ],
    [role]
  );
  const [internalActiveTab, setInternalActiveTab] = useState<string>(
    tab ? tab[0] : tabs[0]
  );

  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <ButtonBG
        text={item}
        handler={() => {
          setInternalActiveTab(item);
          handler?.(item);
        }}
        style={{
          width: "auto",
          backgroundColor:
            item == (activeTab ?? internalActiveTab) ? "#115E59" : "#E6F4F1",
          marginHorizontal: 5,
        }}
        textStyle={{
          color:
            item == (activeTab ?? internalActiveTab) ? "#FFFFFF" : "#000000",
          textTransform: "capitalize",
        }}
      />
    ),
    [activeTab, internalActiveTab, handler]
  );

  return (
    <FlatList
      data={tab || tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={renderItem}
    />
  );
};

export default React.memo(TabButton);
