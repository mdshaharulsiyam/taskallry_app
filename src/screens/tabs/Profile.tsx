import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Suspense, useCallback, useMemo } from "react";
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Text,
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
import { profileIcons } from "../../constant/images";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useUpgradeAccountMutation } from "../../redux/apis";
import { clearToken, setToken } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { Navigation } from "../../utils/Navigate";

const Profile = () => {
  const navigation = Navigation();
  const dispatch = useDispatch<AppDispatch>();
  const { setRole, role } = useGlobalContext();
  const [upgradeAccount, { isLoading: isSwitching }] = useUpgradeAccountMutation();
  const handleLogout = useCallback(async () => {
    setRole(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("role");
    await AsyncStorage.removeItem("isAddressProvided")
    await AsyncStorage.removeItem("isBankNumberVerified")
    dispatch(clearToken());
    try {
      RNRestart.restart();
    } catch (e) {

    }
  }, [dispatch, setRole]);
  const handleSwitch = useCallback(async () => {
    try {
      const response = await upgradeAccount().unwrap();
      const payload = response?.data;
      if (!payload?.accessToken || !payload?.role) {
        Toast.show({
          type: "error",
          text1: "Switch failed",
          text2: "Missing data from server. Please try again.",
        });
        return;
      }

      const nextRole = payload.role === "provider" ? "service" : "user";

      Toast.show({
        type: "success",
        text1: "Account switched",
        text2:
          nextRole === "service"
            ? "You are now in provider mode."
            : "You are now in buyer mode.",
      });
      if (role == "user") {
        await AsyncStorage.setItem("token", payload.accessToken);
        await AsyncStorage.setItem("role", nextRole);
        if (!payload.isBankNumberVerified) {
          await AsyncStorage.setItem("isBankNumberVerified", "false");
          dispatch(setToken(payload.accessToken));
          setRole(nextRole);
          navigation.navigate("ServiceSignUp", { screen: "BVN" });
          return;
        }
        if (!payload.isIdentificationDocumentVerified) {
          await AsyncStorage.setItem("isIdentificationDocumentVerified", "false");
          dispatch(setToken(payload.accessToken));
          setRole(nextRole);
          navigation.navigate("ServiceSignUp", { screen: "Identity" });
          return;
        }
        if (!payload.isAddressProvided) {
          navigation.navigate("ServiceSignUp", { screen: "Address" });
          await AsyncStorage.setItem("isAddressProvided", "false");
          dispatch(setToken(payload.accessToken));
          setRole(nextRole);
          return;
        }
        RNRestart.restart();
        return;
      }

      if (role == "service") {
        await AsyncStorage.setItem("token", payload.accessToken);
        await AsyncStorage.setItem("role", nextRole);
        RNRestart.restart();
        return;
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Switch failed",
        text2: error?.data?.message || "Please try again later.",
      });
    }
  }, [dispatch, navigation, setRole, upgradeAccount]);

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
              <Text style={{
                marginLeft: 20,
                backgroundColor: "#115E59",
                width: 120,
                textAlign: "center",
                padding: 5,
                fontWeight: "bold",
                fontSize: 14,
                color: "#FFFFFF",
                borderRadius: 4
              }} key={23}>
                {role == "service" ? "Freelancer" : "Tasker"}
              </Text>,
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
                        source={profileIcons.Switch as ImageSourcePropType}
                        style={{
                          // tintColor: "#3585f5ff",
                          height: 20,
                          width: 20,
                        }}
                      />
                      {
                      }
                      <TextSecondary
                        // style={{
                        //   color: "#115E59",
                        // }}
                        text={isSwitching ? "Switching..." : "Switch Role"}
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
