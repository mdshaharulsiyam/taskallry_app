import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useGetAllCategoriesQuery } from "../../redux/apis";
import Navigate from "../../utils/Navigate";
import ScreenSize from "../../utils/ScreenSize";
import CategoryButton from "../category/CategoryButton";
import SectionHeading from "../shered/SectionHeading";

const CategorySection = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const { width } = ScreenSize();
  const itemWidth = (width - 80) / 4;
  const navigate = Navigate();
  return (
    <View style={{ marginTop: 10 }}>
      <SectionHeading text="Categories" handler={() => navigate("Category")} />
      <FlatList
        data={data?.data?.result || []}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CategoryButton
            width={itemWidth}
            style={{ width: itemWidth, paddingVertical: 15 }}
            name={item.name}
            image={item.category_image}
          />
        )}
      />
    </View>
  );
};

export default CategorySection;

const styles = StyleSheet.create({
  listContent: {
    alignItems: "center",
    gap: 10,
    justifyContent: "space-between",
  },
});
