import React, { Suspense, useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import CategorySection from "../../components/home/CategorySection";
import MyStats from "../../components/home/MyStats";
import PopularTaskProvider from "../../components/home/PopularTaskProvider";
import RecentlyAddedTask from "../../components/home/RecentlyAddedTask";
import UserProfileHeader from "../../components/home/UserProfileHeader";
import SearchBar from "../../components/shered/SearchBar";
import { useGlobalContext } from "../../providers/GlobalContextProvider";
import SafeAreaProviderNoScroll from "../../providers/SafeAreaProviderNoScroll";

const Home = () => {
  const { role } = useGlobalContext();
  return (
    <SafeAreaProviderNoScroll>
      <Suspense>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
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
