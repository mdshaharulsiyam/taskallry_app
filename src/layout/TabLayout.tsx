import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Suspense, useCallback, useMemo } from "react";
import { View } from "react-native";
import Tabbar from "../components/tabbar/Tabbar";
import { useGlobalContext } from "../providers/GlobalContextProvider";
const Home = React.lazy(() => import("../screens/tabs/Home"));
const Tasks = React.lazy(() => import("../screens/tabs/Tasks"));
const PostService = React.lazy(() => import("../screens/tabs/PostService"));
const PostTask = React.lazy(() => import("../screens/tabs/PostTask"));
const Chat = React.lazy(() => import("../screens/tabs/Chat"));
const Profile = React.lazy(() => import("../screens/tabs/Profile"));
const Tab = createBottomTabNavigator();
const TabLayout = () => {
  const { role } = useGlobalContext();
  const tabs = useMemo(
    () => [
      {
        route: "Home",
        label: role == "user" ? "Home" : "Dashboard",
        component: Home,
      },
      {
        route: "Task",
        label: "My Tasks",
        component: Tasks,
      },
      {
        route: "PostTask",
        label: role == "user" ? "Post Task" : "My Service",
        component: role == "user" ? PostTask : PostService,
      },
      {
        route: "Chat",
        label: "Chat",
        component: Chat,
      },
      {
        route: "Profile",
        label: "Profile",
        component: Profile,
      },
    ],
    [role]
  );
  const renderTabBar = useCallback((props: any) => <Tabbar {...props} />, []);
  const screens = useMemo(
    () =>
      tabs.map((item: any) => (
        <Tab.Screen
          key={item?.route}
          name={item?.route}
          options={{
            tabBarLabel: item?.label,
            headerShown: false,
          }}
          component={item?.component}
        />
      )),
    [tabs]
  );
  return (
    <Suspense
      fallback={
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <Tabbar
            {...({
              state: {
                index: 0,
                routes: [],
              },
              navigation: {
                navigate: () => { },
                emit: () => ({ defaultPrevented: false } as any),
                dispatch: () => { },
              },
            } as any)}
          />
        </View>
      }
    >
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false, lazy: true }}
        detachInactiveScreens
        tabBar={renderTabBar}
      >
        {screens}
      </Tab.Navigator>
    </Suspense>
  );
};

export default React.memo(TabLayout);

