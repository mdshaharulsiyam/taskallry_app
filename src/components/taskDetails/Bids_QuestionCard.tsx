import React, { useState } from "react";
import { ImageSourcePropType, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Toast from "react-native-toast-message";
import { TabIcons } from "../../constant/images";
import { useGlobalContext } from '../../providers/GlobalContextProvider';
import { Bid, Question, useAcceptByCustomerMutation, useGetMyProfileQuery, useUpdateBidMutation } from '../../redux/apis';
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";
import ButtonBG from "../ui/buttons/ButtonBG";
import IconButtonTransparent from "../ui/buttons/IconButtonTransparent";
import Input from "../ui/inputs/Input";
import TextArea from "../ui/inputs/TextArea";

const Bids_QuestionCard = ({
  type,
  from = "service",
  status,
  item,
  question,
  customer,
}: {
  type: "bids" | "question";
  from?: "user" | "service";
  status: "OPEN_FOR_BID" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
  item?: Bid;
  question?: Question;
  customer?: string;
}) => {
  const { height, width } = ScreenSize();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState(item?.price ? String(item.price) : "");
  const [message, setMessage] = useState(item?.details || "");
  const [updateBid, { isLoading: isUpdating }] = useUpdateBidMutation();
  const [acceptOffer, { isLoading: isAccepting }] = useAcceptByCustomerMutation();
  const { data } = useGetMyProfileQuery()
  const { role } = useGlobalContext()
  const handleOpenUpdate = () => {
    if (item) {
      setPrice(String(item.price));
      setMessage(item.details || "");
    }
    setOpen(true);
  };

  const handleAcceptOffer = () => {
    if (!item?._id || !item?.task) return;

    const body = {
      bidID: item._id,
    };

    acceptOffer(body)
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: res?.message || "Offer accepted successfully",
        });
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error?.data?.message || "Failed to accept offer",
        });
      });
  };

  const handleUpdateSubmit = () => {
    if (!item?._id) return;
    const body = {
      bidId: item._id,
      price: Number(price),
      details: message,
    };
    updateBid(body)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Bid updated successfully",
        });
        setOpen(false);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error?.data?.message || "Failed to update bid",
        });
      });
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        marginVertical: 5,
      }}
    >
      <ImageFlex
        showText1={type == "bids"}
        text={item?.provider?.name || question?.provider?.name}
        text1={`⭐ ${item?.provider?.avgRating} (${item?.provider?.totalRatingCount} Reviews)`}
        image={item?.provider?.profile_image || question?.provider?.profile_image}
      />
      {type == "bids" && (
        <FlexText
          key={9}
          style={{
            justifyContent: "space-between",
            marginVertical: 10,
            backgroundColor: "#E6F4F1",
            padding: 10,
            borderRadius: 10,
          }}
        >
          <View>
            <TextSecondary text="Offered Price " />
            <HeaderDesign text={`₦${item?.price}`} />
          </View>
          {
            (data?.data?._id == item?.provider?._id || customer == data?.data?._id) && (
              <ButtonBG
                style={{
                  width: "auto",
                }}
                text={role == "user" ? (isAccepting ? "Accepting..." : "Accept") : "Update Offer"}
                handler={role == "user" ? handleAcceptOffer : handleOpenUpdate}
              />
            )
          }

        </FlexText>
      )}
      <TextSecondary text={item?.details || question?.details} />
      {from == "user" && type == "question" && (
        <IconButtonTransparent
          style={{
            marginTop: 10,
            width: 140,
          }}
          text="Chat Now"
          handler={() => console.log("")}
          icon={TabIcons.Chat as ImageSourcePropType}
        />
      )}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <FlexText
                  style={{
                    justifyContent: "space-between",
                  }}
                >
                  <HeaderDesign text="Update Your Offer" />
                  <TouchableOpacity onPress={() => setOpen(false)}>
                    <Text style={{ fontSize: 16, color: "red" }}>✕</Text>
                  </TouchableOpacity>
                </FlexText>

                <Input
                  handler={(_, text) => setPrice(text)}
                  placeHolder="Enter your offer price"
                  value={price}
                  name="price"
                  label="Bid Amount"
                  keyboard="numeric"
                />

                <TextArea
                  handler={(_, text) => setMessage(text)}
                  placeHolder="Message"
                  value={message}
                  name="message"
                  label="Message (optional)"
                  keyboard="default"
                />

                <ButtonBG
                  text={isUpdating ? "Loading..." : "Update Offer"}
                  handler={handleUpdateSubmit}
                  style={{ marginTop: 16 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Bids_QuestionCard;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
