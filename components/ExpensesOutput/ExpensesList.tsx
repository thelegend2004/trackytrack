import { FlatList, Text } from "react-native";
import { Expense } from "../../types";
import React from "react";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData: any) {
  return <ExpenseItem expense={itemData.item}/>;
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
