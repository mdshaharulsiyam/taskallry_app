import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import React, { useCallback } from "react";
import FIlterOptions from "../components/shered/FIlterOptions";
import StackLayout from "./StackLayout";

const Drawer = createDrawerNavigator();

const DrawerLayout = () => {
  const renderDrawerContent = useCallback(
    (props: any) => <CustomDrawerContent {...props} />,
    []
  );
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, swipeEnabled: false }}
      initialRouteName="StackLayout"
      drawerContent={renderDrawerContent}
    >
      <Drawer.Screen name="StackLayout" component={StackLayout} />
    </Drawer.Navigator>
  );
};

const CustomDrawerContentComponent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <FIlterOptions {...props} />
    </DrawerContentScrollView>
  );
};

const CustomDrawerContent = React.memo(CustomDrawerContentComponent);

export default React.memo(DrawerLayout);
