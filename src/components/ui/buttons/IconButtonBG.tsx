import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { otherIcons } from "../../../constant/images";

const IconButtonBG = ({
  style,
  icon,
  text,
  handler,
  textStyle,
}: {
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  text?: string;
  handler: () => void;
  textStyle?: TextStyle;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        handler?.();
      }}
      activeOpacity={0.7}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 6,
        backgroundColor: "#115E59",
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        ...style,
      }}
    >
      <Image
        source={icon ? icon : (otherIcons.manCircle as ImageSourcePropType)}
        style={{
          height: 24,
          width: 24,
          tintColor: "#FFFFFF",
        }}
      />
      <Text
        style={{
          color: "#FFFFFF",
          ...textStyle,
        }}
      >
        {text ? text : "Map View"}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButtonBG;

const styles = StyleSheet.create({});
