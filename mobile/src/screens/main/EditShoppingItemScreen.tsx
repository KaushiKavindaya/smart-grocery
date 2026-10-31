import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { shoppingApi } from "../../api/shoppingService";

const UNITS = ["Carton", "Liter", "Milliliter"];

export const EditShoppingItemScreen = ({ route, navigation }: any) => {
  const { item, listTitle } = route.params;
  const [quantity, setQuantity] = useState(Number(item.quantity) || 1);
  const [selectedUnit, setSelectedUnit] = useState(item.unit || "Carton");
  const [price, setPrice] = useState(String(item.estimatedPrice || "2.40"));
  const [note, setNote] = useState(item.note || "Organic whole milk, please");

  const itemTotal = (quantity * (parseFloat(price) || 0)).toFixed(2);

  const handleSave = async () => {
    try {
      await shoppingApi.updateItem(item.id, {
        quantity,
        unit: selectedUnit,
        estimatedPrice: parseFloat(price) || 0,
        note,
      });
      navigation.goBack();
    } catch {
      navigation.goBack();
    }
  };

  const handleRemove = async () => {
    try {
      await shoppingApi.deleteItem(item.id);
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
            <Text style={styles.screenTitle}>Edit shopping item</Text>
            <Text style={styles.subTitle}>{listTitle}</Text>
          </View>
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <Image
            source={{
              uri:
                item.imageUrl ||
                "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80",
            }}
            style={styles.thumb}
          />
          <View>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productMeta}>Organic whole milk · Dairy</Text>
          </View>
        </View>

        {/* Quantity Stepper */}
        <Text style={styles.label}>Quantity</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
            style={styles.stepBtn}
          >
            <Text style={styles.stepBtnText}>－</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            onPress={() => setQuantity(quantity + 1)}
            style={styles.stepBtn}
          >
            <Text style={styles.stepBtnText}>＋</Text>
          </TouchableOpacity>
        </View>

        {/* Units */}
        <View style={styles.unitsRow}>
          {UNITS.map((u) => (
            <TouchableOpacity
              key={u}
              onPress={() => setSelectedUnit(u)}
              style={[
                styles.unitPill,
                selectedUnit === u && styles.unitPillActive,
              ]}
            >
              <Text
                style={[
                  styles.unitText,
                  selectedUnit === u && styles.unitTextActive,
                ]}
              >
                {u}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Price Input */}
        <Text style={styles.label}>Estimated unit price ($)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        {/* Note Input */}
        <Text style={styles.label}>Note (optional)</Text>
        <TextInput
          style={styles.input}
          value={note}
          onChangeText={setNote}
          placeholder="Add specific instructions..."
        />

        {/* Item Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated item total</Text>
          <Text style={styles.totalValue}>${itemTotal}</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Save changes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.removeBtn} onPress={handleRemove}>
          <Text style={styles.removeBtnText}>Remove from list</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Editing this list does not change your pantry stock.
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
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  thumb: { width: 56, height: 56, borderRadius: 12, marginRight: 12 },
  productName: { fontSize: 16, fontWeight: "700", color: Colors.text },
  productMeta: { fontSize: 13, color: Colors.secondaryDark, marginTop: 2 },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 8,
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.white,
    borderRadius: Radii.control,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 50,
    paddingHorizontal: 16,
    marginBottom: Spacing.m,
  },
  stepBtn: { padding: 8 },
  stepBtnText: { fontSize: 20, color: Colors.text, fontWeight: "bold" },
  quantityValue: { fontSize: 16, fontWeight: "700", color: Colors.text },
  unitsRow: { flexDirection: "row", marginBottom: Spacing.l },
  unitPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  unitPillActive: { backgroundColor: Colors.dark, borderColor: Colors.dark },
  unitText: { fontSize: 13, color: Colors.secondaryDark, fontWeight: "600" },
  unitTextActive: { color: Colors.white },
  input: {
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: Radii.control,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.text,
    marginBottom: Spacing.l,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.l,
  },
  totalLabel: { fontSize: 14, color: Colors.secondaryDark },
  totalValue: { fontSize: 17, fontWeight: "800", color: Colors.text },
  saveBtn: {
    height: 52,
    backgroundColor: Colors.dark,
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.s,
  },
  saveBtnText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
  removeBtn: {
    height: 52,
    backgroundColor: "#FEE2E2",
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.m,
  },
  removeBtnText: { color: Colors.error, fontSize: 15, fontWeight: "700" },
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    color: Colors.secondaryDark,
  },
});
