import axios from "axios";
import { Expense } from "../types";

const BACKEND_URL = "https://tracky-track-rn-app-default-rtdb.firebaseio.com";

export const addExpense = async (expenseData: Omit<Expense, "id">) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const values = response.data[key];
    const expense = {
      id: key,
      amount: values.amount,
      date: new Date(values.date),
      description: values.description,
    };
    expenses.push(expense);
  }

  return expenses;
};

export const updateExpense = (id: string, expenseData: Omit<Expense, "id">) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id: string) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
