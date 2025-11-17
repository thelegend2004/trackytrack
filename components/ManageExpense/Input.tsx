import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface InputProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  textInputConfig?: TextInputProps;
  invalid: boolean,
}

export default function Input({ label, style, textInputConfig, invalid }: InputProps) {
  let inputStyles: StyleProp<ViewStyle> = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput)
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
        placeholderTextColor={GlobalStyles.colors.gray200}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary400,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary400,
    color: GlobalStyles.colors.primary50,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});
