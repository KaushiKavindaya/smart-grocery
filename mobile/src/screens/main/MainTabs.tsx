import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Typography, Spacing } from "../../theme/theme";

export const HomeScreen = () => (
  <View style={styles.center}>
    <Text style={Typography.screenTitle}>Home Dashboard</Text>
    <Text style={[Typography.body, { color: Colors.secondary, marginTop: 8 }]}>
      Ready for Phase 2: Inventory & Expiry Tracking
    </Text>
  </View>
);

export const ShoppingScreen = () => (
  <View style={styles.center}>
    <Text style={Typography.screenTitle}>Shopping Lists</Text>
  </View>
);

export const PantryScreen = () => (
  <View style={styles.center}>
    <Text style={Typography.screenTitle}>Pantry Inventory</Text>
  </View>
);

export const RecipesScreen = () => (
  <View style={styles.center}>
    <Text style={Typography.screenTitle}>Smart Recipes</Text>
  </View>
);

export const MoreScreen = () => (
  <View style={styles.center}>
    <Text style={Typography.screenTitle}>More & Settings</Text>
  </View>
);

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.l,
  },
});
