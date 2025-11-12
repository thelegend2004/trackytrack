import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../types";
import { GlobalStyles } from "../../constants/styles";

interface ExpensesOutputProps {
  expenses: Expense[];
  periodName: string;
}

export default function ExpensesOutput({
  expenses,
  periodName,
}: ExpensesOutputProps) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={periodName} />
      <ExpensesList expenses={expenses} />
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
});
