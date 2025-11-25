import { useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, View } from "react-native";
import Details_Review from "../../components/providerDetails/Details_Review";
import FlexImages from "../../components/providerDetails/FlexImages";
import BackButton from "../../components/shered/BackButton";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import ImageFlex from "../../components/shered/ImageFlex";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import ButtonGreenOpacity30 from "../../components/ui/buttons/ButtonGreenOpacity30";
import ButtonTransparentBG from "../../components/ui/buttons/ButtonTransparentBG";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetSingleServiceQuery } from "../../redux/apis";

const ProviderDetails = () => {
  const {
    params: { id },
  } = useRoute() as { params: { id: string } };

  const { data, isLoading, isError } = useGetSingleServiceQuery(id);
  const service = data?.data || null;

  const providerName =
    (service as any)?.provider?.name ?? (service as any)?.provider ?? "Provider";

  const elements = service
    ? [
      <ButtonGreenOpacity30
        key={1}
        activeOpacity={1}
        text={service.category?.name || "Category"}
        style={{
          width: 200,
          borderRadius: 8,
          marginVertical: 10,
        }}
        textStyle={{
          color: "#115E59",
          fontWeight: 700,
        }}
      />,
      <HeaderDesign key={2} text={service.title || "Service"} />,
      <FlexImages key={3} images={service.images || []} />,

      <FlexText
        key={4}
        style={{
          justifyContent: "space-between",
          backgroundColor: "#E6F4F1",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
          paddingVertical: 20,
        }}
      >
        <View>
          <TextSecondary text="Starting Price" />
          <HeaderDesign
            style={{
              fontSize: 18,
              fontWeight: 700,
            }}
            text={`₦${service.price ?? 0}`}
          />
        </View>
        <ButtonBG
          text="Submit an Offer"
          style={{
            width: "auto",
          }}
          handler={() => { }}
        />
      </FlexText>,

      <FlexText
        style={{
          justifyContent: "space-between",
          marginVertical: 10,
        }}
        key={5}
      >
        <ImageFlex
          image={service.images?.[0]}
          text={providerName}
          text1={`⭐ ${service.averageRating ?? 0} (${service.totalRating ?? 0} Reviews)`}
        />
        <ButtonTransparentBG
          text="Chat Now"
          style={{
            width: "auto",
            borderWidth: 1,
            borderColor: "#115E59",
          }}
          handler={() => { }}
        />
      </FlexText>,
      <Details_Review key={6} />,
    ]
    : [];

  return (
    <SafeAreaProviderNoScroll>
      <BackButton text="Provider Details" />
      {isLoading && <TextSecondary text="Loading provider..." />}
      {isError && <TextSecondary text="Failed to load provider" />}
      {!isLoading && !isError && service && (
        <FlatList
          keyExtractor={(_item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          data={elements}
          renderItem={({ item }) => item}
        />
      )}
    </SafeAreaProviderNoScroll>
  );
};

export default ProviderDetails;
