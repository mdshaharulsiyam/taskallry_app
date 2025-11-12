import React from "react";
import { View, ViewStyle, Text } from "react-native";
import Slider from "@react-native-community/slider";
import HeaderSecondary from "../../shered/HeaderSecondary";
import TextPrimary from "../../shered/TextPrimary";

const RangeSelect = ({
  label = "Select Range",
  error = false,
  name,
  handler,
  value,
  min = 0,
  max = 100,
  step = 1,
  range = false,
  style,
}: {
  label?: string;
  error?: boolean;
  name?: string;
  handler?: (
    name: string,
    value: number | { min: number; max: number }
  ) => void;
  value?: number | { min: number; max: number };
  min?: number;
  max?: number;
  step?: number;
  range?: boolean; // if true => min/max selector using two sliders
  style?: ViewStyle;
}) => {
  const isRange = !!range;
  const [single, setSingle] = React.useState<number>(
    typeof value === "number"
      ? value
      : typeof value === "object" && value
      ? (value as any).min ?? min
      : min
  );
  const [low, setLow] = React.useState<number>(
    typeof value === "object" && value ? (value as any).min ?? min : min
  );
  const [high, setHigh] = React.useState<number>(
    typeof value === "object" && value ? (value as any).max ?? max : max
  );

  React.useEffect(() => {
    if (typeof value === "number") {
      setSingle(value);
    } else if (typeof value === "object" && value) {
      if (typeof (value as any).min === "number") setLow((value as any).min);
      if (typeof (value as any).max === "number") setHigh((value as any).max);
    }
  }, [value]);

  const clampPair = (l: number, h: number) => {
    const cl = Math.max(min, Math.min(l, max));
    const ch = Math.max(min, Math.min(h, max));
    if (cl > ch) return { l: ch, h: cl };
    return { l: cl, h: ch };
  };

  return (
    <View style={{ gap: 6 }}>
      <HeaderSecondary
        style={{ color: error ? "red" : "#111827" }}
        text={label}
      />

      {!isRange ? (
        <View
          style={[
            { backgroundColor: "#E6F4F1", borderRadius: 6, padding: 12 },
            style,
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <TextPrimary text={`${single}`} />
            <TextPrimary text={`${min} - ${max}`} />
          </View>
          <Slider
            minimumValue={min}
            maximumValue={max}
            step={step}
            value={single}
            minimumTrackTintColor="#115E59"
            maximumTrackTintColor="#C1E0DA"
            thumbTintColor="#115E59"
            onValueChange={(v) => setSingle(v)}
            onSlidingComplete={(v) => handler?.(name as string, v)}
          />
        </View>
      ) : (
        <View
          style={[
            { backgroundColor: "#E6F4F1", borderRadius: 6, padding: 12 },
            style,
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <TextPrimary text={`${low} - ${high}`} />
            <TextPrimary text={`${min} - ${max}`} />
          </View>
          <Slider
            minimumValue={min}
            maximumValue={high}
            step={step}
            value={low}
            minimumTrackTintColor="#115E59"
            maximumTrackTintColor="#C1E0DA"
            thumbTintColor="#115E59"
            onValueChange={(v) => {
              const { l, h } = clampPair(v, high);
              setLow(l);
            }}
            onSlidingComplete={(v) => {
              const { l, h } = clampPair(v, high);
              handler?.(name as string, { min: l, max: h });
            }}
          />
          <Slider
            minimumValue={low}
            maximumValue={max}
            step={step}
            value={high}
            minimumTrackTintColor="#115E59"
            maximumTrackTintColor="#C1E0DA"
            thumbTintColor="#115E59"
            onValueChange={(v) => {
              const { l, h } = clampPair(low, v);
              setHigh(h);
            }}
            onSlidingComplete={(v) => {
              const { l, h } = clampPair(low, v);
              handler?.(name as string, { min: l, max: h });
            }}
          />
        </View>
      )}
    </View>
  );
};

export default RangeSelect;
