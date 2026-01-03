import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Suspense, useMemo } from "react";
import { ActivityIndicator, View } from "react-native";
const AddUpdateService = React.lazy(() => import("../screens/stack/AddUpdateService"));
const ChooseSignUp = React.lazy(() => import("../screens/stack/auth/ChooseSignUp"));
const CustomerSignUp = React.lazy(() => import("../screens/stack/auth/CustomerSignUp"));
const ForgetPassword = React.lazy(() => import("../screens/stack/auth/ForgetPassword"));
const Login = React.lazy(() => import("../screens/stack/auth/Login"));
const ResetPassword = React.lazy(() => import("../screens/stack/auth/ResetPassword"));
const ServiceSignUp = React.lazy(() => import("../screens/stack/auth/ServiceSignUp"));
const Verify = React.lazy(() => import("../screens/stack/auth/Verify"));
const Category = React.lazy(() => import("../screens/stack/Category"));
const ExtendDate = React.lazy(() => import("../screens/stack/ExtendDate"));
const Messages = React.lazy(() => import("../screens/stack/Messages"));
const MyTaskDetails = React.lazy(() => import("../screens/stack/MyTaskDetails"));
const Onboarding = React.lazy(() => import("../screens/stack/onboarding/Onboarding"));
const RealTimeBooking = React.lazy(() => import("../screens/stack/onboarding/RealTimeBooking"));
const SecurePayments = React.lazy(() => import("../screens/stack/onboarding/SecurePayments"));
const TrustedServices = React.lazy(() => import("../screens/stack/onboarding/TrustedServices"));
const ProviderDetails = React.lazy(() => import("../screens/stack/ProviderDetails"));
const ReferDiscounts = React.lazy(() => import("../screens/stack/ReferDiscounts"));
const RegulationsCenter = React.lazy(() => import("../screens/stack/RegulationsCenter"));
const RequestCancel = React.lazy(() => import("../screens/stack/RequestCancel"));
const Search = React.lazy(() => import("../screens/stack/Search"));
const ServiceDetails = React.lazy(() => import("../screens/stack/ServiceDetails"));
const PaymentWebView = React.lazy(
  () => import("../screens/stack/PaymentWebView")
);
const AccountSetting = React.lazy(() => import("../screens/stack/settings/AccountSetting"));
const ChangePassword = React.lazy(() => import("../screens/stack/settings/ChangePassword"));
const EarningsUpdated = React.lazy(() => import("../screens/stack/settings/EarningsUpdated"));
const Help = React.lazy(() => import("../screens/stack/settings/Help"));
const MyProfile = React.lazy(() => import("../screens/stack/settings/MyProfile"));
const Notifications = React.lazy(() => import("../screens/stack/settings/Notifications"));
const PrivacyPolicy = React.lazy(() => import("../screens/stack/settings/PrivacyPolicy"));
const SavedAccount = React.lazy(() => import("../screens/stack/settings/SavedAccount"));
const Terms = React.lazy(() => import("../screens/stack/settings/Terms"));
const UpdateBankAccount = React.lazy(
  () => import("../screens/stack/settings/UpdateBankAccount")
);
const ViewProfile = React.lazy(() => import("../screens/stack/settings/ViewProfile"));
const TaskDetails = React.lazy(() => import("../screens/stack/TaskDetails"));
const TabLayout = React.lazy(() => import("./TabLayout"));
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
    PaymentWebView: PaymentWebView,
    AddUpdateService: AddUpdateService,
    Earnings: EarningsUpdated,
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
    <Suspense
      fallback={
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      }
    >
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}
      >
        {screenElements}
      </Stack.Navigator>
    </Suspense>
  );
};

export default React.memo(StackLayout);
