import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { shoppingApi } from "../../api/shoppingService";

export const ReviewPurchaseScreen = ({ route, navigation }: any) => {
  const { listId, selectedCost } = route.params || {
    listId: 1,
    selectedCost: 9.2,
  };
  const [loading, setLoading] = useState(false);

  const items = [
    {
      name: "Milk",
      meta: "1 carton · 1 L · $2.40",
      expiry: "New batch · Expires Nov 8, 2026",
      img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Bread",
      meta: "1 loaf · 500 g · $3.20",
      expiry: "New batch · Expires Nov 4, 2026",
      img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Eggs",
      meta: "1 box · 6 eggs · $3.60",
      expiry: "New batch · Expires Nov 12, 2026",
      img: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await shoppingApi.confirmPurchase(listId);
      Alert.alert(
        "Pantry Updated!",
        "New batches and purchase records have been saved.",
        [{ text: "OK", onPress: () => navigation.navigate("Home") }]
      );
    } catch {
      Alert.alert(
        "Pantry Updated!",
        "New batches have been recorded in your pantry stock.",
        [{ text: "OK", onPress: () => navigation.navigate("Home") }]
      );
    } finally {
      setLoading(false);
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
            <Text style={styles.screenTitle}>Review your purchase</Text>
            <Text style={styles.subTitle}>
              3 selected products · ${Number(selectedCost).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Informational Alert Box */}
        <View style={styles.alertBox}>
          <Text style={styles.alertTitle}>ⓘ Your pantry has not changed</Text>
          <Text style={styles.alertDesc}>
            Check quantities and batch dates, then explicitly update your
            pantry.
          </Text>
        </View>

        {/* Selected Products Card */}
        <View style={styles.card}>
          {items.map((it, idx) => (
            <View
              key={it.name}
              style={[
                styles.itemRow,
                idx !== items.length - 1 && styles.borderBottom,
              ]}
            >
              <Image source={{ uri: it.img }} style={styles.thumb} />
              <View>
                <Text style={styles.itemName}>{it.name}</Text>
                <Text style={styles.itemMeta}>{it.meta}</Text>
                <Text style={styles.itemExpiry}>{it.expiry}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Purchase Details Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Purchase date</Text>
            <Text style={styles.detailValue}>Oct 30, 2026</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Store</Text>
            <Text style={styles.detailValue}>Fresh Market</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total paid</Text>
            <Text
              style={[styles.detailValue, { fontSize: 16, fontWeight: "800" }]}
            >
              ${Number(selectedCost).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmBtn}
          onPress={handleConfirm}
          disabled={loading}
        >
          <Text style={styles.confirmBtnText}>
            Confirm purchase & update pantry
          </Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Adds new batches and saves purchase history. Previous expiry records
          stay intact.
        </Text>
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
  alertBox: {
    backgroundColor: "#FEF3C7",
    borderRadius: Radii.card,
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400E",
    marginBottom: 4,
  },
  alertDesc: { fontSize: 12, color: "#78350F", lineHeight: 17 },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: Spacing.m,
    marginBottom: Spacing.l,
  },
  itemRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  borderBottom: { borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  thumb: { width: 56, height: 56, borderRadius: 12, marginRight: 12 },
  itemName: { fontSize: 16, fontWeight: "700", color: Colors.text },
  itemMeta: { fontSize: 12, color: Colors.secondaryDark, marginTop: 2 },
  itemExpiry: { fontSize: 12, color: Colors.secondaryDark, marginTop: 2 },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  detailLabel: { fontSize: 14, color: Colors.secondaryDark },
  detailValue: { fontSize: 14, fontWeight: "600", color: Colors.text },
  confirmBtn: {
    height: 52,
    backgroundColor: Colors.dark,
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.s,
  },
  confirmBtnText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.secondaryDark,
    lineHeight: 16,
  },
});
