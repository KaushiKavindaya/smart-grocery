import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { shoppingApi } from "../../api/shoppingService";

export const ShoppingListDetailScreen = ({ route, navigation }: any) => {
  const listId = route.params?.listId || 1;
  const [details, setDetails] = useState<any>(null);

  const loadDetails = async () => {
    try {
      const data = await shoppingApi.getListDetails(listId);
      setDetails(data);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    loadDetails();
  }, [listId]);

  const toggleCheck = async (itemId: number) => {
    // Optimistic UI update
    const updatedItems = details.items.map((i: any) =>
      i.id === itemId ? { ...i, isPurchased: !i.isPurchased } : i
    );
    const selected = updatedItems.filter((i: any) => i.isPurchased);
    const selectedTotal = selected.reduce(
      (sum: number, i: any) => sum + Number(i.estimatedPrice),
      0
    );

    setDetails({
      ...details,
      items: updatedItems,
      selectedItems: selected.length,
      selectedCost: selectedTotal,
    });

    try {
      await shoppingApi.toggleItem(itemId);
    } catch {
      loadDetails();
    }
  };

  if (!details) return null;

  const progress =
    details.totalItems > 0
      ? (details.selectedItems / details.totalItems) * 100
      : 0;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.screenTitle}>{details.title}</Text>
            <Text style={styles.subTitle}>
              {details.storeName} · {details.sharedWith}
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.moreIcon}>•••</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Info */}
        <Text style={styles.progressLabel}>
          {details.selectedItems} of {details.totalItems} selected · Not
          purchased yet
        </Text>
        <View style={styles.track}>
          <View style={[styles.bar, { width: `${progress}%` }]} />
        </View>

        {/* Items Container Card */}
        <View style={styles.itemsCard}>
          {details.items.map((item: any, idx: number) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.itemRow,
                idx !== details.items.length - 1 && styles.borderBottom,
              ]}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate("EditShoppingItem", {
                  item,
                  listTitle: details.title,
                })
              }
            >
              <Image
                source={{
                  uri:
                    item.imageUrl ||
                    "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
                }}
                style={styles.thumb}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemMeta}>
                  {item.quantity} {item.unit} · {item.specification}
                </Text>
              </View>
              <Text style={styles.itemPrice}>
                ${Number(item.estimatedPrice).toFixed(2)}
              </Text>

              {/* Checkbox */}
              <TouchableOpacity
                onPress={() => toggleCheck(item.id)}
                style={[
                  styles.checkbox,
                  item.isPurchased && styles.checkboxActive,
                ]}
              >
                {item.isPurchased && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Total Summary */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>
            Estimated total · {details.totalItems} items
          </Text>
          <Text style={styles.summaryTotal}>
            ${Number(details.totalCost).toFixed(2)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity
            style={styles.addItemBtn}
            onPress={() =>
              navigation.navigate("AddShoppingItem", {
                listId: details.id,
                listTitle: details.title,
              })
            }
          >
            <Text style={styles.addItemText}>＋ Add item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reviewBtn}
            onPress={() =>
              navigation.navigate("ReviewPurchase", {
                listId: details.id,
                selectedCost: details.selectedCost,
                selectedItems: details.items.filter((i: any) => i.isPurchased),
              })
            }
          >
            <Text style={styles.reviewText}>
              Review · ${Number(details.selectedCost).toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Smart suggestion hint */}
        <TouchableOpacity style={styles.suggestionBanner}>
          <Text style={styles.suggestionText}>
            Smart suggestion: Milk tomorrow · daily purchase pattern →
          </Text>
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
  moreIcon: { fontSize: 20, color: Colors.dark, fontWeight: "bold" },
  progressLabel: { fontSize: 13, color: Colors.secondaryDark, marginBottom: 8 },
  track: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: Spacing.l,
  },
  bar: { height: "100%", backgroundColor: Colors.primary, borderRadius: 3 },
  itemsCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: Spacing.m,
    marginBottom: Spacing.l,
  },
  itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  thumb: { width: 48, height: 48, borderRadius: 10, marginRight: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 15, fontWeight: "700", color: Colors.text },
  itemMeta: { fontSize: 12, color: Colors.secondaryDark, marginTop: 2 },
  itemPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
    marginRight: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  checkmark: { color: Colors.white, fontSize: 14, fontWeight: "bold" },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.l,
  },
  summaryLabel: { fontSize: 14, color: Colors.secondaryDark },
  summaryTotal: { fontSize: 16, fontWeight: "800", color: Colors.text },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Spacing.l,
  },
  addItemBtn: {
    flex: 1,
    height: 50,
    borderRadius: Radii.control,
    backgroundColor: Colors.light,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addItemText: { color: Colors.dark, fontSize: 15, fontWeight: "700" },
  reviewBtn: {
    flex: 1.2,
    height: 50,
    borderRadius: Radii.control,
    backgroundColor: Colors.dark,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
  suggestionBanner: { alignItems: "center", marginVertical: Spacing.s },
  suggestionText: { fontSize: 12, color: Colors.dark, fontWeight: "600" },
});
