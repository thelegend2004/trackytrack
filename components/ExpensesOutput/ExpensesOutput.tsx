import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../types";
import { GlobalStyles } from "../../constants/styles";

interface ExpensesOutputProps {
  expenses: Expense[];
  periodName: string;
  fallbackText: string;
}

export default function ExpensesOutput({
  expenses,
  periodName,
  fallbackText,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text style={styles.infoText}>{fallbackText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 28,
  },
});
