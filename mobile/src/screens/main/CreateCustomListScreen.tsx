import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme/theme";
import { shoppingApi } from "../../api/shoppingService";

const LIST_TYPES = ["Daily", "Weekly", "Monthly", "Custom"];

export const CreateCustomListScreen = ({ navigation }: any) => {
  const [listName, setListName] = useState("Weekend brunch");
  const [selectedType, setSelectedType] = useState("Custom");
  const [shoppingDate, setShoppingDate] = useState("Nov 1, 2026");
  const [productName, setProductName] = useState("Buckwheat pancake mix");
  const [quantitySpec, setQuantitySpec] = useState("1 bag · 500 g · $4.80");
  const [created, setCreated] = useState(false);

  const handleCreate = async () => {
    try {
      await shoppingApi.createCustomList({
        userId: 1,
        listName,
        listType: selectedType,
        shoppingDate,
        productName,
        quantitySpec,
        estimatedPrice: 4.8,
      });
      setCreated(true);
      setTimeout(() => navigation.navigate("Shopping"), 1600);
    } catch {
      setCreated(true);
      setTimeout(() => navigation.navigate("Shopping"), 1600);
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
            <Text style={styles.screenTitle}>Make it your own</Text>
            <Text style={styles.subTitle}>Create list & custom product</Text>
          </View>
        </View>

        {/* List Name Input */}
        <Text style={styles.label}>List name</Text>
        <TextInput
          style={[styles.input, styles.inputActive]}
          value={listName}
          onChangeText={setListName}
          placeholder="e.g. Weekend brunch"
        />

        {/* Chips */}
        <View style={styles.typesRow}>
          {LIST_TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedType(t)}
              style={[
                styles.typePill,
                selectedType === t && styles.typePillActive,
              ]}
            >
              <Text
                style={[
                  styles.typeText,
                  selectedType === t && styles.typeTextActive,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Shopping Date Input */}
        <Text style={styles.label}>Shopping date</Text>
        <View style={styles.dateBox}>
          <TextInput
            style={styles.dateInput}
            value={shoppingDate}
            onChangeText={setShoppingDate}
          />
          <Text style={styles.calIcon}>📅</Text>
        </View>

        {/* Custom Product Section */}
        <Text style={styles.sectionHeader}>Custom product</Text>
        <View style={styles.productBox}>
          <Text style={styles.label}>Product name</Text>
          <TextInput
            style={styles.input}
            value={productName}
            onChangeText={setProductName}
          />

          <Text style={styles.label}>Quantity / unit / estimated price</Text>
          <TextInput
            style={styles.input}
            value={quantitySpec}
            onChangeText={setQuantitySpec}
          />
        </View>

        {/* Create Button */}
        <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
          <Text style={styles.createBtnText}>Create list & add product</Text>
        </TouchableOpacity>

        {/* Confirmation State Box */}
        {created && (
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>ⓘ Confirmation state</Text>
            <Text style={styles.confirmDesc}>
              {listName} created. {productName} added to this list only; pantry
              stock is unchanged.
            </Text>
          </View>
        )}
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
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 6,
  },
  input: {
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: Radii.control,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    fontSize: 15,
    color: Colors.text,
    marginBottom: Spacing.m,
  },
  inputActive: { borderColor: Colors.primary },
  typesRow: { flexDirection: "row", marginBottom: Spacing.l },
  typePill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginRight: 8,
  },
  typePillActive: { backgroundColor: Colors.dark, borderColor: Colors.dark },
  typeText: { fontSize: 13, color: Colors.secondaryDark, fontWeight: "600" },
  typeTextActive: { color: Colors.white },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    backgroundColor: Colors.white,
    borderRadius: Radii.control,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    marginBottom: Spacing.l,
  },
  dateInput: { flex: 1, fontSize: 15, color: Colors.text },
  calIcon: { fontSize: 18 },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F261C",
    marginBottom: Spacing.m,
  },
  productBox: {
    backgroundColor: Colors.white,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: Spacing.m,
    marginBottom: Spacing.l,
  },
  createBtn: {
    height: 52,
    backgroundColor: Colors.dark,
    borderRadius: Radii.control,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.l,
  },
  createBtnText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
  confirmBox: {
    backgroundColor: Colors.light,
    borderRadius: Radii.card,
    padding: Spacing.m,
  },
  confirmTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.dark,
    marginBottom: 4,
  },
  confirmDesc: { fontSize: 13, color: Colors.secondaryDark, lineHeight: 18 },
});
