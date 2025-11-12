import { StyleSheet, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../types";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of cheese",
    amount: 66.66,
    date: new Date("2025-12-12"),
  },
  {
    id: "e2",
    description: "A pair of shorts",
    amount: 77.66,
    date: new Date("2025-11-12"),
  },
  {
    id: "e3",
    description: "Kiwis",
    amount: 1.99,
    date: new Date("1999-11-12"),
  },
  {
    id: "e4",
    description: "House",
    amount: 19999.99,
    date: new Date("2009-11-12"),
  },
  {
    id: "e5",
    description: "Beer",
    amount: 5.99,
    date: new Date("2010-01-12"),
  },
  {
    id: "e6",
    description: "Zhyvchyk",
    amount: 5.99,
    date: new Date("2018-11-12"),
  },
  {
    id: "e7",
    description: "Chips",
    amount: 7.99,
    date: new Date("2013-11-12"),
  },
  {
    id: "e8",
    description: "Ale",
    amount: 1.99,
    date: new Date("2012-11-12"),
  },
  {
    id: "e9",
    description: "Wodka",
    amount: 2.99,
    date: new Date("2019-12-12"),
  },
  {
    id: "e10",
    description: "Wine",
    amount: 4.99,
    date: new Date("2019-01-12"),
  },
];

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
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
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
