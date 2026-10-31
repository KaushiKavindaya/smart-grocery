import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Colors, Spacing, Typography } from "../../theme/theme";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { authApi } from "../../api/authService";

export const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState("Alex Lee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.includes("@") || !email.includes(".")) {
      errs.email = "Enter a complete email, like alex@example.com.";
    }
    if (password.length < 8) {
      errs.password = "Use 8+ characters, a number and an uppercase letter.";
    }
    if (password !== confirmPassword) {
      errs.confirmPassword = "Passwords don't match. Enter the same password.";
    }
    if (!agreed) {
      errs.agreed = "You must agree to the Terms & Privacy Policy.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegister = async () => {
    setGeneralError("");
    if (!validate()) {
      setGeneralError("Please check the highlighted fields");
      return;
    }
    setLoading(true);
    try {
      await authApi.register({ fullName, email, password });
      navigation.replace("MainTabs");
    } catch (err: any) {
      if (err.response?.data?.message) {
        setGeneralError(err.response.data.message);
      } else if (err.message && err.message.includes("Network Error")) {
        setGeneralError(
          "Cannot connect to backend server. Make sure phone and PC are on the same Wi-Fi and the IP in client.ts is correct."
        );
      } else {
        setGeneralError(err.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>A fresh start</Text>
      <Text style={styles.subTitle}>Create your Smart Grocery account</Text>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>LESS WASTE STARTS WITH YOU</Text>
      </View>

      {generalError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.bannerTitle}>⚠️ {generalError}</Text>
          <Text style={styles.bannerSub}>
            Your account hasn't been created. Each message below explains how to
            correct the problem.
          </Text>
        </View>
      ) : null}

      <AppInput
        label="Full name"
        value={fullName}
        onChangeText={setFullName}
        placeholder="Alex Lee"
        error={errors.fullName}
      />

      <AppInput
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="alex.lee@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        error={errors.email}
        rightIcon={<Text>✉️</Text>}
      />

      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••••"
        isPassword
        error={errors.password}
        helperText={
          !errors.password
            ? "Use at least 8 characters, including a number and an uppercase letter."
            : undefined
        }
      />

      <AppInput
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="••••••••••"
        isPassword
        error={errors.confirmPassword}
      />

      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setAgreed(!agreed)}
      >
        <View style={[styles.checkbox, agreed && styles.checkboxActive]}>
          {agreed && <Text style={styles.checkMark}>✓</Text>}
        </View>
        <Text style={styles.termsText}>
          I agree to the Terms & Privacy Policy
        </Text>
      </TouchableOpacity>
      {errors.agreed && <Text style={styles.fieldError}>{errors.agreed}</Text>}

      <AppButton
        title="Create account"
        variant="primary"
        loading={loading}
        onPress={handleRegister}
        style={styles.actionBtn}
      />

      <AppButton
        title="Already have an account? Login"
        variant="secondary"
        onPress={() => navigation.navigate("Login")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  backButton: {
    marginBottom: Spacing.s,
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backArrow: {
    fontSize: 24,
    color: Colors.text,
  },
  title: {
    ...Typography.screenTitle,
    color: "#0F261C",
  },
  subTitle: {
    ...Typography.supporting,
    color: Colors.secondaryDark,
    marginBottom: Spacing.m,
  },
  badge: {
    backgroundColor: Colors.light,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: Spacing.l,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.dark,
    letterSpacing: 0.5,
  },
  errorBanner: {
    backgroundColor: "#FEE2E2",
    padding: Spacing.m,
    borderRadius: 14,
    marginBottom: Spacing.m,
  },
  bannerTitle: {
    fontWeight: "700",
    color: Colors.error,
    fontSize: 14,
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 12,
    color: "#991B1B",
    lineHeight: 17,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: Spacing.m,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.dark,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: Colors.dark,
  },
  checkMark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  termsText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: "500",
  },
  fieldError: {
    color: Colors.error,
    fontSize: 12,
    marginBottom: Spacing.s,
  },
  actionBtn: {
    marginBottom: Spacing.m,
  },
});
