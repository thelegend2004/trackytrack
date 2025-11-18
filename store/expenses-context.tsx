import { createContext, FC, ReactNode, useState } from "react";
import { Expense } from "../types";

type ExpensesContextType = {
  expenses: Expense[];
  addExpenseValues: (expense: Expense) => void;
  setExpensesValues: (expenses: Expense[]) => void;
  deleteExpenseValues: (id: string) => void;
  updateExpenseValues: (id: string, expense: Omit<Expense, "id">) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpenseValues: () => {},
  setExpensesValues: () => {},
  deleteExpenseValues: () => {},
  updateExpenseValues: () => {},
});

export const ExpensesContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = (expensesData: Expense) => {
    setExpenses((current) => [expensesData, ...current]);
  };

  const setExpensesValues = (expenses: Expense[]) => {
    const inverted = expenses.reverse();
    setExpenses(inverted);
  };

  const deleteExpense = (id: string) => {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id: string, expenseData: Omit<Expense, "id">) => {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id ? { ...expense, ...expenseData } : expense
      )
    );
  };

  const value: ExpensesContextType = {
    expenses,
    addExpenseValues: addExpense,
    setExpensesValues,
    deleteExpenseValues: deleteExpense,
    updateExpenseValues: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
