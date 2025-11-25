import React, { useState } from "react";
import { View } from "react-native";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import Input from "../../../components/ui/inputs/Input";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import { Navigation } from "../../../utils/Navigate";
import {
  useGetBankQuery,
  useUpdateBankMutation,
} from "../../../redux/apis/profileItemApi";

const UpdateBankAccount = () => {
  const { data } = useGetBankQuery();
  const [updatebank, { isLoading }] = useUpdateBankMutation();
  const navigation = Navigation();
  const [bankName, setBankName] = useState(data?.data?.bankName || "");
  const [accountNo, setAccountNo] = useState(
    data?.data?.bankAccountNumber || ""
  );
  const [bankErr, setBankErr] = useState(false);
  const [acctErr, setAcctErr] = useState(false);

  const handleSave = async () => {
    const bankValid = bankName.trim().length > 1;
    const acctValid = /^\d{8,20}$/.test(accountNo.trim());
    setBankErr(!bankValid);
    setAcctErr(!acctValid);
    if (!bankValid || !acctValid) return;
    console.log("Saved:", { bankName, accountNo });
    // navigation.goBack(); const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    try {
      const res = await updatebank({
        bankName,
        bankAccountNumber: accountNo,
      }).unwrap();

      console.log("Updated Successfully:", res);

      navigation.goBack();
    } catch (error) {
      console.log("Update failed:", error);
    }
  };

  return (
    <SafeAreaProvider backButtonText="Update Bank Account">
      <View
        style={{
          gap: 10,
          paddingBottom: 20,
        }}
      >
        <Input
          label="Bank Name"
          name="bank_name"
          value={bankName}
          placeHolder="Enter bank name"
          error={bankErr}
          keyboard="default"
          handler={(_, v) => {
            setBankName(v);
            if (bankErr) setBankErr(false);
          }}
        />

        <Input
          label="Account Number"
          name="account_no"
          value={accountNo}
          placeHolder="Enter account number"
          error={acctErr}
          keyboard="number-pad"
          handler={(_, v) => {
            // allow only digits
            const digits = v.replace(/[^0-9]/g, "");
            setAccountNo(digits);
            if (acctErr) setAcctErr(false);
          }}
        />

        <ButtonBG
          text={isLoading ? "Saving..." : "Save"}
          handler={handleSave}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default UpdateBankAccount;
