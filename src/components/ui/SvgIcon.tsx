import React from "react";
import { TouchableOpacity, ViewStyle, StyleProp } from "react-native";
import { SvgXml, SvgUri, SvgProps } from "react-native-svg";

type SvgIconProps = {
  xml?: string;
  uri?: string;
  component?: React.ComponentType<SvgProps>;
  width?: number | string;
  height?: number | string;
  color?: string;
  style?: StyleProp<ViewStyle>;
  accessibleLabel?: string;
  onPress?: () => void;
};

const SvgIcon: React.FC<SvgIconProps> = ({
  xml,
  uri,
  component: Component,
  width = 24,
  height = 24,
  color,
  style,
  accessibleLabel,
  onPress,
}) => {
  const patchedXml = React.useMemo(() => {
    if (!xml || !color) return xml;
    try {
      let out = xml;
      if (!/fill=\"/i.test(out)) {
        out = out.replace(/<svg(\s|>)/i, `<svg fill=\"${color}\" $1`);
      } else {
        out = out.replace(/fill=\"(?!none)[^\"]*\"/gi, `fill=\"${color}\"`);
      }
      return out;
    } catch {
      return xml;
    }
  }, [xml, color]);

  const content = Component ? (
    <Component width={width as number} height={height as number} fill={color} />
  ) : xml ? (
    <SvgXml xml={patchedXml as string} width={width} height={height} />
  ) : uri ? (
    <SvgUri uri={uri} width={width} height={height} />
  ) : null;

  if (onPress) {
    return (
      <TouchableOpacity
        accessibilityRole="imagebutton"
        accessibilityLabel={accessibleLabel}
        style={style}
        onPress={onPress}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      accessibilityRole="image"
      accessibilityLabel={accessibleLabel}
      style={style}
      disabled
      activeOpacity={1}
    >
      {content}
    </TouchableOpacity>
  );
};

export default SvgIcon;
