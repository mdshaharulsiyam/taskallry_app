import { useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FilteredProvider from "../../components/search/FilteredProvider";
import FIlteredTask from "../../components/search/FIlteredTask";
import FilterOptions from "../../components/search/FilterOptions";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";

const Search = () => {
  const {
    params: { category_id, type, search },
  } = useRoute() as {
    params: { category_id: string; type: "Provider" | "Task"; search: string };
  };
  const [searchText, setSearchText] = React.useState(search);
  const elements = [
    <FilterOptions
      search={searchText}
      handler={(value: string) => setSearchText(value)}
      key={1}
      type={type}
    />,
    type == "Provider" ? (
      <FilteredProvider key={3} />
    ) : (
      <FIlteredTask key={2} search={searchText} />
    ),
  ];
  return (
    <SafeAreaProviderNoScroll>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        data={elements}
        renderItem={({ item }) => item}
      />
    </SafeAreaProviderNoScroll>
  );
};

export default Search;

const styles = StyleSheet.create({});
