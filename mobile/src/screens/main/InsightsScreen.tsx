import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";

export const InsightsScreen = ({ navigation }: any) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* 1. Header with Back Button */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.screenTitle}>Your fresh outlook</Text>
          <Text style={styles.subTitle}>Insights • October 30</Text>
        </View>
      </View>

      {/* 2. Section: A Smarter Next Shop */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>A smarter next shop</Text>
        <TouchableOpacity>
          <Text style={styles.sectionLink}>All suggestions</Text>
        </TouchableOpacity>
      </View>

      {/* Suggestions Container Card */}
      <View style={styles.suggestionsCard}>
        {/* Item 1: Milk */}
        <View style={styles.suggestionRow}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
            }}
            style={styles.thumbImage}
          />
          <View style={styles.suggestionContent}>
            <Text style={styles.itemTitle}>Milk</Text>
            <Text style={styles.itemDetail}>Running low • 1 carton left</Text>
            <Text style={styles.itemPattern}>
              Daily pattern • Add 1 carton for tomorrow
            </Text>
            <View style={styles.recommendBadge}>
              <Text style={styles.recommendBadgeText}>
                Recommended purchase
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Item 2: Spinach */}
        <View style={styles.suggestionRow}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=300&q=80",
            }}
            style={styles.thumbImage}
          />
          <View style={styles.suggestionContent}>
            <Text style={styles.itemTitle}>Spinach</Text>
            <Text style={styles.itemDetail}>Use soon • 120 g • Oct 31</Text>
            <Text style={styles.itemPattern}>
              Make tonight’s skillet to avoid waste
            </Text>
          </View>
        </View>
      </View>

      {/* 3. Recipe Card */}
      <View style={styles.recipeCard}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
          }}
          style={styles.recipeImage}
        />
        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>Spinach & tomato skillet</Text>
          <Text style={styles.recipeMeta}>20 min • Easy • $1.40 / serving</Text>
          <Text style={styles.recipeStock}>3 available • 1 missing</Text>
        </View>
      </View>

      {/* 4. October Spending Bar Chart Card */}
      <View style={styles.spendingCard}>
        <View style={styles.spendingHeader}>
          <Text style={styles.spendingTitle}>October spending</Text>
          <Text style={styles.spendingAmount}>$286.80</Text>
        </View>

        {/* Bars */}
        <View style={styles.chartContainer}>
          <View style={styles.barColumn}>
            <Text style={styles.barValue}>$74.2</Text>
            <View style={[styles.bar, { height: 48 }]} />
            <Text style={styles.barLabel}>W1</Text>
          </View>

          <View style={styles.barColumn}>
            <Text style={styles.barValue}>$68.5</Text>
            <View style={[styles.bar, { height: 42 }]} />
            <Text style={styles.barLabel}>W2</Text>
          </View>

          <View style={styles.barColumn}>
            <Text style={styles.barValue}>$81.7</Text>
            <View style={[styles.bar, { height: 56 }]} />
            <Text style={styles.barLabel}>W3</Text>
          </View>

          <View style={styles.barColumn}>
            <Text style={styles.barValue}>$62.4</Text>
            <View style={[styles.bar, { height: 38 }]} />
            <Text style={styles.barLabel}>W4</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.overviewRow}>
          <Text style={styles.overviewLabel}>Shopping overview</Text>
          <Text style={styles.overviewValue}>3 lists • 14 / 22 done</Text>
        </View>
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.l,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginRight: 6,
  },
  backArrow: {
    fontSize: 24,
    color: Colors.text,
  },
  screenTitle: {
    ...Typography.screenTitle,
    fontSize: 22,
    color: "#0F261C",
  },
  subTitle: {
    fontSize: 12,
    color: Colors.secondaryDark,
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
    fontSize: 13,
    fontWeight: "600",
  },
  suggestionsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: Spacing.m,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: Spacing.l,
  },
  suggestionRow: {
    flexDirection: "row",
  },
  thumbImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: Spacing.m,
  },
  suggestionContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  itemDetail: {
    fontSize: 12,
    color: Colors.secondaryDark,
    marginTop: 2,
  },
  itemPattern: {
    fontSize: 12,
    color: Colors.secondaryDark,
    marginTop: 2,
  },
  recommendBadge: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  recommendBadgeText: {
    color: Colors.dark,
    fontSize: 11,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: Spacing.m,
  },
  recipeCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: Spacing.l,
  },
  recipeImage: {
    width: "100%",
    height: 140,
  },
  recipeContent: {
    padding: Spacing.m,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  recipeMeta: {
    fontSize: 12,
    color: Colors.secondaryDark,
    marginBottom: 6,
  },
  recipeStock: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.dark,
  },
  spendingCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: Spacing.m,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  spendingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  spendingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  spendingAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.dark,
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 90,
    marginBottom: Spacing.m,
  },
  barColumn: {
    alignItems: "center",
  },
  barValue: {
    fontSize: 11,
    color: Colors.secondaryDark,
    marginBottom: 4,
  },
  bar: {
    width: 38,
    backgroundColor: Colors.primary,
    borderRadius: 6,
  },
  barLabel: {
    fontSize: 11,
    color: Colors.secondaryDark,
    marginTop: 6,
  },
  overviewRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  overviewLabel: {
    fontSize: 13,
    color: Colors.secondaryDark,
  },
  overviewValue: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
  },
});
