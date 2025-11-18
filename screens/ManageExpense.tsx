import { StyleSheet, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { Expense } from "../types";
import { addExpense, deleteExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type ManageExpenseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ManageExpense"
>;

type ManageExpenseRouteProps = RouteProp<RootStackParamList, "ManageExpense">;

export default function ManageExpenses() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<ManageExpenseNavigationProp>();
  const route = useRoute<ManageExpenseRouteProps>();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const {
    addExpenseValues,
    deleteExpenseValues,
    updateExpenseValues,
    expenses,
  } = useContext(ExpensesContext);

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (isEditing) {
        deleteExpenseValues(expenseId);
        await deleteExpense(expenseId);
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense!");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async (expense: Omit<Expense, "id">) => {
    setIsLoading(true);
    try {
      if (isEditing) {
        updateExpenseValues(expenseId, expense);
        await updateExpense(expenseId, expense);
      } else {
        const id = await addExpense(expense);
        const fullExpense: Expense = { ...expense, id: id };
        addExpenseValues(fullExpense);
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data!");
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setError("");
  };

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={handleError} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        selectedExpense={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary100,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
