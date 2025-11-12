import { View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { Expense } from "../../types";

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
    date: new Date("2019-11-12"),
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
    <View>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={periodName} />
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  );
}
