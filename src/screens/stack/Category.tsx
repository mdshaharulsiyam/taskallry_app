import React from "react";
import { FlatList, StyleSheet } from "react-native";
import CategorySquareButton from "../../components/category/CategorySquareButton";
import BackButton from "../../components/shered/BackButton";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";
import { useGetAllCategoriesQuery } from "../../redux/apis";

const Category = () => {
  const { width } = ScreenSize();
  const itemWidth = (width - 80) / 2;
  const navigate = Navigate();
  const { data } = useGetAllCategoriesQuery();
  return (
    <SafeAreaProviderNoScroll backButtonText="Tasks Categories">
      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={data?.data?.result || []}
        numColumns={2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategorySquareButton
            width={itemWidth}
            style={{ width: itemWidth, paddingVertical: 15 }}
            name={item.name}
            image={item?.category_image}
            totalProviders={item?.totalServices}
          />
        )}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Category;

const styles = StyleSheet.create({
  listContent: {
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
