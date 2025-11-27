import React, { useState } from "react";
import { View } from "react-native";
import TabButton from "../../components/mytask/TabButton";
import FlexImages from "../../components/providerDetails/FlexImages";
import Review from "../../components/providerDetails/Review";
import Description from "../../components/serviceDetails/Description";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import SectionHeading from "../../components/shered/SectionHeading";
import TextPrimary from "../../components/shered/TextPrimary";
import TextSecondary from "../../components/shered/TextSecondary";
import SafeAreaProvider from "../../providers/SafeAreaProvider";
import { useGetMyServicesQuery } from "../../redux/apis";

const ServiceDetails = () => {
  const [tab, setTab] = useState("Description");
  const { data, isLoading, isError } = useGetMyServicesQuery();

  const service = data?.data || null;

  if (isLoading) {
    return (
      <SafeAreaProvider backButtonText="My Service Details">
        <View style={{ padding: 16 }}>
          <TextSecondary text="Loading service details..." />
        </View>
      </SafeAreaProvider>
    );
  }

  if (isError) {
    return (
      <SafeAreaProvider backButtonText="My Service Details">
        <View style={{ padding: 16 }}>
          <TextSecondary text="Failed to load service details" />
        </View>
      </SafeAreaProvider>
    );
  }

  if (!service) {
    return (
      <SafeAreaProvider backButtonText="My Service Details">
        <View style={{ padding: 16 }}>
          <TextSecondary text="Service not found" />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider backButtonText="My Service Details">
      <SectionHeading
        style={{
          marginTop: 10,
        }}
        text="My Service Details"
        showViewButton={false}
      />
      <TextPrimary
        style={{
          color: "#115E59",
          backgroundColor: "#E6F4F1",
          width: 150,
          textAlign: "center",
          padding: 5,
          borderRadius: 10,
          marginTop: 10,
        }}
        text={service.category?.name || "Service"}
      />
      <HeaderDesign text={service.title || "My Service"} />
      <FlexImages images={service.images || []} />
      <FlexText
        style={{
          padding: 20,
          backgroundColor: "#E6F4F1",
          marginVertical: 10,
          borderRadius: 10,
          justifyContent: "space-between",
        }}
      >
        <TextSecondary text="Starting Price" />
        <HeaderDesign text={`₦${service.price ?? 0}`} />
      </FlexText>

      <TabButton
        handler={(tab) => setTab(tab)}
        tab={["Description", "Reviews"]}
      />
      {tab == "Description" ? (
        <Description service={service} />
      ) : (
        <Review service={service} />
      )}
    </SafeAreaProvider>
  );
};

export default ServiceDetails;
