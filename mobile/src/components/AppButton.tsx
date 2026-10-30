import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Colors, Radii, Spacing } from "../theme/theme";

type ButtonVariant = "primary" | "secondary" | "delete";

interface AppButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    if (disabled) return styles.disabledContainer;
    switch (variant) {
      case "secondary":
        return styles.secondaryContainer;
      case "delete":
        return styles.deleteContainer;
      default:
        return styles.primaryContainer;
    }
  };

  const getTextStyle = () => {
    if (disabled) return styles.disabledText;
    switch (variant) {
      case "secondary":
        return styles.secondaryText;
      case "delete":
        return styles.deleteText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.base, getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" ? Colors.white : Colors.dark}
        />
      ) : (
        <Text style={[styles.baseText, getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.l,
    width: "100%",
  },
  baseText: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryContainer: {
    backgroundColor: Colors.dark,
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryContainer: {
    backgroundColor: Colors.light,
  },
  secondaryText: {
    color: Colors.dark,
  },
  deleteContainer: {
    backgroundColor: "#FEE2E2",
  },
  deleteText: {
    color: Colors.error,
  },
  disabledContainer: {
    backgroundColor: "#DDE5E0",
  },
  disabledText: {
    color: "#9CA3AF",
  },
});
