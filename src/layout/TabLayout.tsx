import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { Suspense } from "react";
import Tabbar from "../components/tabbar/Tabbar";
import Loader from "../components/ui/loader/Loader";
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
  const tabs = [
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
  ];
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Tabbar {...props} />}
    >
      {tabs?.map((item: any) => {
        const Component = item?.component;
        return (
          <Tab.Screen
            key={item?.route}
            name={item?.route}
            options={{
              tabBarLabel: item?.label,
              headerShown: false,
            }}
          >
            {() => (
              <Suspense fallback={<Loader />}>
                <Component />
              </Suspense>
            )}
          </Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

export default React.memo(TabLayout);
