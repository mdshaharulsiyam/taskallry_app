import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import ScreenSize from "../../utils/ScreenSize";
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import ButtonBG from "../ui/buttons/ButtonBG";
import Input from "../ui/inputs/Input";
import TextArea from "../ui/inputs/TextArea";

const SubmitBitButt = () => {
  const { height, width } = ScreenSize();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {

    setMessage("");
    setPrice("");
    setOpen(false);
  };

  return (
    <>
      <ButtonBG
        style={{ width: "auto" }}
        text="Submit a Bid"
        handler={() => setOpen(true)}
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
                  handler={(text) => setPrice(text)}
                  placeHolder="Enter your offer price"
                  value={price}
                  label="Bid Amount"
                  keyboard="default"
                />

                <TextArea
                  handler={(text) => setMessage(text)}
                  placeHolder="Message"
                  value={message}
                  label="Message (optional)"
                  keyboard="default"
                />

                <ButtonBG
                  text="Submit"
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
