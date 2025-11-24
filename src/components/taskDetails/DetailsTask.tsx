import moment from 'moment';
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import { otherIcons, TabIcons } from "../../constant/images";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";

import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { useDeleteTaskMutation, useGetSingleTaskQuery } from '../../redux/apis';
import { ImgUrl } from '../../redux/baseApi';
import Navigate from "../../utils/Navigate";
import BackButton from "../shered/BackButton";
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import HeaderSecondary from "../shered/HeaderSecondary";
import ImageFlex from "../shered/ImageFlex";
import TextPrimary from "../shered/TextPrimary";
import TextSecondary from "../shered/TextSecondary";
import BlueBadgeOpacity30 from "../ui/badges/BlueBadgeOpacity30";
import ButtonBG from "../ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../ui/buttons/ButtonGreenOpacity30";
import ButtonTransparentBG from "../ui/buttons/ButtonTransparentBG";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";
import Loader from '../ui/loader/Loader';
import Bids_Question from "./Bids_Question";
import CancelRefundRequest from "./CancelRefundRequest";
import FeedbackStatusButton from "./FeedbackStatusButton";
import SubmitBitButt from "./SubmitBitButt";
import TaskProgress from "./TaskProgress";

const color = {
  "OPEN_FOR_BID": {
    backgroundColor: "#FFEDD5",
    color: "#F97316",
  },
  "IN_PROGRESS": {
    backgroundColor: "#E0F2FE",
    color: "#0EA5E9",
  },
}

const DetailsTask = ({
  heading,
  from,
  id,
}: {
  heading?: "Tasks Details" | "My Tasks Details";
  from: "user" | "service";
  id: string;
}) => {
  const { role } = useGlobalContext();
  const { data, isLoading, isFetching } = useGetSingleTaskQuery(id)
  const [deleteTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
  const navigate = Navigate();
  const handleRemoveTask = () => {
    Alert.alert(
      "Remove Task",
      "Are you sure you want to remove this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            deleteTask(id)
              .unwrap()
              .then((res: any) => {
                Toast.show({
                  type: "success",
                  text1: "Task removed",
                  text2: res?.message || "Task has been removed successfully",
                });
                navigate("TabLayout", {
                  screen: "Task",
                })
              })
              .catch((err: any) => {
                Toast.show({
                  type: "error",
                  text1: "Failed to remove task",
                  text2: err?.data?.message || "Something went wrong",
                });
              });
          },
        },
      ]
    );
  };
  const elements = [
    <ButtonGreenOpacity30
      key={1}
      activeOpacity={1}
      text={data?.data?.status}
      style={{
        backgroundColor: color[data?.data?.status as keyof typeof color]?.backgroundColor,
        width: 200,
        borderRadius: 8,
        marginVertical: 10,
      }}
      textStyle={{
        color: color[data?.data?.status as keyof typeof color]?.color,
        fontWeight: 700,
      }}
    />,
    <HeaderDesign key={2} text="Help move a couch" />,
    <TextSecondary
      style={{
        marginBottom: 10,
      }}
      text={`Task ID #${data?.data?._id}`}
      key={3}
    />,

    heading == "My Tasks Details" ? (
      <Image
        key={5}
        source={{ uri: ImgUrl(data?.data?.customer?.profile_image + "") }}
        style={{
          width: 200,
          height: 120,
          borderRadius: 10,
        }}
      />
    ) : (
      <ImageFlex
        key={4}
        image={data?.data?.customer?.profile_image}
        text="Posted by"
        text1={data?.data?.customer?.name}
      />
    ),

    data?.data?.status != "OPEN_FOR_BID" ? (
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <ImageFlex
          key={4}
          image={data?.data?.provider?.profile_image}
          text="Assigned To"
          text1={data?.data?.provider?.name}
        />
        <IconButtonTransparent
          text="Chat"
          icon={TabIcons.Chat as ImageSourcePropType}
          handler={() => console.log("")}
          style={{
            width: "auto",
            paddingVertical: 6,
          }}
        />
      </FlexText>
    ) : (
      <></>
    ),

    <ImageFlex
      component={
        <BlueBadgeOpacity30 icon={otherIcons.Location as ImageSourcePropType} />
      }
      key={5}
      text="Location"
      text1={data?.data?.address}
    />,
    <ImageFlex
      component={
        <BlueBadgeOpacity30 icon={otherIcons.Calendar as ImageSourcePropType} />
      }
      key={6}
      text="to be done on"
      text1={moment(data?.data?.preferredDate).format("DD MMM YYYY h:mm A")}
    />,

    <HeaderSecondary
      key={7}
      style={{
        fontWeight: 700,
      }}
      text="Details"
    />,
    <TextPrimary
      key={8}
      text={data?.data?.description}
    />,

    heading == "My Tasks Details" ? (
      data?.data?.status == "OPEN_FOR_BID" ? (
        <FlexText
          key={9}
          style={{
            justifyContent: "center",
            marginTop: 10,
            alignItems: "center",
            flexDirection: "column",
            padding: 20,
            backgroundColor: "#E6F4F1",
            borderRadius: 5,
          }}
        >
          <TextSecondary text="Task budget" />
          <HeaderDesign text={`₦${data?.data?.budget}`} />
          <FlexText>
            <ButtonTransparentBG
              style={{
                width: "auto",
              }}
              text="Edit Task"
              handler={() =>
                navigate("TabLayout", {
                  screen: "PostTask",
                  params: {
                    task: data?.data,
                  },
                })
              }
            />
            <ButtonBG
              style={{
                width: "auto",
              }}
              text={isDeleting ? "Removing..." : "Remove the task."}
              handler={handleRemoveTask}
              disabled={isDeleting}
            />
          </FlexText>
        </FlexText>
      ) : (
        <></>
      )
    ) : role != "user" ? (
      <FlexText
        key={9}
        style={{
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <View>
          <TextSecondary text="Task budget" />
          <HeaderDesign text={`₦${data?.data?.budget}`} />
        </View>
        <SubmitBitButt id={id} />
      </FlexText>
    ) : (
      <></>
    ),
    data?.data?.status == "OPEN_FOR_BID" ? (
      <Bids_Question customer={data?.data?.customer?._id} from={from} status={data?.data?.status} key={10} id={id} role={role as "user" | "service"} />
    ) : (
      <></>
    ),
    data?.data?.status != "OPEN_FOR_BID" && from == "user" ? (
      <>
        <TaskProgress data={data?.data} key={11} />
        {data?.data?.status == "DISPUTE" && (
          <>
            <CancelRefundRequest />
            <FeedbackStatusButton status={data?.data?.status as any} />
          </>
        )}
      </>
    ) : (
      <></>
    ),
  ];
  if (isLoading) {
    return <Loader />
  }
  return (
    <SafeAreaProviderNoScroll>
      <BackButton
        text={heading}
        show={data?.data?.status == "IN_PROGRESS"}
        handler={() => navigate("RegulationsCenter", { id: data?.data?._id })}
      />
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        data={elements}
        renderItem={({ item }) => item}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default DetailsTask;

