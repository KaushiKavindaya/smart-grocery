import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "../theme/theme";

import { SplashScreen } from "../screens/auth/SplashScreen";
import { OnboardingScreen } from "../screens/auth/OnboardingScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { ForgotPasswordScreen } from "../screens/auth/ForgotPasswordScreen";

import { HomeScreen } from "../screens/main/HomeScreen";
import { InsightsScreen } from "../screens/main/InsightsScreen";

import { ShoppingListsScreen } from "../screens/main/ShoppingListsScreen";
import { ShoppingListDetailScreen } from "../screens/main/ShoppingListDetailScreen";
import { AddShoppingItemScreen } from "../screens/main/AddShoppingItemScreen";
import { EditShoppingItemScreen } from "../screens/main/EditShoppingItemScreen";
import { ReviewPurchaseScreen } from "../screens/main/ReviewPurchaseScreen";
import { CreateCustomListScreen } from "../screens/main/CreateCustomListScreen";

import {
  PantryScreen,
  RecipesScreen,
  MoreScreen,
} from "../screens/main/MainTabs";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: Colors.secondary,
        tabBarStyle: {
          backgroundColor: Colors.white,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopColor: "#E5E7EB",
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Shopping"
        component={ShoppingListsScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🛒</Text>,
        }}
      />
      <Tab.Screen
        name="Pantry"
        component={PantryScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🥫</Text>,
        }}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipesScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🍳</Text>,
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>•••</Text>,
        }}
      />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="Insights" component={InsightsScreen} />

        {/* Shopping Stack */}
        <Stack.Screen
          name="ShoppingListDetail"
          component={ShoppingListDetailScreen}
        />
        <Stack.Screen
          name="AddShoppingItem"
          component={AddShoppingItemScreen}
        />
        <Stack.Screen
          name="EditShoppingItem"
          component={EditShoppingItemScreen}
        />
        <Stack.Screen name="ReviewPurchase" component={ReviewPurchaseScreen} />
        <Stack.Screen
          name="CreateCustomList"
          component={CreateCustomListScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
