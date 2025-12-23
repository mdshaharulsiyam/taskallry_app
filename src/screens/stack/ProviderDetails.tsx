import { useRoute } from "@react-navigation/native";
import React, { Suspense, useCallback, useMemo } from "react";
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
import Navigate from "../../utils/Navigate";

const ProviderDetails = () => {
  const {
    params: { id },
  } = useRoute() as { params: { id: string } };

  const { data, isLoading, isError, error } = useGetSingleServiceQuery(id);
  const service = data?.data || null;
  console.log(data, id, error)
  const navigate = Navigate();

  const goSubmitOffer = useCallback(() => {
    if (!service) return;
    navigate("TabLayout", {
      screen: "PostTask",
      params: {
        id: service.provider?._id,
        category: service.category?._id,
        categoryName: service.category?.name,
      },
    });
  }, [navigate, service]);

  const goChatNow = useCallback(() => {
    if (!service) return;
    navigate("Messages", {
      id: service.provider?._id ?? "",
      name: service.provider?.name ?? "",
      image: service.provider?.profile_image ?? service.images?.[0] ?? "",
      email: service.provider?.email ?? "",
    });
  }, [navigate, service]);

  const elements = useMemo(
    () =>
      service
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
              handler={goSubmitOffer}
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
              text={service.provider?.name}
              text1={`⭐ ${service.averageRating ?? 0} (${service.totalRating ?? 0} Reviews)`}
            />
            <ButtonTransparentBG
              text="Chat Now"
              style={{
                width: "auto",
                borderWidth: 1,
                borderColor: "#115E59",
              }}
              handler={goChatNow}
            />
          </FlexText>,
          <Details_Review service={service} key={6} />,
        ]
        : [],
    [goChatNow, goSubmitOffer, service]
  );

  return (
    <SafeAreaProviderNoScroll>
      <BackButton text="Provider Details" />
      {isLoading && <TextSecondary text="Loading provider..." />}
      {isError && <TextSecondary text="Failed to load provider" />}
      {!isLoading && !isError && service && (
        <Suspense>
          <FlatList
            keyExtractor={(_item, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: 150,
            }}
            showsVerticalScrollIndicator={false}
            data={elements}
            renderItem={({ item }) => item}
          />
        </Suspense>
      )}
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(ProviderDetails);
