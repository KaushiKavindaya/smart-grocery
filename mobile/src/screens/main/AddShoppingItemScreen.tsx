import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { shoppingApi } from "../../api/shoppingService";

export const AddShoppingItemScreen = ({ route, navigation }: any) => {
  const { listId, listTitle } = route.params || {
    listId: 1,
    listTitle: "Weekly essentials",
  };
  const [query, setQuery] = useState("Milk");
  const [activeTab, setActiveTab] = useState("All products");

  const handleAddItem = async (item: any) => {
    try {
      await shoppingApi.addItem(listId, item);
      navigation.goBack();
    } catch {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.screenTitle}>Add to your list</Text>
            <Text style={styles.subTitle}>{listTitle}</Text>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Search items..."
          />
          <Text style={styles.filterIcon}>⚙️</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          {["All products", "Recent", "Favorites"].map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[
                styles.tabPill,
                activeTab === tab && styles.tabPillActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.tabTextActive,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section Title */}
        <View style={styles.resultsHeader}>
          <Text style={styles.sectionTitle}>Find your everyday favorites</Text>
          <Text style={styles.resultsCount}>3 results</Text>
        </View>

        {/* Catalog Card */}
        <View style={styles.card}>
          {/* Result 1 */}
          <View style={styles.itemRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
              }}
              style={styles.thumb}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Milk</Text>
              <Text style={styles.itemMeta}>Organic whole milk · 1 L</Text>
              <Text style={styles.itemPrice}>$2.40 / carton · Dairy</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Already on your list</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Result 2 */}
          <View style={styles.itemRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
              }}
              style={styles.thumb}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Milk</Text>
              <Text style={styles.itemMeta}>Semi-skimmed milk · 1 L</Text>
              <Text style={styles.itemPrice}>$2.10 / carton · Dairy</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.addInlineBtn}
            onPress={() =>
              handleAddItem({
                name: "Semi-skimmed milk",
                category: "Dairy",
                price: 2.1,
              })
            }
          >
            <Text style={styles.addInlineText}>Add semi-skimmed milk</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Result 3 */}
          <View style={styles.itemRow}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
              }}
              style={styles.thumb}
            />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>Milk</Text>
              <Text style={styles.itemMeta}>Oat drink · 1 L</Text>
              <Text style={styles.itemPrice}>$2.90 / carton · Plant-based</Text>
            </View>
          </View>
        </View>

        <Text style={styles.footerPrompt}>
          Can't find the right product? Make it your own.
        </Text>
        <TouchableOpacity
          style={styles.customProductBtn}
          onPress={() => navigation.navigate("CreateCustomList")}
        >
          <Text style={styles.customProductText}>＋ Create custom product</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: {
    paddingHorizontal: Spacing.m,
    paddingTop: Spacing.xl + 10,
    paddingBottom: Spacing.xl,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  backBtn: { width: 36, height: 36, justifyContent: "center" },
  backArrow: { fontSize: 24, color: Colors.text },
  screenTitle: { ...Typography.screenTitle, fontSize: 22, color: "#0F261C" },
  subTitle: { fontSize: 13, color: Colors.secondaryDark },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: Radii.control,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    marginBottom: Spacing.m,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: Colors.text },
  filterIcon: { fontSize: 16 },
  tabsRow: { flexDirection: "row", marginBottom: Spacing.l },
  tabPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  tabPillActive: { backgroundColor: Colors.dark, borderColor: Colors.dark },
  tabText: { fontSize: 13, color: Colors.secondaryDark, fontWeight: "600" },
  tabTextActive: { color: Colors.white },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.s,
  },
  sectionTitle: { fontSize: 16, fontWeight: "700", color: Colors.text },
  resultsCount: { fontSize: 13, color: Colors.dark, fontWeight: "600" },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  itemRow: { flexDirection: "row" },
  thumb: { width: 56, height: 56, borderRadius: 12, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "700", color: Colors.text },
  itemMeta: { fontSize: 13, color: Colors.secondaryDark, marginTop: 2 },
  itemPrice: { fontSize: 13, color: Colors.secondaryDark, marginTop: 2 },
  badge: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radii.pill,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  badgeText: { fontSize: 11, fontWeight: "700", color: Colors.dark },
  divider: { height: 1, backgroundColor: "#F3F4F6", marginVertical: 12 },
  addInlineBtn: {
    backgroundColor: Colors.light,
    height: 42,
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  addInlineText: { color: Colors.dark, fontSize: 14, fontWeight: "700" },
  footerPrompt: {
    textAlign: "center",
    fontSize: 13,
    color: Colors.secondaryDark,
    marginBottom: Spacing.s,
  },
  customProductBtn: {
    height: 52,
    borderRadius: Radii.control,
    backgroundColor: Colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  customProductText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
});
