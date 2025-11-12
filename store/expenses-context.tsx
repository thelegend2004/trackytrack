import { createContext, FC, ReactNode, useState } from "react";
import { Expense } from "../types";

const DUMMY_EXPENSES: Expense[] = [
  {
    id: "e1",
    description: "A pair of cheese",
    amount: 66.65,
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

type ExpensesContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  updateExpense: (id: string, expense: Omit<Expense, "id">) => void;
};

export const ExpensesContext = createContext<ExpensesContextType>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

export const ExpensesContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expenses, setExpenses] = useState<Expense[]>(DUMMY_EXPENSES);

  function addExpense(expensesData: Omit<Expense, "id">) {
    const newExpense: Expense = {
      id: Math.random().toString(),
      ...expensesData,
    };
    setExpenses((current) => [newExpense, ...current]);
  }

  function deleteExpense(id: string) {
    setExpenses((current) => current.filter((expense) => expense.id !== id));
  }

  function updateExpense(id: string, expenseData: Omit<Expense, "id">) {
    setExpenses((current) =>
      current.map((expense) =>
        expense.id === id ? { ...expense, ...expenseData } : expense
      )
    );
  }

  const value: ExpensesContextType = {
    expenses,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};
