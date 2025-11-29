import React, { Suspense, useCallback, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import CategorySquareButton from "../../components/category/CategorySquareButton";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useGetAllCategoriesQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";

const Category = () => {
  const { width } = ScreenSize();
  const itemWidth = useMemo(() => (width - 80) / 2, [width]);
  const navigate = Navigate();
  const { data } = useGetAllCategoriesQuery({});
  const categories = data?.data?.result || [];

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <CategorySquareButton
        width={itemWidth}
        style={{ width: itemWidth, paddingVertical: 15 }}
        name={item.name}
        image={item?.category_image}
        totalProviders={item?.totalServices}
      />
    ),
    [itemWidth]
  );
  return (
    <SafeAreaProviderNoScroll backButtonText="Tasks Categories">
      <Suspense>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={categories}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
        />
      </Suspense>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(Category);

const styles = StyleSheet.create({
  listContent: {
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
