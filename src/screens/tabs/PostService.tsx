import React from "react";
import { Image, StyleSheet, View } from "react-native";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import TextPrimary from "../../components/shered/TextPrimary";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetMyServicesQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";

const PostService = () => {
  const { width } = ScreenSize();
  const navigate = Navigate();
  const { data, isLoading, isError } = useGetMyServicesQuery();
  const service = data?.data || null;

  if (isLoading) {
    return (
      <SafeAreaProviderNoScroll backButtonText="My Service">
        <View style={{ padding: 16 }}>
          <TextSecondary text="Loading service..." />
        </View>
      </SafeAreaProviderNoScroll>
    );
  }

  if (isError) {
    return (
      <SafeAreaProviderNoScroll backButtonText="My Service">
        <View style={{ padding: 16 }}>
          <TextSecondary text="Failed to load service" />
        </View>
      </SafeAreaProviderNoScroll>
    );
  }

  if (!service) {
    return (
      <SafeAreaProviderNoScroll backButtonText="My Service">
        <View style={{ padding: 16 }}>
          <TextSecondary text="No service found" />
          <ButtonBG
            style={{
              width: "auto",
              marginTop: 10,
            }}
            text="Create Service"
            handler={() => navigate("CreateService")}
          />
        </View>
      </SafeAreaProviderNoScroll>
    );
  }

  return (
    <SafeAreaProviderNoScroll backButtonText="My Service">
      <View
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          borderRadius: 10,
          position: "relative",
          marginTop: 20,
        }}
      >
        <Image
          src={service.images?.[0] || "https://placehold.co/400x400/png"}
          style={{
            width: width - 60,
            height: (width / 3) * 1.7,
            borderRadius: 10,
          }}
        />
        <TextSecondary
          text={service.category?.name || "Service"}
          style={{
            backgroundColor: "#FFF",
            padding: 6,
            position: "absolute",
            top: 20,
            left: 20,
            borderRadius: 6,
          }}
        />
        <TextSecondary
          text={`⭐ ${service.averageRating ?? 0}`}
          style={{
            backgroundColor: "#FFF",
            padding: 6,
            position: "absolute",
            top: 20,
            right: 20,
            borderRadius: 6,
          }}
        />
        <HeaderDesign text={service.title || "My Service"} />
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <TextPrimary text="Starting Price :" />
          <TextSecondary text={`₦${service.price ?? 0}`} />
        </FlexText>
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <TextPrimary text="Service Location :" />
          <TextSecondary
            style={{
              width: 150,
            }}
            text={service.address || ""}
          />
        </FlexText>
        <FlexText style={{}}>
          <ButtonBG
            style={{
              width: "auto",
            }}
            text="View  Details"
            handler={() => navigate("ServiceDetails")}
          />
        </FlexText>
      </View>
    </SafeAreaProviderNoScroll>
  );
};

export default PostService;

const styles = StyleSheet.create({});
