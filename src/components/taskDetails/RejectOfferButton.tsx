import React from "react";
import { Alert } from "react-native";
import Toast from "react-native-toast-message";
import { useRejectOfferMutation } from "../../redux/apis";
import ButtonTransparentBG from "../ui/buttons/ButtonTransparentBG";

interface RejectOfferButtonProps {
  id: string;
  onReject?: (taskId: string) => void | Promise<void>;
  disabled?: boolean;
}

const RejectOfferButton = ({
  id,
  onReject,
  disabled = false,
}: RejectOfferButtonProps) => {
  const [rejectOffer, { isLoading }] = useRejectOfferMutation();
  const handleReject = () => {
    if (disabled) return;

    const proceed = async () => {
      try {
        await rejectOffer(id).unwrap();
        Toast.show({
          type: "success",
          text1: "Offer rejected",
          text2: "The task owner has been notified.",
        });
        await onReject?.(id);
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Failed to reject offer",
          text2: error?.data?.message || "Please try again later.",
        });
      }
    };

    Alert.alert(
      "Reject offer?",
      "This will notify the task owner that you're not interested.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Reject", style: "destructive", onPress: proceed },
      ]
    );
  };

  return (
    <ButtonTransparentBG
      style={{
        borderColor: "#DC2626",
        width: 80,
      }}
      text={isLoading ? "..." : "Reject"}
      handler={handleReject}
      disabled={disabled || isLoading}
    />
  );
};

export default RejectOfferButton;
