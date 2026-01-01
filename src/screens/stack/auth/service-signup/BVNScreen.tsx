import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import Toast from "react-native-toast-message";
import HeaderDesign from "../../../../components/shered/HeaderDesign";
import TextSecondary from "../../../../components/shered/TextSecondary";
import ButtonBG from "../../../../components/ui/buttons/ButtonBG";
import Input from "../../../../components/ui/inputs/Input";
import SafeAreaProvider from "../../../../providers/SafeAreaProvider";
import { useVerifyBvnMutation } from "../../../../redux/apis";

const BVNScreen = () => {
  const navigation = useNavigation<any>();
  const [verifyBvn, { isLoading }] = useVerifyBvnMutation();
  const [bvn, setBvn] = useState("");
  const [error, setError] = useState<string>("");

  const handleChange = useCallback((_: string, value: string) => {
    setBvn(value);
    setError("");
  }, []);

  const onVerify = async () => {
    const trimmed = bvn.trim();
    if (trimmed.length !== 11 || !/^\d{11}$/.test(trimmed)) {
      setError("BVN must be 11 digits");
      return;
    }

    verifyBvn({ bvn: trimmed })
      .unwrap()
      .then(async (res: any) => {
        await AsyncStorage.removeItem("isBankNumberVerified");
        Toast.show({ type: "success", text1: "BVN verified", text2: res?.message || "Verification successful" });
        navigation.navigate("Identity");
      })
      .catch((err: any) => {
        Toast.show({ type: "error", text1: "BVN verification failed", text2: err?.data?.message || "Something went wrong" });
      });
  };

  return (
    <SafeAreaProvider backButtonText="Freelancer Sign Up">
      <HeaderDesign text="Verify Your BVN" style={{ marginTop: 10 }} />
      <TextSecondary text="Enter your 11-digit Bank Verification Number (BVN) for identity confirmation." />
      <Input
        keyboard="number-pad"
        label="Bank Verification Number (BVN)"
        placeHolder="Enter BVN"
        value={bvn}
        handler={handleChange}
        name="bvn"
        error={!!error}
        onBlur={() => {
          if (bvn.trim() && (bvn.trim().length !== 11 || !/^\d{11}$/.test(bvn.trim()))) {
            setError("BVN must be 11 digits");
          }
        }}
      />
      <ButtonBG
        style={{ marginTop: 12 }}
        text="Verify"
        disabled={isLoading}
        loading={isLoading}
        handler={() => { void onVerify(); }}
      />
    </SafeAreaProvider>
  );
};

export default BVNScreen;
