import React, { Suspense, useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import FlexText from "../../components/shered/FlexText";
import HeaderDesign from "../../components/shered/HeaderDesign";
import TextPrimary from "../../components/shered/TextPrimary";
import TextSecondary from "../../components/shered/TextSecondary";
import ButtonBG from "../../components/ui/buttons/ButtonBG";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetMyServicesQuery } from "../../redux/apis";
import type { Service } from "../../redux/apis/serviceApi";
import { ImgUrl } from '../../redux/baseApi';
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";

const PostService = () => {
  const { width } = ScreenSize();
  const navigate = Navigate();
  const [limit, setLimit] = useState(10);
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetMyServicesQuery({ page: 1, limit });
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPage ?? 1;
  const totalItems = meta?.total ?? 0;
  const services = data?.data?.result ?? [];
  const hasMore = services.length < totalItems && (meta?.page ?? 1) < totalPages;

  const handleRefresh = useCallback(() => {
    setLimit(10);
    refetch();
  }, [refetch]);

  const handleLoadMore = useCallback(() => {
    if (hasMore && !isFetching) {
      setLimit((prev) => prev + 10);
    }
  }, [hasMore, isFetching]);

  const handleViewDetails = useCallback(
    (serviceId: string) => {
      navigate("ServiceDetails", { id: serviceId });
    },
    [navigate]
  );

  const listHeader = useMemo(
    () => (
      <View style={styles.headerContainer}>
        <ButtonBG
          style={styles.addButton}
          text="Add Service"
          handler={() => navigate("AddUpdateService")}
        />
      </View>
    ),
    [navigate]
  );

  const listFooter = useMemo(() => {
    if (!isFetching || limit === 10) return null;
    return (
      <View style={styles.footerContainer}>
        <ActivityIndicator size="small" color="#1A56DB" />
      </View>
    );
  }, [isFetching, limit]);

  const renderService = useCallback(
    ({ item }: { item: Service }) => (
      <View style={styles.card}>
        <Image
          src={ImgUrl(item.images?.[0])}
          style={{
            width: width - 60,
            height: (width / 3) * 1.7,
            borderRadius: 10,
          }}
        />
        <TextSecondary
          text={item.category?.name || "Service"}
          style={styles.categoryBadge}
        />
        <TextSecondary
          text={`⭐ ${item.averageRating ?? 0}`}
          style={styles.ratingBadge}
        />
        <HeaderDesign text={item.title || "My Service"} />
        <FlexText
          style={{
            justifyContent: "space-between",
          }}
        >
          <TextPrimary text="Starting Price :" />
          <TextSecondary text={`₦${item.price ?? 0}`} />
        </FlexText>
        {/*
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
            text={item.address || ""}
          />
        </FlexText>
        */}
        <FlexText style={{}}>
          <ButtonBG
            style={{
              width: "auto",
            }}
            text="View Details"
            handler={() => handleViewDetails(item._id)}
          />
        </FlexText>
      </View>
    ),
    [handleViewDetails, width]
  );

  if (isLoading && services.length === 0) {
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

  return (
    <SafeAreaProviderNoScroll backButtonText="My Service">
      <Suspense>
        <FlatList
          contentContainerStyle={{ paddingBottom: 190, }}
          data={services}
          keyExtractor={(item) => item._id}
          renderItem={renderService}
          ListHeaderComponent={listHeader}
          ListFooterComponent={listFooter}
          onEndReached={handleLoadMore}
          refreshing={isFetching && limit === 10}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <TextSecondary text="No service found" />
            </View>
          )}
        />
      </Suspense>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(PostService);

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    position: "relative",
    marginTop: 20,
  },
  categoryBadge: {
    backgroundColor: "#FFF",
    padding: 6,
    position: "absolute",
    top: 20,
    left: 20,
    borderRadius: 6,
  },
  ratingBadge: {
    backgroundColor: "#FFF",
    padding: 6,
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: 6,
  },
  addButton: {
    width: "auto",
    alignSelf: "flex-start",
  },
  footerContainer: {
    paddingVertical: 16,
  },
  emptyContainer: {
    padding: 16,
    alignItems: "flex-start",
  },
});
