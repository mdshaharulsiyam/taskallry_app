import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useMemo } from "react";
import Tabbar from "../components/tabbar/Tabbar";
import { useGlobalContext } from "../providers/GlobalContextProvider";
import Chat from "../screens/tabs/Chat";
import Home from "../screens/tabs/Home";
import PostService from "../screens/tabs/PostService";
import PostTask from "../screens/tabs/PostTask";
import Profile from "../screens/tabs/Profile";
import Tasks from "../screens/tabs/Tasks";
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
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, lazy: true }}
      detachInactiveScreens
      tabBar={renderTabBar}
    >
      {screens}
    </Tab.Navigator>
  );
};

export default React.memo(TabLayout);

