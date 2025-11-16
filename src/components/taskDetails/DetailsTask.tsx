import moment from 'moment';
import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import { otherIcons, TabIcons } from "../../constant/images";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";

import { useGetSingleTaskQuery } from '../../redux/apis';
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

const DetailsTask = ({
  heading,
  from,
  id,
}: {
  heading?: "Tasks Details" | "My Tasks Details";
  from: "user" | "service";
  id: string;
}) => {
  const [status, setStatus] = React.useState<
    "All Tasks" | "open for bids" | "in Progress" | "completed" | "cancelled" | "dispute" | "Ongoing Tasks" | "Bids  Made" | "Bids  Received"
  >("open for bids");
  const { data, isLoading, isFetching } = useGetSingleTaskQuery(id)
  const elements = [
    <ButtonGreenOpacity30
      key={1}
      activeOpacity={1}
      text={data?.data?.status}
      style={{
        backgroundColor: "#FFEDD5",
        width: 200,
        borderRadius: 8,
        marginVertical: 10,
      }}
      textStyle={{
        color: "#F97316",
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

    data?.data?.status == "IN_PROGRESS" ? (
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <ImageFlex
          key={4}
          image={`https://placehold.co/400x400.png`}
          text="Assigned To"
          text1="Marvin Fey"
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
      data?.data?.status != "IN_PROGRESS" ? (
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
            />
            <ButtonBG
              style={{
                width: "auto",
              }}
              text="Remove the task."
              handler={() => { }}
            />
          </FlexText>
        </FlexText>
      ) : (
        <></>
      )
    ) : (
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
    ),
    data?.data?.status == "OPEN_FOR_BID" ? (
      <Bids_Question from={from} status={data?.data?.status} key={10} id={id} />
    ) : (
      <></>
    ),
    data?.data?.status != "OPEN_FOR_BID" && from == "user" ? (
      <>
        <TaskProgress key={11} />
        {data?.data?.status == "DISPUTE" && (
          <>
            <CancelRefundRequest />
            <FeedbackStatusButton status={status} />
          </>
        )}
      </>
    ) : (
      <></>
    ),
  ];
  const navigate = Navigate();
  if (isLoading || isFetching) {
    return <Loader />
  }
  return (
    <SafeAreaProviderNoScroll>
      <BackButton
        text={heading}
        show={status == "in Progress"}
        handler={() => navigate("RegulationsCenter")}
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

const styles = StyleSheet.create({});
