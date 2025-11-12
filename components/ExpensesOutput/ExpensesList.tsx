import { FlatList, Text } from "react-native";
import { Expense } from "../../types";

function renderExpenseItem(itemData: any) {
  return <Text>{itemData.item.description}</Text>;
}

interface ExpensesListProps {
  expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}
