import React, { Suspense, useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import CategorySection from "../../components/home/CategorySection";
import MyStats from "../../components/home/MyStats";
import PopularTaskProvider from "../../components/home/PopularTaskProvider";
import RecentlyAddedTask from "../../components/home/RecentlyAddedTask";
import UserProfileHeader from "../../components/home/UserProfileHeader";
import SearchBar from "../../components/shered/SearchBar";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";
import { baseApi } from "../../redux/baseApi";
import { useAppDispatch } from "../../redux/hooks";

const Home = () => {
  const { role } = useGlobalContext();
  const dispatch = useAppDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(
      baseApi.util.invalidateTags([
        "Profile",
        "Category",
        "Task",
        "Service",
        "Auth",
      ])
    );
    setTimeout(() => setRefreshing(false), 500);
  }, [dispatch]);

  return (
    <SafeAreaProviderNoScroll>
      <Suspense>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor="#115E59"
              colors={["#115E59"]}
            />
          }
          data={useMemo(
            () => [
              <UserProfileHeader key={1} />,
              <SearchBar key={2} />,
              role == "service" ? <MyStats key={3} /> : <></>,
              <CategorySection key={4} />,
              <RecentlyAddedTask key={5} />,
              role != "service" ? <PopularTaskProvider key={6} /> : <></>,
            ],
            [role]
          )}
          renderItem={({ item }) => item}
        />
      </Suspense>
    </SafeAreaProviderNoScroll>
  );
};

export default React.memo(Home);

const styles = StyleSheet.create({});
