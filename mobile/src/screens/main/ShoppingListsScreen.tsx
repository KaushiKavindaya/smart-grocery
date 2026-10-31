import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { shoppingApi } from "../../api/shoppingService";

const FILTERS = ["Daily", "Weekly", "Monthly", "Custom"];

export const ShoppingListsScreen = ({ navigation }: any) => {
  const [activeFilter, setActiveFilter] = useState("Weekly");
  const [lists, setLists] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadLists = async (filter: string) => {
    try {
      const data = await shoppingApi.getLists(filter);
      setLists(data);
    } catch {
      // Fallback dummy data if backend is offline
      setLists([
        {
          id: 1,
          title: "Weekly essentials",
          storeName: "Fresh Market",
          scheduledDate: "Today",
          totalCost: 19.1,
          totalItems: 6,
          selectedItems: 3,
        },
        {
          id: 2,
          title: "Daily top-up",
          storeName: "Local store",
          scheduledDate: "Tomorrow",
          totalCost: 7.8,
          totalItems: 3,
          selectedItems: 2,
        },
        {
          id: 3,
          title: "Monthly staples",
          storeName: "Supermarket",
          scheduledDate: "Next shop · Nov 1",
          totalCost: 64.5,
          totalItems: 13,
          selectedItems: 9,
        },
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLists(activeFilter);
  }, [activeFilter]);

  const onRefresh = () => {
    setRefreshing(true);
    loadLists(activeFilter);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.primary]}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.screenTitle}>Your shopping lists</Text>
            <Text style={styles.subTitle}>A place for every grocery run</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateCustomList")}
          >
            <Text style={styles.addIcon}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <View style={styles.filtersRow}>
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setActiveFilter(f)}
              style={[
                styles.filterPill,
                activeFilter === f && styles.filterPillActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Motivational Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Shop with a little more intention.
          </Text>
          <Text style={styles.bannerDesc}>
            Shared lists, fewer forgotten items and just what your pantry needs.
          </Text>
        </View>

        {/* Lists */}
        {lists.map((item) => {
          const progress =
            item.totalItems > 0
              ? (item.selectedItems / item.totalItems) * 100
              : 0;
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("ShoppingListDetail", { listId: item.id })
              }
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardMeta}>
                  {item.scheduledDate} · {item.storeName}
                </Text>
                <Text style={styles.cardCost}>
                  ${Number(item.totalCost).toFixed(2)}
                </Text>
              </View>

              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardProgressLabel}>
                {item.selectedItems} of {item.totalItems}{" "}
                {item.id === 1 ? "selected" : "purchased"}
              </Text>

              {/* Progress Bar */}
              <View style={styles.track}>
                <View style={[styles.bar, { width: `${progress}%` }]} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Floating Create Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("CreateCustomList")}
        >
          <Text style={styles.createBtnText}>＋ Create a shopping list</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: {
    paddingHorizontal: Spacing.m,
    paddingTop: Spacing.xl + 10,
    paddingBottom: 90,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.m,
  },
  screenTitle: { ...Typography.screenTitle, color: "#0F261C" },
  subTitle: { fontSize: 13, color: Colors.secondaryDark, marginTop: 2 },
  addIcon: { fontSize: 26, color: Colors.dark, fontWeight: "600" },
  filtersRow: { flexDirection: "row", marginBottom: Spacing.l },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  filterPillActive: { backgroundColor: Colors.dark, borderColor: Colors.dark },
  filterText: { fontSize: 13, color: Colors.secondaryDark, fontWeight: "600" },
  filterTextActive: { color: Colors.white },
  banner: {
    backgroundColor: Colors.light,
    borderRadius: Radii.card,
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F261C",
    marginBottom: 6,
  },
  bannerDesc: { fontSize: 13, color: Colors.secondaryDark, lineHeight: 18 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    padding: Spacing.m,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: Spacing.m,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  cardMeta: { fontSize: 13, color: Colors.secondaryDark },
  cardCost: { fontSize: 15, fontWeight: "700", color: Colors.text },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 8,
  },
  cardProgressLabel: {
    fontSize: 12,
    color: Colors.secondaryDark,
    marginBottom: 6,
  },
  track: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  bar: { height: "100%", backgroundColor: Colors.primary, borderRadius: 3 },
  bottomBar: {
    position: "absolute",
    bottom: 12,
    left: Spacing.m,
    right: Spacing.m,
  },
  createBtn: {
    backgroundColor: Colors.dark,
    height: 52,
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
  },
  createBtnText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
});
