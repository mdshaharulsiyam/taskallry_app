import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Suspense, useCallback, useMemo } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import RNRestart from "react-native-restart";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import ProfileOptions from "../../components/profile/ProfileOptions";
import ProfilePictureName from "../../components/profile/ProfilePictureName";
import FlexText from "../../components/shered/FlexText";
import TextSecondary from "../../components/shered/TextSecondary";
import { otherIcons, profileIcons } from "../../constant/images";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetMyProfileQuery } from "../../redux/apis";
import { clearToken } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { Navigation } from "../../utils/Navigate";

const Profile = () => {
  const navigation = Navigation();
  const dispatch = useDispatch<AppDispatch>();
  const { role, setRole } = useGlobalContext();
  const { data } = useGetMyProfileQuery();
  const handleLogout = useCallback(async () => {
    setRole(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    dispatch(clearToken());
    try {
      RNRestart.restart();
    } catch (e) {

    }
  }, [dispatch, setRole]);
  const handleSwitch = useCallback(async () => {
    try {
      const storedRole = await AsyncStorage.getItem("role");
      const currentRole = storedRole || role;
      if (!currentRole) {
        Toast.show({
          type: "error",
          text1: "Role unavailable",
          text2: "Please sign in again.",
        });
        return;
      }

      if (currentRole === "service") {
        await AsyncStorage.setItem("role", "user");
        setRole("user");
        Toast.show({
          type: "info",
          text1: "Switched to Buyer",
          text2: "Reloading to update experience.",
        });
        RNRestart.restart();
        return;
      }

      const isAddressProvided = data?.data?.isAddressProvided;
      if (typeof isAddressProvided === "undefined") {
        Toast.show({
          type: "error",
          text1: "Profile missing",
          text2: "Unable to determine address status.",
        });
        return;
      }
      if (!isAddressProvided) {
        setRole("service");
        await AsyncStorage.setItem("role", "service");
        navigation.navigate("ServiceSignUp", { screen: "Address" });
        return;
      }

      await AsyncStorage.setItem("role", "service");
      setRole("service");
      Toast.show({
        type: "info",
        text1: "Switched to Provider",
        text2: "Reloading to update experience.",
      });
      RNRestart.restart();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Switch failed",
        text2: "Please try again later.",
      });
    }
  }, [data?.data?.isAddressProvided, navigation, role, setRole]);

  return (
    <SafeAreaProviderNoScroll zeroPadding={true}>
      <Suspense>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          data={useMemo(
            () => [
              <ProfilePictureName key={1} />,
              <ProfileOptions key={2} />,
              <View
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  key={4}
                  onPress={handleSwitch}
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
                        source={otherIcons.Avater as ImageSourcePropType}
                        style={{
                          // tintColor: "#3585f5ff",
                          height: 20,
                          width: 20,
                        }}
                      />
                      <TextSecondary
                        style={{
                          color: "#3585f5ff",
                        }}
                        text={"Switch Role"}
                      />
                    </FlexText>
                  </FlexText>
                </TouchableOpacity>
                <TouchableOpacity
                  key={4}
                  onPress={handleLogout}
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
              </View>
            ],
            [handleSwitch, handleLogout]
          )}
          renderItem={({ item }) => item}
        />
      </Suspense>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(Profile);
