import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { otherIcons } from "../../constant/images";
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextSecondary from "../shered/TextSecondary";
import { useDeleteNotificationMutation } from "../../redux/apis/profileItemApi";

interface NotificationCardProps {
  notification: {
    title: string;
    message: string;
    // add more fields if exists
  };
}
const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
}) => {
  console.log("Notification item:", notification._id);
  const { width } = ScreenSize();
  // useDeleteNotificationMutation
  const [deleteNotificationMutation, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();
  const deleteNotification = async (id: string) => {
    try {
      const res = await deleteNotificationMutation(id).unwrap();
      console.log("Delete API Response:", res);
    } catch (err) {
      console.log("Delete error:", err);
    }
  };

  return (
    <FlexText
      style={{
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#FFFFFF",
        borderRadius: 5,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          width: width - 100,
        }}
      >
        <HeaderSecondary
          style={{
            fontSize: 18,
          }}
          text={notification?.title}
        />
        <TextSecondary text={notification?.message} />
      </View>
      <TouchableOpacity onPress={() => deleteNotification(notification?._id)}>
        <Image
          source={otherIcons.Close as ImageSourcePropType}
          style={{
            height: 15,
            width: 15,
          }}
        />
      </TouchableOpacity>
    </FlexText>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({});
