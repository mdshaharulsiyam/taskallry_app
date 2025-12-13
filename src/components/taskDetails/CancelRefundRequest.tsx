import moment from "moment";
import React from "react";
import { Image, ImageSourcePropType, View } from "react-native";
import { otherIcons } from "../../constant/images";
import { ExtensionRequest } from "../../redux/apis";
import FlexText from "../shered/FlexText";
import HeaderSecondary from "../shered/HeaderSecondary";
import ImageFlex from "../shered/ImageFlex";
import TextSecondary from "../shered/TextSecondary";
import ButtonBG from "../ui/buttons/ButtonBG";
import ButtonTransparentBG from "../ui/buttons/ButtonTransparentBG";
import GreenLine from "../ui/line/GreenLine";

const formatDateTime = (value?: string) =>
  value ? moment(value).format("DD MMM YYYY, hh:mm a") : "—";

const CancelRefundRequest = ({
  data,
  type,
  myProfileId,
}: {
  data: ExtensionRequest;
  type: "cancel" | "extension";
  myProfileId?: string;
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
                text="Cancel"
                handler={() => console.log("")}
                style={{
                  width: "auto",
                }}
              />
              <ButtonBG
                text="Accept"
                handler={() => console.log("")}
                style={{
                  width: "auto",
                }}
              />
            </>
          )}
        </FlexText>
      )}
    </View>
  );
};

export default CancelRefundRequest;
