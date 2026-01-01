import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import {
  useCompleteTaskMutation,
  useCreateFeedbackMutation,
} from "../../redux/apis";
import ButtonBG from "../ui/buttons/ButtonBG";

const FeedbackStatusButton = ({
  status,
  id,
  onRefetch,
}: {
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "DISPUTE" | "LATE";
  id: string;
  onRefetch?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [completeTask, { isLoading }] = useCompleteTaskMutation();
  const [createFeedback, { isLoading: isSubmitting }] =
    useCreateFeedbackMutation();
  const handleStarPress = (index: number) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Toast.show({
        type: "error",
        text1: "Please add a rating",
      });
      return;
    }

    createFeedback({
      task: id,
      rating,
      details: review.trim() || undefined,
    })
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: "success",
          text1: "Feedback submitted",
          text2: res?.message || "Thanks for sharing your experience.",
        });
        setRating(0);
        setReview("");
        setOpen(false);
        onRefetch?.();
      })
      .catch((err: any) => {
        Toast.show({
          type: "error",
          text1: "Unable to submit feedback",
          text2: err?.data?.message || "Please try again.",
        });
      });
  };
  const handleCompleteTask = () => {
    completeTask({ taskId: id })
      .unwrap()
      .then((res: any) => {
        Toast.show({
          type: "success",
          text1: "Task completed",
          text2: res?.message || "Task has been completed successfully",
        });
        onRefetch?.();
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: "Unable to complete Task",
          text2: err?.data?.message || "Something went wrong",
        });
      });
  };
  return (
    <View style={{ flexDirection: "row", marginTop: 10 }}>
      <ButtonBG
        loading={isLoading}
        handler={() => {
          if (status == "COMPLETED") {
            setOpen(true);
          }
          if (status == "IN_PROGRESS") {
            handleCompleteTask();
          }
        }}
        text={status == "COMPLETED" ? "Send Feedback" : "Mark As Complete"}
        style={{
          width: "auto",
        }}
      />

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText}>Leave Feedback</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Text style={styles.closeBtn}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Rating */}
            <Text style={styles.label}>How was your experience?</Text>
            <View style={styles.starsRow}>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <TouchableOpacity key={i} onPress={() => handleStarPress(i)}>
                    <Text
                      style={[
                        styles.star,
                        { color: i < rating ? "#FFD700" : "#ccc" },
                      ]}
                    >
                      ★
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>

            {/* Review */}
            <Text style={[styles.label, { marginTop: 15 }]}>
              Write A Review (Optional)
            </Text>
            <TextInput
              placeholder="Share your thoughts, suggestions, or..."
              placeholderTextColor="#999"
              style={styles.textarea}
              multiline
              value={review}
              onChangeText={setReview}
            />

            {/* Submit */}
            <ButtonBG
              loading={isSubmitting}
              disabled={isSubmitting}
              handler={handleSubmit}
              text="Submit Review"
              style={{ marginTop: 20 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FeedbackStatusButton;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  closeBtn: {
    fontSize: 20,
    color: "#444",
  },
  divider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    fontSize: 28,
    marginRight: 5,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: "top",
  },
});
