import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, Spacing, Typography } from "../../theme/theme";

export const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Onboarding");
    }, 2200);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topContent}>
        <View style={styles.logoBadge}>
          <Text style={styles.sproutIcon}>🌱</Text>
        </View>
        <Text style={styles.title}>Smart Grocery</Text>
        <Text style={styles.subtitle}>
          Plan smarter. Shop better. Waste less.
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
          }}
          style={styles.heroImage}
        />
      </View>

      <Text style={styles.footerNote}>
        A little care for your kitchen. A little less waste for the world.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.l,
    paddingVertical: Spacing.xxl,
    justifyContent: "space-between",
    alignItems: "center",
  },
  topContent: {
    alignItems: "center",
    marginTop: Spacing.xl,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.dark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.m,
  },
  sproutIcon: {
    fontSize: 30,
  },
  title: {
    ...Typography.screenTitle,
    color: "#0F261C",
    fontWeight: "800",
    marginBottom: Spacing.s,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.dark,
    fontWeight: "600",
  },
  imageContainer: {
    width: "100%",
    height: 330,
    borderRadius: 24,
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  footerNote: {
    ...Typography.supporting,
    color: Colors.secondaryDark,
    textAlign: "center",
    marginBottom: Spacing.s,
  },
});
