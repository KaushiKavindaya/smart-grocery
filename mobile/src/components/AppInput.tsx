import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { Colors, Radii, Spacing, Typography } from "../theme/theme";

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  isPassword?: boolean;
  rightIcon?: React.ReactNode;
}

export const AppInput: React.FC<AppInputProps> = ({
  label,
  error,
  helperText,
  isPassword = false,
  rightIcon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputFocused,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={Colors.secondary}
          secureTextEntry={secureText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setSecureText(!secureText)}
          >
            <Text style={styles.iconText}>{secureText ? "👁️" : "🔒"}</Text>
          </TouchableOpacity>
        ) : rightIcon ? (
          <View style={styles.iconBtn}>{rightIcon}</View>
        ) : null}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : helperText ? (
        <Text style={styles.helperText}>{helperText}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.m,
    width: "100%",
  },
  label: {
    ...Typography.supporting,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: Radii.control,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.m,
  },
  inputFocused: {
    borderColor: Colors.dark,
  },
  inputError: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    height: "100%",
    color: Colors.text,
    fontSize: 15,
  },
  iconBtn: {
    paddingLeft: Spacing.s,
  },
  iconText: {
    fontSize: 16,
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    color: Colors.secondary,
    fontSize: 12,
    marginTop: 4,
  },
});
