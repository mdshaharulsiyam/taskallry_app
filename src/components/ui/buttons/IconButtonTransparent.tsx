import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { otherIcons } from "../../../constant/images";

const IconButtonTransparent = ({
  style,
  icon,
  text,
  handler,
  color = "#115E59",
}: {
  style?: ViewStyle;
  icon?: ImageSourcePropType;
  text?: string;
  handler: () => void;
  color?: string;
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
        borderColor: "#115E59",
        borderWidth: 2,
        backgroundColor: "transparent",
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
          tintColor: color,
        }}
      />
      <Text
        style={{
          color,
        }}
      >
        {text ? text : "Map View"}
      </Text>
    </TouchableOpacity>
  );
};

export default IconButtonTransparent;
