import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { apiClient } from "../../api/client";

export const HomeScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    userFullName: "Kaushi Kavindya",
    userInitials: "KK",
    inPantryCount: 24,
    useSoonCount: 3,
    expiredCount: 1,
    lowStockCount: 3,
    activeShoppingListName: "Weekly essentials",
    selectedShoppingItems: 3,
    totalShoppingItems: 6,
    shoppingItemsReadyCost: 9.2,
    nextShopSummary: "Monthly staples • Next shop Nov 1 • 4 items",
    budgetMonth: "October",
    budgetSpent: 286.8,
    budgetTotal: 400.0,
    budgetRemaining: 113.2,
  });

  const fetchDashboardData = async () => {
    try {
      // Connects to MySQL via backend for User ID 1
      const response = await apiClient.get("/dashboard/summary?userId=1");
      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (err) {
      console.log("Using default dashboard data:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  // Calculate percentages for progress bars
  const shoppingProgress =
    data.totalShoppingItems > 0
      ? (data.selectedShoppingItems / data.totalShoppingItems) * 100
      : 0;

  const budgetProgress =
    data.budgetTotal > 0 ? (data.budgetSpent / data.budgetTotal) * 100 : 0;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[Colors.primary]}
        />
      }
    >
      {/* 1. Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greetingTitle}>Good morning!</Text>
          <Text style={styles.dateSubtitle}>Friday, October 30, 2026</Text>
        </View>
        <TouchableOpacity style={styles.bellButton}>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* 2. User Row */}
      <View style={styles.userRow}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{data.userInitials}</Text>
        </View>
        <Text style={styles.userGreeting}>
          A little planning. A fresher day, {data.userFullName.split(" ")[0]}.
        </Text>
      </View>

      {/* 3. Four Metric Stats Cards (Connected to Database) */}
      <View style={styles.metricsRow}>
        <View style={[styles.metricCard, styles.whiteCard]}>
          <Text style={[styles.metricNumber, { color: Colors.primary }]}>
            {data.inPantryCount}
          </Text>
          <Text style={styles.metricLabel}>In pantry</Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: "#FEF3C7" }]}>
          <Text style={[styles.metricNumber, { color: "#B45309" }]}>
            {data.useSoonCount}
          </Text>
          <Text style={[styles.metricLabel, { color: "#92400E" }]}>
            Use soon
          </Text>
        </View>

        <View style={[styles.metricCard, { backgroundColor: "#FEE2E2" }]}>
          <Text style={[styles.metricNumber, { color: Colors.error }]}>
            {data.expiredCount}
          </Text>
          <Text style={[styles.metricLabel, { color: "#991B1B" }]}>
            Expired
          </Text>
        </View>

        <View style={[styles.metricCard, styles.whiteCard]}>
          <Text style={[styles.metricNumber, { color: Colors.dark }]}>
            {data.lowStockCount}
          </Text>
          <Text style={styles.metricLabel}>Low stock</Text>
        </View>
      </View>

      {/* 4. Green Hero Banner: Scan it. Save it. */}
      <View style={styles.heroBanner}>
        <View style={styles.heroLeft}>
          <View style={styles.heroTag}>
            <Text style={styles.heroTagText}>FRESHER FOR LONGER</Text>
          </View>
          <Text style={styles.heroTitle}>Scan it. Save it.</Text>
          <Text style={styles.heroSubtitle}>
            Catch expiry dates before they catch you.
          </Text>
          <TouchableOpacity
            style={styles.heroActionBtn}
            onPress={() => navigation.navigate("Pantry")}
          >
            <Text style={styles.heroActionText}>Scan expiry date →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.heroRight}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* 5. Today's Shopping Section (From Database) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today’s shopping</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Shopping")}>
          <Text style={styles.sectionLink}>View list</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{data.activeShoppingListName}</Text>
          <Text style={styles.cardSubtitleRight}>
            {data.selectedShoppingItems} of {data.totalShoppingItems} selected
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View
            style={[styles.progressBarFill, { width: `${shoppingProgress}%` }]}
          />
        </View>

        <View style={styles.shoppingItemRow}>
          <Text style={styles.itemText}>Milk, bread & eggs ready</Text>
          <Text style={styles.itemPrice}>
            ${Number(data.shoppingItemsReadyCost).toFixed(2)}
          </Text>
        </View>

        <View style={styles.cardDivider} />

        <Text style={styles.cardFooterText}>{data.nextShopSummary}</Text>
      </View>

      {/* 6. Budget Card (From Database) */}
      <View style={[styles.card, styles.lastCard]}>
        <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}>{data.budgetMonth} budget</Text>
          <Text style={styles.cardBoldRight}>
            ${Number(data.budgetSpent).toFixed(2)} / $
            {Number(data.budgetTotal).toFixed(0)}
          </Text>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${Math.min(budgetProgress, 100)}%` },
            ]}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Insights")}
          style={styles.budgetFooterLink}
        >
          <Text style={styles.budgetLinkText}>
            ${Number(data.budgetRemaining).toFixed(2)} left • Insights & fresh
            meal ideas →
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: Spacing.m,
    paddingTop: Spacing.xl + 10,
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  greetingTitle: {
    ...Typography.screenTitle,
    color: "#0F261C",
    fontWeight: "800",
  },
  dateSubtitle: {
    ...Typography.supporting,
    color: Colors.secondaryDark,
    marginTop: 2,
  },
  bellButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bellIcon: {
    fontSize: 20,
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.l,
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    color: Colors.dark,
    fontWeight: "700",
    fontSize: 14,
  },
  userGreeting: {
    ...Typography.body,
    color: Colors.secondaryDark,
    fontSize: 14,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.l,
  },
  metricCard: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: Radii.card,
    alignItems: "center",
    marginHorizontal: 4,
  },
  whiteCard: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 28,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.secondaryDark,
    marginTop: 4,
  },
  heroBanner: {
    backgroundColor: Colors.dark,
    borderRadius: Radii.hero,
    padding: Spacing.l,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.l,
  },
  heroLeft: {
    flex: 1,
    paddingRight: Spacing.s,
  },
  heroTag: {
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    alignSelf: "flex-start",
    marginBottom: Spacing.s,
  },
  heroTagText: {
    color: Colors.dark,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: Colors.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#D1FAE5",
    lineHeight: 18,
    marginBottom: Spacing.m,
  },
  heroActionBtn: {
    alignSelf: "flex-start",
  },
  heroActionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "700",
  },
  heroRight: {
    width: 100,
    height: 125,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: Colors.white,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.s,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F261C",
  },
  sectionLink: {
    color: Colors.dark,
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: Spacing.m,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: Spacing.m,
  },
  lastCard: {
    marginBottom: Spacing.l,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.s,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  cardSubtitleRight: {
    fontSize: 13,
    fontWeight: "600",
    color: Colors.text,
  },
  cardBoldRight: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.text,
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: Spacing.m,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  shoppingItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.s,
  },
  itemText: {
    fontSize: 14,
    color: Colors.text,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 8,
  },
  cardFooterText: {
    fontSize: 12,
    color: Colors.secondaryDark,
  },
  budgetFooterLink: {
    marginTop: 2,
  },
  budgetLinkText: {
    fontSize: 12,
    color: Colors.dark,
    fontWeight: "600",
  },
});
