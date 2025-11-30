import { pick } from "@react-native-documents/picker";
import React, { Suspense, useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import Input from "../../../components/ui/inputs/Input";
import { otherIcons } from "../../../constant/images";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/apis";
import { ImgUrl } from "../../../redux/baseApi";

const MyProfile = () => {
  const { data } = useGetMyProfileQuery();
  const [fiels, setFiels] = useState<any | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [formState, setFormState] = useState({
    name: "",
    street: "",
    city: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    street: "",
    city: "",
  });

  useEffect(() => {
    if (!data?.data) return;
    setFormState({
      name: data.data.name ?? "",
      street: data.data.street ?? "",
      city: data.data.city ?? "",
    });
  }, [data]);

  const handlePick = useCallback(async () => {
    try {
      const pickResult = (await pick({})) as any;
      const file = {
        uri: pickResult?.[0]?.uri,
        name: pickResult?.[0]?.name,
        type: pickResult?.[0]?.type,
      };
      if (setFiels) {
        setFiels(file);
      }
    } catch (err: unknown) { }
  }, []);

  const setFieldValue = useCallback(
    (name: keyof typeof formState, value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    },
    []
  );

  const validate = () => {
    const nextErrors = { ...errors };
    let hasError = false;
    (Object.keys(formState) as (keyof typeof formState)[]).forEach((key) => {
      if (!formState[key] || formState[key].trim() === "") {
        nextErrors[key] = "Required";
        hasError = true;
      }
    });
    setErrors(nextErrors);
    return !hasError;
  };

  const handleUpdate = useCallback(() => {
    if (!validate()) return;
    const payload = {
      name: formState.name.trim(),
      street: formState.street.trim(),
      city: formState.city.trim(),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    if (fiels?.uri) {
      formData.append("profile_image", fiels as any);
    }

    updateProfile(formData)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: "Profile updated",
          text2: "Your profile has been updated successfully",
        });
      })
      .catch((err: any) => {
        Toast.show({
          type: "error",
          text1: "Failed to update profile",
          text2: err?.data?.message || "Something went wrong",
        });
      });
  }, [fiels, formState, updateProfile, validate]);

  return (
    <SafeAreaProvider backButtonText="My Profile">
      <Suspense>
        <View
          style={{
            height: 100,
            width: 100,
            position: "relative",
            borderRadius: 100,
            marginHorizontal: "auto",
            marginVertical: 10,
          }}
        >
          <Image
            source={
              fiels?.uri
                ? { uri: fiels.uri }
                : data?.data?.profile_image
                  ? { uri: ImgUrl(data?.data?.profile_image + "") }
                  : (otherIcons.Avater as ImageSourcePropType)
            }
            style={{
              height: 100,
              width: 100,
              borderRadius: 100,
            }}
          />
          <TouchableOpacity
            onPress={handlePick}
            style={{
              position: "absolute",
              right: 3,
              bottom: 3,
              padding: 6,
              backgroundColor: "#E6F4F1",
              borderRadius: 100,
            }}
          >
            <Image source={otherIcons.Edit as ImageSourcePropType} />
          </TouchableOpacity>
        </View>
        <Input
          keyboard="default"
          label="Full Name"
          placeHolder="Enter Full Name"
          value={formState.name}
          handler={(_, value) => setFieldValue("name", value)}
          name="name"
          error={!!errors.name}
        />
        <Input
          keyboard="default"
          label="Street Address"
          placeHolder="Enter Street Address"
          value={formState.street}
          handler={(_, value) => setFieldValue("street", value)}
          name="street"
          error={!!errors.street}
        />
        <Input
          keyboard="default"
          label="City / LGA"
          placeHolder="Enter City / LGA"
          value={formState.city}
          handler={(_, value) => setFieldValue("city", value)}
          name="city"
          error={!!errors.city}
        />
        <ButtonBG
          style={{
            marginTop: 10,
          }}
          text={isLoading ? "Updating..." : "Update"}
          handler={handleUpdate}
          disabled={isLoading}
        />
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(MyProfile);

const styles = StyleSheet.create({});
