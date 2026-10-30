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

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("alex.lee@email.com");
  const [password, setPassword] = useState("Password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async () => {
    setErrorMsg("");
    if (!email || !password) {
      setErrorMsg("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      await authApi.login({ email, password });
      navigation.replace("MainTabs");
    } catch (err: any) {
      const serverMessage =
        err?.response?.data?.message ||
        "Email or password is incorrect. Check your details or reset your password.";
      setErrorMsg(serverMessage);
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

      <Text style={styles.title}>Welcome back</Text>
      <Text style={styles.subTitle}>Your fresher everyday is waiting</Text>

      <View style={styles.banner}>
        <Text style={styles.bannerIcon}>🌱</Text>
        <Text style={styles.bannerText}>
          A well-stocked kitchen. A little less on your mind.
        </Text>
      </View>

      {errorMsg ? (
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Login error</Text>
          <Text style={styles.errorDescription}>{errorMsg}</Text>
        </View>
      ) : null}

      <AppInput
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="alex.lee@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        rightIcon={<Text>✉️</Text>}
      />

      <AppInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••••"
        isPassword
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setRememberMe(!rememberMe)}
        >
          <View
            style={[styles.checkbox, rememberMe && styles.checkboxSelected]}
          >
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <AppButton
        title="Login"
        variant="primary"
        loading={loading}
        onPress={handleLogin}
        style={styles.actionBtn}
      />

      <Text style={styles.centerNote}>New to a smarter kitchen?</Text>

      <AppButton
        title="Create account"
        variant="secondary"
        onPress={() => navigation.navigate("Register")}
        style={styles.actionBtn}
      />

      <Text style={styles.legalNotice}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
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
  banner: {
    backgroundColor: Colors.light,
    borderRadius: 16,
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  bannerIcon: {
    fontSize: 22,
    marginBottom: 6,
  },
  bannerText: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
    lineHeight: 22,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.l,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Colors.dark,
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: Colors.dark,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  checkboxLabel: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: "500",
  },
  forgotText: {
    fontSize: 13,
    color: Colors.dark,
    fontWeight: "600",
  },
  actionBtn: {
    marginBottom: Spacing.m,
  },
  centerNote: {
    textAlign: "center",
    color: Colors.secondaryDark,
    marginVertical: Spacing.s,
    fontSize: 13,
  },
  legalNotice: {
    textAlign: "center",
    fontSize: 11,
    color: Colors.secondary,
    lineHeight: 16,
    marginTop: Spacing.m,
  },
  errorBox: {
    backgroundColor: "#FEF3C7",
    padding: Spacing.m,
    borderRadius: 12,
    marginBottom: Spacing.m,
  },
  errorTitle: {
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 2,
  },
  errorDescription: {
    fontSize: 12,
    color: "#78350F",
  },
});
