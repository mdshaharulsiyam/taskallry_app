import moment from "moment";
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Image,
  ImageSourcePropType,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import Toast from "react-native-toast-message";
import { otherIcons } from "../../constant/images";
import {
  ExtensionRequest,
  useAcceptRejectExtensionRequestMutation,
} from "../../redux/apis";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";
import ButtonBG from "../ui/buttons/ButtonBG";
import ButtonTransparentBG from "../ui/buttons/ButtonTransparentBG";
import TextArea from "../ui/inputs/TextArea";
import GreenLine from "../ui/line/GreenLine";

const formatDateTime = (value?: string) =>
  value ? moment(value).format("DD MMM YYYY, hh:mm a") : "—";

const CancelRefundRequest = ({
  data,
  type,
  myProfileId,
  id,
}: {
  data: ExtensionRequest;
  type: "cancel" | "extension";
  myProfileId?: string;
  id: string;
}) => {
  const requestHeaderText =
    type === "cancel"
      ? "You requested to Cancel the task via Resolution Center"
      : "You requested to Extend the task via Resolution Center";

  const requestedBy = data?.requestFrom?.name || "Unknown";
  const requestCreatedAt = formatDateTime(data?.createdAt);
  const currentCompletionDate = formatDateTime(data?.currentDate);
  const newCompletionDate = formatDateTime(data?.requestedDateTime);

  const reasonLabel =
    type === "cancel" ? "Reason for Cancel" : "Reason for Request";
  const reasonText =
    type === "cancel"
      ? data?.reason || "No reason provided."
      : data?.extensionReason || data?.reason || "No reason provided.";

  const statusLabel =
    type === "cancel" ? "Cancellation Status" : "Extensions Status";
  const statusText = data?.status || "Pending";
  const isRequesterMe = myProfileId && data?.requestFrom?._id === myProfileId;
  const [acceptRejectExtensionRequest, { isLoading: isUpdating }] =
    useAcceptRejectExtensionRequestMutation();
  const [currentAction, setCurrentAction] = useState<"accept" | "reject" | null>(
    null
  );
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectDetails, setRejectDetails] = useState("");
  const [rejectEvidence, setRejectEvidence] = useState<{
    uri: string;
    name?: string;
    type?: string;
  } | null>(null);
  const [rejectErrors, setRejectErrors] = useState({
    detail: "",
    evidence: "",
  });

  const resetRejectState = () => {
    setRejectDetails("");
    setRejectEvidence(null);
    setRejectErrors({ detail: "", evidence: "" });
  };

  const submitAction = useCallback(
    async (action: "accept" | "reject", payload?: any) => {
      if (!data?._id) return;
      try {
        setCurrentAction(action);
        await acceptRejectExtensionRequest({
          id: data._id,
          body:
            action === "accept"
              ? {
                status: "ACCEPTED",
              }
              : payload,
        }).unwrap();
        Toast.show({
          type: "success",
          text1:
            action === "accept"
              ? "Extension Accepted"
              : "Extension Request Rejected",
          text2:
            action === "accept"
              ? "You approved the new completion date."
              : "The request has been declined.",
        });
        if (action === "reject") {
          resetRejectState();
          setShowRejectModal(false);
        }
      } catch (error: any) {
        Toast.show({
          type: "error",
          text1: "Action failed",
          text2: error?.data?.message || "Please try again later",
        });
      } finally {
        setCurrentAction(null);
      }
    },
    [acceptRejectExtensionRequest, data?._id]
  );

  const handleAccept = useCallback(() => {
    Alert.alert(
      "Accept new date?",
      "This will approve the new completion date and extend the deadline.",
      [
        { text: "Not Now", style: "cancel" },
        {
          text: "Accept",
          onPress: () => submitAction("accept"),
        },
      ]
    );
  }, [submitAction]);

  const handleSelectEvidence = async () => {
    try {
      const result: any = await launchImageLibrary({
        mediaType: "photo",
      });
      const asset = result?.assets?.[0];
      if (!asset?.uri) return;
      setRejectEvidence({
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      });
      setRejectErrors((prev) => ({ ...prev, evidence: "" }));
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to select image",
      });
    }
  };

  const handleRejectSubmit = () => {
    const nextErrors = { detail: "", evidence: "" };
    if (!rejectDetails.trim()) {
      nextErrors.detail = "Please provide a reason.";
    }
    if (!rejectEvidence?.uri) {
      nextErrors.evidence = "Evidence image is required.";
    }
    setRejectErrors(nextErrors);
    if (nextErrors.detail || nextErrors.evidence) return;

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        status: "REJECTED",
        rejectDetails: rejectDetails.trim(),
      })
    );
    formData.append("reject_evidence", {
      uri: rejectEvidence?.uri,
      name: rejectEvidence?.name || "reject_evidence.jpg",
      type: rejectEvidence?.type || "image/jpeg",
    } as any);
    submitAction("reject", formData);
  };

  const actionDisabled = useMemo(
    () => currentAction !== null || isUpdating,
    [currentAction, isUpdating]
  );

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: "#E6F4F1",
        marginTop: 10,
      }}
    >
      <FlexText
        style={{
          gap: 10,
        }}
      >
        <Image source={otherIcons.Info as ImageSourcePropType} />
        <HeaderSecondary
          style={{
            fontWeight: 700,
            lineHeight: 20,
          }}
          text={requestHeaderText}
        />
      </FlexText>
      <GreenLine />
      <FlexText
        style={{
          justifyContent: "space-between",
        }}
      >
        <ImageFlex text1={requestedBy} text="Requested By" />
        <View>
          <TextSecondary text={requestCreatedAt.split(",")[0]} />
          <TextSecondary text={requestCreatedAt.split(",")[1]?.trim()} />
        </View>
      </FlexText>
      <GreenLine />
      {type == "extension" && (
        <View
          style={{
            padding: 10,
            borderWidth: 0.3,
            borderRadius: 8,
            marginBottom: 5,
          }}
        >
          <HeaderSecondary
            style={{
              fontWeight: 700,
            }}
            text="Current Completion Date"
          />
          <TextSecondary text={currentCompletionDate} />
          <GreenLine />
          <HeaderSecondary
            style={{
              fontWeight: 700,
            }}
            text="New Proposed Date"
          />
          <TextSecondary text={newCompletionDate} />
        </View>
      )}
      <HeaderSecondary
        text={reasonLabel}
      />
      <TextSecondary
        text={reasonText}
      />
      <GreenLine />
      <HeaderSecondary
        style={{
          width: 600,
        }}
        text={statusLabel}
      />
      <TextSecondary
        style={{
          color: "#0EA5E9",
        }}
        text={statusText}
      />
      <GreenLine />
      {!isRequesterMe && (
        <FlexText>
          {type == "cancel" ? (
            <ButtonBG
              text="Cancel the request"
              handler={() => console.log("")}
              style={{
                width: "auto",
              }}
            />
          ) : (
            <>
              <ButtonTransparentBG
                text={
                  currentAction === "reject" && isUpdating
                    ? "Submitting..."
                    : "Cancel"
                }
                handler={() => setShowRejectModal(true)}
                style={{
                  width: "auto",
                }}
                disabled={actionDisabled}
              />
              <ButtonBG
                text="Accept"
                handler={handleAccept}
                style={{
                  width: "auto",
                }}
                loading={currentAction === "accept" && isUpdating}
                disabled={actionDisabled}
              />
            </>
          )}
        </FlexText>
      )}
      <Modal
        visible={showRejectModal}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setShowRejectModal(false);
          resetRejectState();
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFFFF",
              borderRadius: 16,
              padding: 20,
              maxHeight: "90%",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins",
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 12,
                color: "#111827",
              }}
            >
              Provide Cancellation Details
            </Text>
            <ScrollView
              style={{ maxHeight: 350 }}
              showsVerticalScrollIndicator={false}
            >
              <TextArea
                keyboard="default"
                label="Reason for cancellation"
                placeHolder="Describe why you are rejecting the request"
                name="rejectDetails"
                value={rejectDetails}
                handler={(_, value) => {
                  setRejectDetails(value);
                  setRejectErrors((prev) => ({ ...prev, detail: "" }));
                }}
                error={!!rejectErrors.detail}
              />
              {rejectErrors.detail ? (
                <Text
                  style={{
                    color: "#DC2626",
                    marginTop: 4,
                    fontSize: 12,
                  }}
                >
                  {rejectErrors.detail}
                </Text>
              ) : null}
              <View
                style={{
                  marginTop: 16,
                }}
              >
                <TextSecondary
                  text="Upload supporting evidence (required)"
                  style={{ color: "#111827", fontWeight: "600" }}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 10,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: rejectErrors.evidence ? "#DC2626" : "#D1D5DB",
                    borderRadius: 10,
                    borderStyle: "dashed",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#F9FAFB",
                  }}
                  onPress={handleSelectEvidence}
                >
                  {rejectEvidence?.uri ? (
                    <Image
                      source={{ uri: rejectEvidence.uri }}
                      style={{ width: 120, height: 120, borderRadius: 10 }}
                    />
                  ) : (
                    <>
                      <Image
                        source={otherIcons.Image as ImageSourcePropType}
                        style={{ marginBottom: 8 }}
                      />
                      <Text style={{ color: "#115E59", fontWeight: "600" }}>
                        Tap to upload image
                      </Text>
                    </>
                  )}
                </TouchableOpacity>
                {rejectErrors.evidence ? (
                  <Text
                    style={{
                      color: "#DC2626",
                      marginTop: 4,
                      fontSize: 12,
                    }}
                  >
                    {rejectErrors.evidence}
                  </Text>
                ) : null}
              </View>
            </ScrollView>
            <FlexText
              style={{
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <ButtonTransparentBG
                text="Close"
                handler={() => {
                  setShowRejectModal(false);
                  resetRejectState();
                }}
                style={{ width: "auto" }}
                disabled={currentAction === "reject" && isUpdating}
              />
              <ButtonBG
                text={
                  currentAction === "reject" && isUpdating
                    ? "Submitting..."
                    : "Submit Rejection"
                }
                handler={handleRejectSubmit}
                style={{ width: "auto" }}
                disabled={currentAction === "reject" && isUpdating}
                loading={currentAction === "reject" && isUpdating}
              />
            </FlexText>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CancelRefundRequest;
