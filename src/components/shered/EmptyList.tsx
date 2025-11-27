import React from "react";
import { ActivityIndicator, Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native";

interface EmptyListProps {
  title?: string;
  description?: string;
  containerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
  actionText?: string;
  onActionPress?: () => void;
  showImage?: boolean;
  refetch?: () => void;
  refetchLoading?: boolean;
}

const EmptyList: React.FC<EmptyListProps> = ({
  title = "Nothing here yet",
  description = "When items show up, you'll see them here.",
  containerStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  actionText,
  onActionPress,
  showImage = true,
  refetch,
  refetchLoading,
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        backgroundColor: "#FFFFFF",
        gap: 12,
        marginTop: 20,
        marginBottom: 20,
        ...containerStyle,
      }}
    >
      {showImage && (
        <Image
          source={require("../../assets/empty.png")}
          style={{ width: 140, height: 140, resizeMode: "contain", ...imageStyle }}
        />
      )}
      {!!title && (
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#111827", textAlign: "center", ...titleStyle }}>
          {title}
        </Text>
      )}
      {!!description && (
        <Text style={{ fontSize: 14, color: "#6B7280", textAlign: "center", ...descriptionStyle }}>
          {description}
        </Text>
      )}
      {refetch && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (refetchLoading) return;
            refetch();
          }}
          style={{
            marginTop: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 6,
            backgroundColor: refetchLoading ? "#6B7280" : "#111827",
          }}
        >
          {refetchLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Refetch</Text>
          )}
        </TouchableOpacity>
      )}
      {!!actionText && onActionPress && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onActionPress}
          style={{
            marginTop: 8,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 6,
            backgroundColor: "#115E59",
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyList;
