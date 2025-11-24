import React, { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
} from "react-native";
import { otherIcons } from "../../constant/images";
import { ImgUrl } from "../../redux/baseApi";
import FlexText from "./FlexText";
import HeaderSecondary from "./HeaderSecondary";
import TextSecondary from "./TextSecondary";

const ImageFlex = ({
  image,
  text1 = "text 1",
  text = "text",
  component,
  showText1 = true,
  style,
}: {
  image?: string | ImageSourcePropType;
  text?: string;
  text1?: string;
  component?: ReactNode;
  showText1?: boolean;
  style?: ImageStyle;
}) => {
  return (
    <FlexText
      style={{
        marginVertical: 5,
      }}
    >
      {component ? (
        component
      ) : (
        <Image
          source={
            image
              ? { uri: ImgUrl(image + "") }
              : (otherIcons.Avater as ImageSourcePropType)
          }
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            ...style,
          }}
        />
      )}

      <View>
        <HeaderSecondary style={{ fontWeight: "700" }} text={text} />
        {showText1 && <TextSecondary text={text1} />}
      </View>
    </FlexText>
  );
};

export default ImageFlex;

const styles = StyleSheet.create({});
