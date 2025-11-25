import { pick } from "@react-native-documents/picker";
import React, { ReactNode } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { otherIcons, svgIcons } from "../../../constant/images";
import SvgIcon from "../SvgIcon";
const ImageUploader = ({
  style,
  component,
  setFiels,
  maxFiles,
  currentCount = 0,
}: {
  style?: ViewStyle;
  component?: ReactNode;
  setFiels?: React.Dispatch<React.SetStateAction<any[]>>;
  maxFiles?: number;
  currentCount?: number;
}) => {
  const [showModal, setShowModal] = React.useState(false);

  const handlePick = async () => {
    try {
      if (maxFiles !== undefined && currentCount >= maxFiles) {
        setShowModal(false);
        return;
      }
      const res: any = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 1,
      });
      const asset = res?.assets?.[0];
      const file = asset
        ? {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
          }
        : null;
      if (file?.uri && setFiels) {
        setFiels((prev: any) => [file, ...prev]);
      }
    } catch (err: unknown) {
      // ignore
    } finally {
      setShowModal(false);
    }
  };

  const handlePickFile = async () => {
    try {
      if (maxFiles !== undefined && currentCount >= maxFiles) {
        setShowModal(false);
        return;
      }
      const res: any = await pick({});
      const first = res?.[0];
      const file = first
        ? {
            uri: first.uri,
            name: first.name,
            type: first.type,
          }
        : null;
      if (file?.uri && setFiels) {
        setFiels((prev: any) => [file, ...prev]);
      }
    } catch (err: unknown) {
      // ignore
    } finally {
      setShowModal(false);
    }
  };

  const handleCapture = async () => {
    try {
      if (maxFiles !== undefined && currentCount >= maxFiles) {
        setShowModal(false);
        return;
      }
      const res: any = await launchCamera({
        mediaType: "photo",
        saveToPhotos: true,
      });
      const asset = res?.assets?.[0];
      const file = asset
        ? {
            uri: asset.uri,
            name: asset.fileName,
            type: asset.type,
          }
        : null;
      if (file?.uri && setFiels) {
        setFiels((prev: any) => [file, ...prev]);
      }
    } catch (e) {
      // ignore
    } finally {
      setShowModal(false);
    }
  };

  return (
    <TouchableOpacity
      style={{
        width: component ? "auto" : 140,
      }}
      onPress={() => setShowModal(true)}
    >
      {component ? (
        component
      ) : (
        <View
          style={[
            {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              height: 140,
              width: 140,
              borderRadius: 10,
              backgroundColor: "#E6F4F1",
            },
            style,
          ]}
        >
          <Image source={otherIcons.Image as ImageSourcePropType} />
          <Text>Upload Document</Text>
        </View>
      )}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 20,
              width: "100%",
              maxWidth: 360,
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 6,
            }}
          >
            <View style={{ width: "100%" }}>
              <TouchableOpacity
                onPress={handlePick}
                activeOpacity={0.8}
                style={{
                  alignItems: "center",
                  paddingVertical: 18,
                  paddingHorizontal: 12,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#D1D5DB",
                  marginBottom: 8,
                  borderRadius: 8,
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                }}
              >
                <SvgIcon
                  component={svgIcons.Upload as any}
                  width={24}
                  height={24}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 16,
                    color: "#111827",
                    fontWeight: "500",
                  }}
                >
                  Photo album
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handlePickFile}
                activeOpacity={0.8}
                style={{
                  alignItems: "center",
                  paddingVertical: 18,
                  paddingHorizontal: 12,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#D1D5DB",
                  marginBottom: 8,
                  borderRadius: 8,
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                }}
              >
                <SvgIcon
                  component={svgIcons.File as any}
                  width={24}
                  height={24}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 16,
                    color: "#111827",
                    fontWeight: "500",
                  }}
                >
                  Choose File
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleCapture}
                activeOpacity={0.8}
                style={{
                  alignItems: "center",
                  paddingVertical: 18,
                  paddingHorizontal: 12,
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: "#D1D5DB",
                  marginBottom: 8,
                  borderRadius: 8,
                  backgroundColor: "#FFFFFF",
                  overflow: "hidden",
                }}
              >
                <SvgIcon
                  component={svgIcons.Camera as any}
                  width={24}
                  height={24}
                />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 16,
                    color: "#111827",
                    fontWeight: "500",
                  }}
                >
                  Open Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={{ paddingVertical: 12, alignItems: "center" }}
              >
                <Text style={{ color: "#6B7280", fontSize: 14 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default ImageUploader;

const styles = StyleSheet.create({});
