import { StyleSheet, TextInput, View } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { Expense } from "../types";

type ManageExpenseNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ManageExpense"
>;

type ManageExpenseRouteProps = RouteProp<RootStackParamList, "ManageExpense">;

export default function ManageExpenses() {
  const navigation = useNavigation<ManageExpenseNavigationProp>();
  const route = useRoute<ManageExpenseRouteProps>();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const { addExpense, deleteExpense, updateExpense, expenses } =
    useContext(ExpensesContext);

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const handleDelete = () => {
    if (isEditing) {
      deleteExpense(expenseId);
    }
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = (expense: Omit<Expense, "id">) => {
    if (isEditing) {
      updateExpense(expenseId, expense);
    } else {
      addExpense(expense);
    }

    navigation.goBack();
  };

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
