import moment from "moment";
import React from "react";
import { View } from "react-native";
import { statusWithDate, Task } from "../../redux/apis";
import FlexText from "../shered/FlexText";
import ProgressBar, { IStatusData } from "../shered/ProgressBar";
import TextPrimary from "../shered/TextPrimary";
import TextSecondary from "../shered/TextSecondary";

const TaskProgress = ({ data }: { data: Task | undefined }) => {
  const progress_data: IStatusData[] =
    data?.statusWithDate?.map((item: statusWithDate) => ({
      name: item?.status,
      status: "complete",
      date: moment(item?.date).format("MMM DD, YYYY"),
    })) || [];
  progress_data.push({
    name: "COMPLETE",
    status: "pending",
    date: "",
  });
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <TextPrimary text="Offered price" />
        <TextSecondary text={"₦ " + data?.budget} />
      </FlexText>
      {/* <FlexText
        style={{
          justifyContent: "space-between",
          marginTop: 6,
        }}
      >
        <TextPrimary text="Discount (0%)" />
        <TextSecondary text="₦ 0" />
      </FlexText>
      <GreenLine /> */}
      {/* <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <TextPrimary text="Total" />
        <TextSecondary text="₦ 27.6" />
      </FlexText> */}
      <ProgressBar data={progress_data} />
    </View>
  );
};

export default TaskProgress;
