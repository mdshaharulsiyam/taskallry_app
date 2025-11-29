import { useRoute } from "@react-navigation/native";
import React, { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import FilteredProvider from "../../components/search/FilteredProvider";
import FIlteredTask from "../../components/search/FIlteredTask";
import FilterOptions from "../../components/search/FilterOptions";
import ProvidersMap from "../../components/search/ProvidersMap";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectFilters, setSearchType } from "../../redux/slices/filterSlice";

const Search = () => {
  const {
    params: { category_id, search, type },
  } = useRoute() as {
    params: { category_id: string; search: string; type?: "Task" | "Provider" };
  };
  const { role } = useGlobalContext();
  const dispatch = useAppDispatch();
  const combinedType = type ? type : role === "user" ? "Provider" : "Task";
  const [searchText, setSearchText] = useState(search);
  const filterState = useAppSelector(selectFilters);

  useEffect(() => {
    dispatch(setSearchType(combinedType));
  }, [combinedType, dispatch]);

  const elements = useMemo(
    () => [
      <FilterOptions
        search={searchText}
        handler={(value: string) => setSearchText(value)}
        key={1}
        type={combinedType}
      />,
      combinedType === "Provider"
        ? (
          <FilteredProvider key={3} />
        )
        : filterState?.viewMode === "map"
          ? (
            <ProvidersMap key={3} />
          )
          : (
            <FIlteredTask key={2} search={searchText} />
          ),
    ],
    [combinedType, filterState?.viewMode, searchText]
  );
  const keyExtractor = useCallback((_: any, index: number) => index.toString(), []);
  const renderItem = useCallback(({ item }: { item: React.ReactElement }) => item, []);
  return (
    <SafeAreaProviderNoScroll>
      <Suspense>
        <FlatList
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          data={elements}
          renderItem={renderItem}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={5}
          removeClippedSubviews
          updateCellsBatchingPeriod={50}
          keyboardShouldPersistTaps="handled"
        />
      </Suspense>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(Search);

const styles = StyleSheet.create({});
