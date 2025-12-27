import moment from "moment";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TouchableOpacity,
  View
} from "react-native";
import { otherIcons } from "../../constant/images";
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { Task } from "../../redux/apis";
import { ImgUrl } from "../../redux/baseApi";
import Navigate from "../../utils/Navigate";
import ButtonBG from "../ui/buttons/ButtonBG";
import GreenLine from "../ui/line/GreenLine";
import FlexCardIcon from "./FlexCardIcon";
import FlexText from "./FlexText";
import HeaderDesign from "./HeaderDesign";
import HeaderSecondary from "./HeaderSecondary";
import TextPrimary from "./TextPrimary";

const TaskCard = ({
  imageStyle,
  showDetailsButton = false,
  tab,
  task,
}: {
  imageStyle?: ImageStyle;
  showDetailsButton?: boolean;
  tab?: string;
  task: Task;
}) => {
  const { role } = useGlobalContext()
  const navigate = Navigate();
  return (
    <TouchableOpacity
      activeOpacity={showDetailsButton ? 1 : 0.7}
      onPress={() =>
        showDetailsButton
          ? null
          : navigate("TaskDetails", {
            params: {
              id: task?._id,
              from: role,
              heading: role == "user" ? "My Tasks Details" : "Tasks Details",
            },
          })
      }
      style={{
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 6,
        marginTop: 10,
      }}
    >
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <HeaderDesign
          style={{
            fontSize: 18,
          }}
          text={task?.title}
        />
        <HeaderDesign
          style={{
            fontSize: 18,
          }}
          text={task?.budget + ""}
        />
      </FlexText>
      {showDetailsButton && <GreenLine />}

      <FlexCardIcon
        text={task?.address}
        image={otherIcons.Location as ImageSourcePropType}
      />
      <FlexCardIcon
        text={moment(task?.preferredDeliveryDateTime).format("DD-MM-YYYY")}
        image={otherIcons.Calendar as ImageSourcePropType}
      />
      <FlexCardIcon
        text={moment(task?.preferredDeliveryDateTime).format("h:mm A")}
        image={otherIcons.Watch as ImageSourcePropType}
      />
      <FlexText
        style={{
          marginTop: 6,
          gap: 10,
        }}
      >
        <Image
          source={
            task?.customer?.profile_image
              ? { uri: ImgUrl(task?.customer?.profile_image + "") }
              : (otherIcons.Avater as ImageSourcePropType)
          }
          style={{
            height: showDetailsButton ? 60 : 50,
            width: showDetailsButton ? 100 : 50,
            borderRadius: showDetailsButton ? 5 : 50,
            ...imageStyle,
          }}
        />
        <View>
          <HeaderSecondary
            style={{
              fontWeight: "700",
            }}
            text={task?.customer?.name}
          />
          <FlexText>
            <TextPrimary
              style={{
                color: "#F97316",
                fontWeight: "700",
              }}
              text={task?.status}
            />
            <TextPrimary text={task?.totalOffer + " offered"} />
          </FlexText>
        </View>
      </FlexText>
      {showDetailsButton && (
        <>
          <GreenLine />
          <ButtonBG
            style={{
              width: 120,
            }}
            text="View Details"
            handler={() =>
              navigate("TaskDetails", {
                params: {
                  id: task?._id,
                  from: role,
                  heading:
                    role == "user" ? "My Tasks Details" : "Tasks Details",
                },
              })
            }
          />
        </>
      )}
    </TouchableOpacity>
  );
};

export default React.memo(TaskCard);

