import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { PlatformPressable } from "@react-navigation/elements";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import React, { useCallback } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabItem from "./TabItem";
const Tabbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={{ flexDirection: "row", marginBottom: bottom, height: 70 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = useCallback(() => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        }, [isFocused, navigation, route.key, route.name, route.params]);

        const onLongPress = useCallback(() => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        }, [navigation, route.key]);

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <TabItem
              route={route.name}
              label={label as string}
              isFocused={isFocused}
            />
            {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {label as string}
            </Text> */}
          </PlatformPressable>
        );
      })}
    </View>
  );
};

export default React.memo(Tabbar);
