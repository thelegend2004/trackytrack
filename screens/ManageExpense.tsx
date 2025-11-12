import { Text } from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";

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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text></Text>;
}
