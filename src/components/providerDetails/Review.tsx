import React from "react";
import { View } from "react-native";
import { Service, useGetMyFeedbackQuery } from "../../redux/apis";
import FlexText from "../shered/FlexText";
import HeaderDesign from "../shered/HeaderDesign";
import TextSecondary from "../shered/TextSecondary";
import ReviewCard from "./ReviewCard";

const Review = ({ service }: { service?: Service }) => {
  const { data, isLoading, isError } = useGetMyFeedbackQuery();
  const feedbacks = data?.data || [];

  return (
    <View>
      <FlexText
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: "#E6F4F1",
          marginVertical: 10,
          borderRadius: 10,
          gap: 10,
        }}
      >
        <HeaderDesign text={`${service?.averageRating} ⭐`} />

        <TextSecondary text={`of ${service?.totalRating} reviews`} />
      </FlexText>
      {isLoading && <TextSecondary text="Loading reviews..." />}
      {isError && <TextSecondary text="Failed to load reviews" />}
      {!isLoading && !isError && feedbacks.length === 0 && (
        <TextSecondary text="No reviews yet" />
      )}
      {!isLoading &&
        !isError &&
        feedbacks.map((fb) => (
          <ReviewCard
            key={fb._id}
            author={fb?.customer?.name}
            rating={fb?.rating}
            details={fb?.details}
            image={fb?.customer?.profile_image}
          />
        ))}
    </View>
  );
};

export default Review;

