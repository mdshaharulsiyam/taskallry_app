import React, { useCallback, useState } from "react";
import {
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import { TabIcons } from "../../constant/images";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import {
  Bid,
  Question,
  useAcceptByCustomerMutation,
  useGetMyProfileQuery,
  useUpdateBidMutation,
} from "../../redux/apis";
import { Navigation } from "../../utils/Navigate";
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
  status,
  item,
  question,
  customer,
}: {
  type: "bids" | "question";
  status:
  | "OPEN_FOR_BID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED"
  | "DISPUTE"
  | "LATE";
  item?: Bid;
  question?: Question;
  customer?: string;
}) => {
  const { height, width } = ScreenSize();
  const [open, setOpen] = useState(false);
  const [acceptModalOpen, setAcceptModalOpen] = useState(false);
  const [price, setPrice] = useState(item?.price ? String(item.price) : "");
  const [message, setMessage] = useState(item?.details || "");
  const [promoCode, setPromoCode] = useState("");
  const navigation = Navigation();
  const targetProvider = item?.provider || question?.provider;
  const goChatNow = useCallback(() => {
    if (!targetProvider?._id) return;
    navigation.navigate("Messages", {
      id: targetProvider?._id ?? "",
      name: targetProvider?.name ?? "",
      image: targetProvider?.profile_image ?? "",
      email: targetProvider?.email ?? "",
    });
  }, [
    navigation,
    targetProvider?._id,
    targetProvider?.name,
    targetProvider?.profile_image,
    targetProvider?.email,
  ]);
  const [updateBid, { isLoading: isUpdating }] = useUpdateBidMutation();
  const [acceptOffer, { isLoading: isAccepting }] =
    useAcceptByCustomerMutation();
  const { data } = useGetMyProfileQuery();
  const { role } = useGlobalContext();
  const handleOpenUpdate = () => {
    if (item) {
      setPrice(String(item.price));
      setMessage(item.details || "");
    }
    setOpen(true);
  };

  const handleAcceptOffer = async (code?: string) => {
    if (!item?._id || !item?.task) return;
    try {
      const body: { bidID: string; promoCode?: string } = {
        bidID: item._id,
      };
      if (code) {
        body.promoCode = code;
      }
      const res = await acceptOffer(body).unwrap();
      setAcceptModalOpen(false);
      setPromoCode("");
      console.log("Payment link:", res?.data?.paymentLink);
      Toast.show({
        type: "success",
        text1: res?.message || "Offer accepted successfully",
      });
      const paymentLink = res?.data?.paymentLink;
      if (paymentLink) {
        navigation.navigate("PaymentWebView", {
          url: paymentLink,
          title: "Complete Payment",
        });
      } else {
        Toast.show({
          type: "info",
          text1: "Payment link not available",
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Failed to accept offer",
        text2: error?.data?.message || "Please try again later.",
      });
    }
  };

  const handlePromoAccept = () => {
    const trimmed = promoCode.trim();
    if (!trimmed) {
      Toast.show({
        type: "error",
        text1: "Promo code required",
        text2: "Please enter a promo code to apply.",
      });
      return;
    }
    handleAcceptOffer(trimmed);
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
        image={
          item?.provider?.profile_image || question?.provider?.profile_image
        }
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
          {(data?.data?._id == item?.provider?._id ||
            customer == data?.data?._id) &&
            status == "OPEN_FOR_BID" && (
              <ButtonBG
                style={{
                  width: "auto",
                }}
                text={
                  role == "user"
                    ? isAccepting
                      ? "Accepting..."
                      : "Accept"
                    : "Update Offer"
                }
                handler={
                  role == "user"
                    ? () => setAcceptModalOpen(true)
                    : handleOpenUpdate
                }
              />
            )}
        </FlexText>
      )}
      <TextSecondary text={item?.details || question?.details} />
      {role == "user" && type == "question" && (
        <IconButtonTransparent
          style={{
            marginTop: 10,
            width: 140,
          }}
          text="Chat Now"
          handler={goChatNow}
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
      <Modal
        visible={acceptModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setAcceptModalOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setAcceptModalOpen(false)}>
          <View style={styles.backdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContainer}>
                <FlexText
                  style={{
                    justifyContent: "space-between",
                    marginBottom: 12,
                  }}
                >
                  <HeaderDesign text="Apply Promo Code" />
                  <TouchableOpacity onPress={() => setAcceptModalOpen(false)}>
                    <Text style={{ fontSize: 16, color: "red" }}>✕</Text>
                  </TouchableOpacity>
                </FlexText>

                <Input
                  name="promo"
                  label="Promo Code"
                  placeHolder="Enter promo code"
                  value={promoCode}
                  handler={(_, text) => setPromoCode(text.toUpperCase())}
                  keyboard="default"
                />

                <ButtonBG
                  text={isAccepting ? "Applying..." : "Apply Promo & Accept"}
                  handler={handlePromoAccept}
                  style={{ marginTop: 16 }}
                  disabled={isAccepting}
                />
                <ButtonBG
                  text={
                    isAccepting ? "Accepting..." : "Accept without Promo Code"
                  }
                  handler={() => handleAcceptOffer()}
                  style={{ marginTop: 10, backgroundColor: "#0EA5E9" }}
                  disabled={isAccepting}
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
