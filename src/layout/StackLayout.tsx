import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useMemo } from "react";
import AddUpdateService from "../screens/stack/AddUpdateService";
import ChooseSignUp from "../screens/stack/auth/ChooseSignUp";
import CustomerSignUp from "../screens/stack/auth/CustomerSignUp";
import ForgetPassword from "../screens/stack/auth/ForgetPassword";
import Login from "../screens/stack/auth/Login";
import ResetPassword from "../screens/stack/auth/ResetPassword";
import ServiceSignUp from "../screens/stack/auth/ServiceSignUp";
import Verify from "../screens/stack/auth/Verify";
import Category from "../screens/stack/Category";
import ExtendDate from "../screens/stack/ExtendDate";
import Messages from "../screens/stack/Messages";
import MyTaskDetails from "../screens/stack/MyTaskDetails";
import Onboarding from "../screens/stack/onboarding/Onboarding";
import RealTimeBooking from "../screens/stack/onboarding/RealTimeBooking";
import SecurePayments from "../screens/stack/onboarding/SecurePayments";
import TrustedServices from "../screens/stack/onboarding/TrustedServices";
import ProviderDetails from "../screens/stack/ProviderDetails";
import ReferDiscounts from "../screens/stack/ReferDiscounts";
import RegulationsCenter from "../screens/stack/RegulationsCenter";
import RequestCancel from "../screens/stack/RequestCancel";
import Search from "../screens/stack/Search";
import ServiceDetails from "../screens/stack/ServiceDetails";
import { AccountSetting } from "../screens/stack/settings/AccountSetting";
import ChangePassword from "../screens/stack/settings/ChangePassword";
import Earnings from "../screens/stack/settings/Earnings";
import Help from "../screens/stack/settings/Help";
import MyProfile from "../screens/stack/settings/MyProfile";
import Notifications from "../screens/stack/settings/Notifications";
import PrivacyPolicy from "../screens/stack/settings/PrivacyPolicy";
import SavedAccount from "../screens/stack/settings/SavedAccount";
import Terms from "../screens/stack/settings/Terms";
import UpdateBankAccount from "../screens/stack/settings/UpdateBankAccount";
import ViewProfile from "../screens/stack/settings/ViewProfile";
import TaskDetails from "../screens/stack/TaskDetails";
import TabLayout from "./TabLayout";
const Stack = createNativeStackNavigator();

const StackLayout = () => {
  const screens = useMemo(() => ({
    Onboarding: Onboarding,
    Login: Login,
    Forget: ForgetPassword,
    Verify: Verify,
    ResetPassword: ResetPassword,
    ChooseSignUp: ChooseSignUp,
    CustomerSignUp: CustomerSignUp,
    ServiceSignUp: ServiceSignUp,
    RealTimeBooking: RealTimeBooking,
    SecurePayments: SecurePayments,
    TrustedServices: TrustedServices,
    Search: Search,
    TabLayout: TabLayout,
    Category: Category,
    TaskDetails: TaskDetails,
    ProviderDetails: ProviderDetails,
    MyTaskDetails: MyTaskDetails,
    RegulationsCenter: RegulationsCenter,
    ExtendDate: ExtendDate,
    RequestCancel: RequestCancel,
    Messages: Messages,
    MyProfile: MyProfile,
    ChangePassword: ChangePassword,
    ReferDiscounts: ReferDiscounts,
    SavedAccount: SavedAccount,
    Notifications: Notifications,
    PrivacyPolicy: PrivacyPolicy,
    Terms: Terms,
    Help: Help,
    ServiceDetails: ServiceDetails,
    AddUpdateService: AddUpdateService,
    Earnings: Earnings,
    UpdateBankAccount: UpdateBankAccount,
    ViewProfile: ViewProfile,
    AccountSetting: AccountSetting,
  }), []);

  const stacks = useMemo(
    () =>
      Object.keys(screens).map((key) => ({
        route: key,
        label: key,
        component: screens[key as keyof typeof screens],
      })),
    [screens]
  );

  const screenElements = useMemo(
    () =>
      stacks.map((item: any) => (
        <Stack.Screen
          key={item?.route}
          name={item?.route}
          options={{
            headerShown: false,
          }}
          component={item?.component}
        />
      )),
    [stacks]
  );

  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      {screenElements}
    </Stack.Navigator>
  );
};

export default React.memo(StackLayout);
