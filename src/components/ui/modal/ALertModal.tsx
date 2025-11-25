import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AlertType = "error" | "success" | "warning";

interface AlertModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type?: AlertType;
  headerText?: string;
  text?: string;
  showCancel?: boolean;
  showOk?: boolean;
  onCancel?: () => void;
  onOk?: () => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  setVisible,
  type = "error",
  headerText = "Alert",
  text = "",
  showCancel = false,
  showOk = true,
  onCancel,
  onOk,
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return { color: "green", emoji: "✅" };
      case "warning":
        return { color: "#e6b800", emoji: "⚠️" };
      case "error":
      default:
        return { color: "red", emoji: "❌" };
    }
  };

  const { color, emoji } = getTypeStyles();

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={[styles.title, { color }]}>
            {emoji} {headerText}
          </Text>
          {text ? <Text style={styles.message}>{text}</Text> : null}

          <View style={styles.buttonRow}>
            {showCancel && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#aaa" }]}
                onPress={() => {
                  setVisible(false);
                  onCancel?.();
                }}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            )}

            {showOk && (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: color }]}
                onPress={() => {
                  setVisible(false);
                  onOk?.();
                }}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    width: "80%",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  message: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
