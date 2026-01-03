import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { otherIcons } from "../../constant/images";
import { useDeleteNotificationMutation } from "../../redux/apis/profileItemApi";
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import TextSecondary from "../shered/TextSecondary";

interface NotificationCardProps {
  notification: {
    title: string;
    message: string;
    _id: string;
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
    console.log("Attempting to delete notification:", id);
    try {
      const res = await deleteNotificationMutation(id).unwrap();
      console.log("Delete API Response:", res);
      Toast.show({
        type: "success",
        text1: "Notification removed",
      });
    } catch (err) {
      console.log("Delete error:", err);
      Toast.show({
        type: "error",
        text1: "Unable to delete notification",
      });
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
      <TouchableOpacity
        onPress={() => deleteNotification(notification?._id)}
        disabled={isDeleting}
        style={isDeleting ? styles.disabledDelete : undefined}
      >
        {isDeleting ? (
          <ActivityIndicator size="small" color="#115E59" />
        ) : (
          <Image
            source={otherIcons.Close as ImageSourcePropType}
            style={{
              height: 15,
              width: 15,
            }}
          />
        )}
      </TouchableOpacity>
    </FlexText>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  disabledDelete: {
    opacity: 0.5,
  },
});

