import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useAcceptOfferMutation, useCreateBidMutation } from "../../redux/apis";
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import ButtonBG from "../ui/buttons/ButtonBG";
import Input from "../ui/inputs/Input";
import TextArea from "../ui/inputs/TextArea";

const SubmitBitButt = ({ id, accept }: { id: string; accept: string }) => {
  const { height, width } = ScreenSize();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [createBid, { isLoading }] = useCreateBidMutation();
  const [acceptOffer, { isLoading: isAccepting }] = useAcceptOfferMutation();
  const handleSubmit = () => {
    const body = {
      task: id,
      price: Number(price),
      details: message,
    };
    createBid(body)
      .unwrap()
      .then((res) => {
        Toast.show({
          type: "success",
          text1: "Bid created successfully",
        });
        setMessage("");
        setPrice("");
        setOpen(false);
      })
      .catch((error) => {
        Toast.show({
          type: "error",
          text1: error?.data?.message,
        });
      });
  };

  return (
    <>
      <ButtonBG
        style={{ width: "auto" }}
        text={accept ? (isAccepting ? "Accepting..." : "Accept") : "Submit a Bid"}
        handler={() => {
          if (accept) {
            acceptOffer({ taskId: id })
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
          } else {
            setOpen(true);
          }
        }}
        disabled={!!accept && isAccepting}
      />
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
                  <HeaderDesign text="Send Your Offer" />
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
                  text={isLoading ? "Loading..." : "Submit"}
                  handler={handleSubmit}
                  style={{ marginTop: 16 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default SubmitBitButt;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // semi-transparent background
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
