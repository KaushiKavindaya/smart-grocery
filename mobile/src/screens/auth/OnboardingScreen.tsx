import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { Colors, Spacing, Typography } from "../../theme/theme";
import { AppButton } from "../../components/AppButton";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    step: "01 / A LITTLE MORE ORGANIZED",
    title: "Organize Your\nGroceries",
    desc: "Daily top-ups, weekly essentials, monthly staples. Keep every list and category in one calm place.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
    headerSub: "A fresher everyday starts here",
  },
  {
    id: "2",
    step: "02 / KEEP FRESHNESS IN FOCUS",
    title: "Never Miss an Expiry\nDate",
    desc: "Scan the packaging, review the date and get a helpful reminder before good food goes to waste.",
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=700&q=80",
    headerSub: "Less guessing. More peace of mind.",
  },
  {
    id: "3",
    step: "03 / FROM PANTRY TO PLATE",
    title: "Discover Meals with\nWhat You Have",
    desc: "Turn fresh pantry ingredients into something delicious. Use what’s on hand, and shop only for what’s missing.",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
    headerSub: "Your next great meal is closer than you think",
  },
];

export const OnboardingScreen = ({ navigation }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(
      event.nativeEvent.contentOffset.x / SCREEN_WIDTH
    );
    if (
      slideIndex !== currentIndex &&
      slideIndex >= 0 &&
      slideIndex < SLIDES.length
    ) {
      setCurrentIndex(slideIndex);
    }
  };

  const handleGetStarted = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate("Register");
    }
  };

  const renderSlide = ({ item }: { item: (typeof SLIDES)[0] }) => {
    return (
      <View style={styles.slideContainer}>
        <View style={styles.header}>
          <Text style={styles.brandTitle}>Smart Grocery</Text>
          <Text style={styles.brandSub}>{item.headerSub}</Text>
        </View>

        <View style={styles.imageCard}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepText}>{item.step}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.desc}>{item.desc}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        bounces={false}
      />

      <View style={styles.footer}>
        {/* Dynamic Indicator dots */}
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonGroup}>
          <AppButton
            title="Get Started"
            variant="primary"
            onPress={handleGetStarted}
            style={styles.mb}
          />
          <AppButton
            title="Login"
            variant="secondary"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slideContainer: {
    width: SCREEN_WIDTH,
    paddingHorizontal: Spacing.l,
    paddingTop: Spacing.xl + 10,
    justifyContent: "flex-start",
  },
  header: {
    marginBottom: Spacing.m,
  },
  brandTitle: {
    ...Typography.heading,
    fontWeight: "700",
    color: "#0F261C",
  },
  brandSub: {
    ...Typography.supporting,
    color: Colors.secondaryDark,
    marginTop: 2,
  },
  imageCard: {
    width: "100%",
    height: 250,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    marginTop: Spacing.m,
  },
  stepBadge: {
    backgroundColor: Colors.light,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginBottom: Spacing.s,
  },
  stepText: {
    color: Colors.dark,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  title: {
    ...Typography.screenTitle,
    color: "#111827",
    marginBottom: Spacing.s,
  },
  desc: {
    ...Typography.body,
    color: Colors.secondaryDark,
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: Spacing.l,
    paddingBottom: Spacing.l,
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.l,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  activeDot: {
    width: 22,
    backgroundColor: Colors.dark,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: "#D1D5DB",
  },
  buttonGroup: {
    width: "100%",
  },
  mb: {
    marginBottom: Spacing.s,
  },
});
