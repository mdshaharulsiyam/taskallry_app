import { useRoute } from "@react-navigation/native";
import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FilteredProvider from "../../components/search/FilteredProvider";
import FIlteredTask from "../../components/search/FIlteredTask";
import FilterOptions from "../../components/search/FilterOptions";
import ProvidersMap from "../../components/search/ProvidersMap";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useAppSelector } from "../../redux/hooks";
import { selectFilters } from "../../redux/slices/filterSlice";

const Search = () => {
  const {
    params: { category_id, search, type },
  } = useRoute() as {
    params: { category_id: string; search: string; type?: "Task" | "Provider" };
  };
  const { role } = useGlobalContext();
  const combinedType = type ? type : role === "user" ? "Provider" : "Task";
  const [searchText, setSearchText] = React.useState(search);
  const filterState = useAppSelector(selectFilters);

  const elements = [
    <FilterOptions
      search={searchText}
      handler={(value: string) => setSearchText(value)}
      key={1}
      type={combinedType}
    />,
    filterState?.viewMode === "map" ? (
      <ProvidersMap key={3} />
    ) : combinedType == "Provider" ? (
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
