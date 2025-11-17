import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";
import Button from "../UI/Button";
import { Expense } from "../../types";
import { getFormattedDate } from "../../util/date";

interface ExpsenseFormProps {
  onCancel: () => void;
  onSubmit: (expense: Omit<Expense, "id">) => void;
  isEditing: boolean;
  selectedExpense?: Expense;
}

export default function ExpenseForm({
  onCancel,
  onSubmit,
  isEditing,
  selectedExpense,
}: ExpsenseFormProps) {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense?.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: selectedExpense ? getFormattedDate(selectedExpense.date) : "",
      isValid: true,
    },
    description: {
      value: selectedExpense ? selectedExpense?.description : "",
      isValid: true,
    },
  });

  const handleChangeAmount = (inputId: string, enteredValue: string) => {
    setInputs((prev) => {
      return { ...prev, [inputId]: { value: enteredValue, isValid: true } };
    });
  };

  const handleConfirm = () => {
    const expenseData: Omit<Expense, "id"> = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prev) => {
        return {
          amount: { value: prev.amount.value, isValid: amountIsValid },
          date: { value: prev.date.value, isValid: dateIsValid },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.text}>The Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: (value) => handleChangeAmount("amount", value),
          }}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: (value) => handleChangeAmount("date", value),
          }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          // autoCorrect: true, default
          // autoCapitalize: "sentences", default
          multiline: true,
          value: inputs.description.value,
          onChangeText: (value) => handleChangeAmount("description", value),
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid form. Please check again entered values.
        </Text>
      )}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button mode="regular" onPress={handleConfirm} style={styles.button}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  text: {
    fontSize: 26,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary800,
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    marginBottom: 8,
  },
});
