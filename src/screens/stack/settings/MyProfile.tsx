import { pick } from "@react-native-documents/picker";
import React, { Suspense, useCallback, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import { otherIcons } from "../../../constant/images";
import profileUpdateFields from "../../../formFields/profileUpdateFields";
import handleUpdateProfile from "../../../handler/profile";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "../../../redux/apis";
import { ImgUrl } from "../../../redux/baseApi";
import { FieldsType } from "../../../types/Types";
import { RenderField } from "../../../utils/RenderField";

const MyProfile = () => {
  const { data } = useGetMyProfileQuery();
  const { fields, setFields } = profileUpdateFields();
  const [fiels, setFiels] = useState<any | null>(null);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
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

  const handleUpdate = useCallback(() => {
    handleUpdateProfile(fields, setFields, updateProfile, fiels);
  }, [fields, fiels, setFields, updateProfile]);

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
        {fields?.map((field: FieldsType) => RenderField(field, setFields))}
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
