import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";

import { otherIcons, TabIcons } from "../../../constant/images";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import BackButton from "../../../components/shered/BackButton";
import Navigate from "../../../utils/Navigate";

const ViewProfile = () => {
  const navigate = Navigate();
  const items = [
    {
      key: "name",
      icon: TabIcons.Profile,
      text: "Jenny Wilson",
    },
    {
      key: "phone",
      icon: otherIcons.Call,
      text: "(480) 555-0103",
    },
    {
      key: "email",
      icon: otherIcons.At,
      text: "debra.holt@example.com",
    },
    {
      key: "address",
      icon: otherIcons.Location,
      text: "2118 Thornridge Cir. Syracuse, Connecticut...",
    },
  ];
  return (
    <SafeAreaProvider>
      <BackButton
        handler={() => navigate("MyProfile")}
        text={`My Profile`}
        show={true}
        imageSource={otherIcons.Edit as ImageSourcePropType}
      />
      <View style={styles.avatarWrap}>
        <Image
          source={{ uri: "https://placehold.co/400x400.png" }}
          style={styles.avatar}
        />
      </View>

      <View style={styles.listWrap}>
        {items.map((it) => (
          <View key={it.key} style={styles.cardRow}>
            <View style={styles.iconWrap}>
              <Image source={it.icon as any} style={styles.iconImg} />
            </View>
            <View style={styles.divider} />
            <Text numberOfLines={1} style={styles.cardText}>
              {it.text}
            </Text>
          </View>
        ))}
      </View>
    </SafeAreaProvider>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  avatarWrap: {
    height: 100,
    width: 100,
    position: "relative",
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 12,
    overflow: "hidden",
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  listWrap: {
    gap: 12,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#51B7B2",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  iconWrap: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  iconImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: "#2A8E89",
  },
  divider: {
    width: 1,
    height: 22,
    backgroundColor: "#115E59",
    marginRight: 10,
  },
  cardText: {
    flex: 1,
    color: "#202020",
    fontSize: 14,
  },
  updateBtn: {
    marginTop: 16,
    marginHorizontal: 16,
  },
});
