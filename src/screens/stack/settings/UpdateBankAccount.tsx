import React, { useCallback, useState } from "react";
import { View } from "react-native";
import ButtonBG from "../../../components/ui/buttons/ButtonBG";
import Input from "../../../components/ui/inputs/Input";
import SafeAreaProvider from "../../../providers/SafeAreaProvider";
import { Navigation } from "../../../utils/Navigate";

const UpdateBankAccount = () => {
  const navigation = Navigation();
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [bankErr, setBankErr] = useState(false);
  const [acctErr, setAcctErr] = useState(false);

  const handleSave = useCallback(() => {
    const bankValid = bankName.trim().length > 1;
    const acctValid = /^\d{8,20}$/.test(accountNo.trim());
    setBankErr(!bankValid);
    setAcctErr(!acctValid);
    if (!bankValid || !acctValid) return;
    navigation.goBack();
  }, [accountNo, bankName, navigation]);

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
            const digits = v.replace(/[^0-9]/g, "");
            setAccountNo(digits);
            if (acctErr) setAcctErr(false);
          }}
        />

        <ButtonBG text="Save" handler={handleSave} />
      </View>
    </SafeAreaProvider>
  );
};

export default React.memo(UpdateBankAccount);
