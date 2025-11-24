import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import ProfileOptions from "../../components/profile/ProfileOptions";
import ProfilePictureName from "../../components/profile/ProfilePictureName";
import FlexText from "../../components/shered/FlexText";
import TextSecondary from "../../components/shered/TextSecondary";
import { profileIcons } from "../../constant/images";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { clearToken } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { Navigation } from "../../utils/Navigate";
const Profile = () => {
  const navigate = Navigation();
  const dispatch = useDispatch<AppDispatch>();
  const { setRole } = useGlobalContext();
  const elements = [
    <ProfilePictureName key={1} />,
    <ProfileOptions key={2} />,
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <TouchableOpacity
        key={4}
        onPress={async () => {
          setRole(null);
          await AsyncStorage.removeItem("token");
          dispatch(clearToken());
          navigate.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
        style={{
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          paddingVertical: 14,
        }}
      >
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <FlexText>
            <Image
              source={profileIcons.Logout as ImageSourcePropType}
              style={{
                tintColor: "#FF0000",
              }}
            />
            <TextSecondary
              style={{
                color: "#FF0000",
              }}
              text={"Log Out"}
            />
          </FlexText>
        </FlexText>
      </TouchableOpacity>
      ,
    </View>,
  ];
  return (
    <SafeAreaProviderNoScroll zeroPadding={true}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        data={elements}
        renderItem={({ item }) => item}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Profile;
