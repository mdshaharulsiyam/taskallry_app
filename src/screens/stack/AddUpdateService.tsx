import { useRoute } from "@react-navigation/native";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import SectionHeading from "../../components/shered/SectionHeading";
import TextPrimary from "../../components/shered/TextPrimary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ImageUploader from "../../components/ui/file/ImageUploader";
import Input from "../../components/ui/inputs/Input";
import SelectInput from "../../components/ui/inputs/SelectInput";
import TextArea from "../../components/ui/inputs/TextArea";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import {
  useCreateServiceMutation,
  useGetAllCategoriesQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "../../redux/apis";
import { ImgUrl } from "../../redux/baseApi";
import { Navigation } from "../../utils/Navigate";

const AddUpdateService = () => {
  const {
    params: { id } = { id: undefined },
  } = useRoute() as { params?: { id?: string } };
  const navigate = Navigation();
  const [files, setFiles] = useState<any[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const { data: serviceData } = useGetSingleServiceQuery(id as string, {
    skip: !id,
  });
  const { data: categoryData } = useGetAllCategoriesQuery({ limit: 9999999 });
  const [createService, { isLoading: isCreateLoading }] =
    useCreateServiceMutation();
  const [updateService, { isLoading: isUpdateLoading }] =
    useUpdateServiceMutation();
  const [formState, setFormState] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  const categoryOptions = useMemo(
    () =>
      categoryData?.data?.result?.map((cat: any) => ({
        label: cat.name,
        value: cat._id,
      })) ?? [],
    [categoryData]
  );

  useEffect(() => {
    if (!serviceData?.data) return;
    const service: any = serviceData.data;
    setFormState((prev) => ({
      ...prev,
      title: service?.title ?? "",
      price: service?.price ? String(service.price) : "",
      category: service?.category?._id ?? prev.category,
      description: service?.description ?? "",
    }));
    if (service?.images) {
      setExistingImages(service.images as string[]);
    }
  }, [serviceData]);

  const handleRemoveExisting = useCallback(
    (index: number, uri: string) => {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setRemovedImages((prev) => [...prev, uri]);
    },
    []
  );

  const handleRemoveFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
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
      const value = formState[key];
      if (!value || value.trim() === "") {
        nextErrors[key] = "Required";
        hasError = true;
      }
    });
    if (formState.price && Number.isNaN(Number(formState.price))) {
      nextErrors.price = "Enter a valid number";
      hasError = true;
    }
    setErrors(nextErrors);
    return !hasError;
  };

  const handleSubmit = useCallback(() => {
    if (!validate()) return;
    const payload = {
      category: formState.category,
      title: formState.title.trim(),
      description: formState.description.trim(),
      price: Number(formState.price),
      deletedImages: removedImages,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));
    files.forEach((file) => {
      formData.append("service_image", file);
    });

    const request = id ? updateService : createService;
    request(formData as any)
      .unwrap()
      .then(() => {
        Toast.show({
          type: "success",
          text1: id ? "Service updated successfully" : "Service added successfully",
        });
        navigate.goBack();
      })
      .catch((error: any) => {
        Toast.show({
          type: "error",
          text1:
            error?.data?.message ||
            (id ? "Failed to update service" : "Failed to add service"),
        });
      });
  }, [createService, files, formState, id, navigate, removedImages, updateService]);

  return (
    <SafeAreaProvider backButtonText="Update Service">
      <Suspense>
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
                onPress={() => handleRemoveExisting(index, uri)}
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
                onPress={() => handleRemoveFile(index)}
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

        <Input
          keyboard="default"
          label="Service Title"
          placeHolder="Enter Service Title"
          value={formState.title}
          handler={(_, value) => setFieldValue("title", value)}
          name="title"
          error={!!errors.title}
        />
        <Input
          keyboard="numeric"
          label="Starting Price"
          placeHolder="Enter Starting Price"
          value={formState.price}
          handler={(_, value) => setFieldValue("price", value)}
          name="price"
          error={!!errors.price}
        />
        <SelectInput
          label="Service Category"
          placeHolder="Service Category"
          options={categoryOptions}
          value={formState.category}
          handler={(_, value) => setFieldValue("category", value as string)}
          name="category"
          required
          error={!!errors.category}
        />
        <TextArea
          keyboard="default"
          label="Service Description"
          placeHolder="Enter Service Description"
          value={formState.description}
          handler={(_, value) => setFieldValue("description", value)}
          name="description"
          error={!!errors.description}
        />

        <ButtonBG
          disabled={isCreateLoading || isUpdateLoading}
          text={
            isCreateLoading || isUpdateLoading ? "Loading..." : "Save Service"
          }
          handler={handleSubmit}
        />
      </Suspense>
    </SafeAreaProvider>
  );
};

export default React.memo(AddUpdateService);
