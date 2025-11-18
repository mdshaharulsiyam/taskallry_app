import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import SectionHeading from "../../components/shered/SectionHeading";
import TextPrimary from "../../components/shered/TextPrimary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../components/ui/file/ImageUploader";
import AddUpdateServiceFields from "../../formFields/AddUpdateServiceFields";
import handleServiceAddUpdate from '../../handler/serviceAddUpdate';
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { useCreateServiceMutation, useGetMyServicesQuery, useUpdateServiceMutation } from "../../redux/apis";
import { ImgUrl } from "../../redux/baseApi";
import { FieldsType } from "../../types/Types";
import { Navigation } from "../../utils/Navigate";
import { RenderField } from "../../utils/RenderField";

const AddUpdateService = () => {
  const { params: { id } } = useRoute() as { params: { id: string } }
  const { fields, setFields } = AddUpdateServiceFields();
  const navigate = Navigation();
  const [files, setFiles] = useState<any[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const { data } = useGetMyServicesQuery();
  const [createService, { isLoading: isCreateLoading }] = useCreateServiceMutation()
  const [updateService, { isLoading: isUpdateLoading }] = useUpdateServiceMutation()
  useEffect(() => {
    if (data?.data?.images) {
      setExistingImages(data.data.images as string[]);
    }
  }, [data]);

  return (
    <SafeAreaProvider backButtonText="Update Service">
      <SectionHeading text="Add Service" showViewButton={false} />
      <TextPrimary text="Upload Your Service Image" />
      {existingImages.length + files.length < 5 && (
        <ImageUploader
          setFiels={setFiles}
          maxFiles={5}
          currentCount={existingImages.length + files.length}
        />
      )}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginTop: 12,
          gap: 8,
        }}
      >
        {existingImages.map((uri, index) => (
          <View key={`existing-${index}`} style={{ position: "relative" }}>
            <Image
              source={{ uri: ImgUrl(uri) }}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />
            <TouchableOpacity
              onPress={() => {
                setExistingImages((prev) => prev.filter((_, i) => i !== index));
                setRemovedImages((prev) => [...prev, uri]);
              }}
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                backgroundColor: "#EF4444",
                borderRadius: 999,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 10 }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}

        {files.map((file, index) => (
          <View key={`file-${index}`} style={{ position: "relative" }}>
            <Image
              source={{ uri: file.uri }}
              style={{ width: 80, height: 80, borderRadius: 8 }}
            />
            <TouchableOpacity
              onPress={() =>
                setFiles((prev) => prev.filter((_, i) => i !== index))
              }
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                backgroundColor: "#EF4444",
                borderRadius: 999,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text style={{ color: "#FFF", fontSize: 10 }}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {fields?.map((field: FieldsType) => RenderField(field, setFields))}

      <ButtonBG
        disabled={isCreateLoading || isUpdateLoading}
        text={isCreateLoading || isUpdateLoading ? "Loading..." : "Save Service"}
        handler={() => {
          handleServiceAddUpdate(
            fields,
            setFields,
            existingImages,
            files,
            removedImages,
            id,
            createService,
            updateService,
            navigate,
          );
        }}
      />
    </SafeAreaProvider>
  );
};

export default AddUpdateService;
