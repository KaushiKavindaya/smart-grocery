import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Spacing, Typography } from "../../theme/theme";
import { AppButton } from "../../components/AppButton";
import { AppInput } from "../../components/AppInput";
import { authApi } from "../../api/authService";

export const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("alex.lee@email.com");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      await authApi.forgotPassword({ email });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Let’s get you back in</Text>
      <Text style={styles.subTitle}>Reset your password securely</Text>

      <Text style={styles.desc}>
        Enter your account email. We’ll send instructions to help you choose a
        new password.
      </Text>

      <AppInput
        label="Email address"
        value={email}
        onChangeText={setEmail}
        placeholder="alex.lee@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        rightIcon={<Text>✉️</Text>}
      />

      <AppButton
        title="Send reset email"
        variant="primary"
        loading={loading}
        onPress={handleSend}
        style={styles.mb}
      />

      {sent && (
        <View style={styles.inboxCard}>
          <Text style={styles.mailIcon}>📩</Text>
          <Text style={styles.cardTitle}>Check your inbox</Text>
          <Text style={styles.cardDesc}>
            If an account exists for {email}, a reset email is on its way. Check
            spam too. The link expires after 30 minutes.
          </Text>
          <Text style={styles.resendText}>
            Resend available in 00:45 • Use a different email
          </Text>
        </View>
      )}

      <View style={styles.bottomWrapper}>
        <AppButton
          title="Back to Login"
          variant="secondary"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: Spacing.l,
  },
  desc: {
    ...Typography.body,
    color: Colors.secondaryDark,
    marginBottom: Spacing.l,
    lineHeight: 20,
  },
  mb: {
    marginBottom: Spacing.l,
  },
  inboxCard: {
    backgroundColor: Colors.light,
    borderRadius: 16,
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  mailIcon: {
    fontSize: 24,
    marginBottom: 6,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.text,
    marginBottom: 4,
  },
  cardDesc: {
    ...Typography.body,
    color: Colors.secondaryDark,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },
  resendText: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: "600",
  },
  bottomWrapper: {
    marginTop: "auto",
  },
});
