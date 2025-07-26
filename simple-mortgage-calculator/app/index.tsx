import { Button } from "@react-navigation/elements";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { StyleSheet, TextInput } from "react-native";
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Index() {
  const [interestRate, setInterestRate] = useState('0.0275');
  const [payoffDate, setPayoffDate] = useState('Date Here');

  const [balance, setBalance] = useState('376387.63');
  const [monthlyPayment, setMonthlyPayment] = useState('3000');
  const [escrowPayment, setEscrowPayment] = useState('433.66');

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  function calculate() {
    const mortgagePayment = Number(monthlyPayment) - Number(escrowPayment);
    const periodicInterest = Number(interestRate) / 12.0;
    let paymentNumber = 1;
    let runningBalance = Number(balance);

    while(runningBalance > 0) {
      // console.log("RUNNING BALANCE: ", runningBalance);
      const interestPayment = Number(runningBalance) * Number(periodicInterest);
      const principalPayment = Number(mortgagePayment) - interestPayment;
      runningBalance = runningBalance - principalPayment;
      paymentNumber = paymentNumber + 1;
    }
    
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() + (paymentNumber - 1));
    const fullMonthName = currentDate.toLocaleString('default', { month: 'long' });
    setPayoffDate(fullMonthName + " " + currentDate.getFullYear());
    
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Text>Interest Rate</Text>
        <TextInput style={styles.input} value={interestRate} onChangeText={setInterestRate} keyboardType={"numeric"} />
        <Text>Balance</Text>
        <TextInput style={styles.input} value={balance} onChangeText={setBalance} keyboardType={"numeric"} />
        <Text>Monthly Payment</Text>
        <TextInput style={styles.input} value={monthlyPayment} onChangeText={setMonthlyPayment} keyboardType={"numeric"} />
        <Text>Escrow</Text>
        <TextInput style={styles.input} value={escrowPayment} onChangeText={setEscrowPayment} keyboardType={"numeric"} />
        <Button onPressIn={calculate }>Calculate</Button>
        <Text>{payoffDate}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
