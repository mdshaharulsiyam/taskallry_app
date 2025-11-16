import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import FlexText from "./FlexText";
import TextPrimary from "./TextPrimary";
export interface IStatusData {
  name: string;
  date?: string;
  status: "complete" | "pending";
}
// const dummy: IStatusData[] = [
//   {
//     name: "Offered",
//     date: "Feb 21, 2023",
//     status: "complete",
//   },
//   {
//     name: "In Progress",
//     date: "Feb 21, 2023",
//     status: "complete",
//   },
//   {
//     name: "Completed on",
//     status: "pending",
//   },
// ];

const ProgressBar = ({ data }: { data: IStatusData[] }) => {
  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      {data?.map((item: IStatusData, i: number) => (
        <View key={item?.name}>
          {i != 0 && (
            <View
              style={{
                height: 50,
                width: 10,
                borderRadius: 2,
                backgroundColor:
                  item?.status == "complete" ? "#115E59" : "#6B7280",
                marginLeft: 15,
              }}
            />
          )}
          <FlexText
            style={{
              marginVertical: 2,
              gap: 10,
            }}
          >
            <View
              style={{
                height: 40,
                width: 40,
                borderRadius: 100,
                backgroundColor:
                  item?.status == "complete" ? "#115E59" : "#6B7280",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {item?.status == "complete" && (
                <Image source={otherIcons.Check as ImageSourcePropType} />
              )}
            </View>
            <View>
              <TextPrimary
                text={item?.name}
                style={{
                  fontWeight: 700,
                }}
              />
              {item?.status == "complete" && (
                <FlexText>
                  <Image
                    source={otherIcons.Calendar as ImageSourcePropType}
                    style={{
                      width: 15,
                      height: 15,
                    }}
                  />
                  <TextPrimary text={item?.date} />
                </FlexText>
              )}
            </View>
          </FlexText>
        </View>
      ))}
    </View>
  );
};

export default ProgressBar;
