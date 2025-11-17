import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const recentExpense = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return (expense.date >= date7DaysAgo) && (expense.date <= today);
  });

  return <ExpensesOutput expenses={recentExpense} periodName={"Last 7 Days"} fallbackText="No registered expenses in last 7 days found"/>;
}
