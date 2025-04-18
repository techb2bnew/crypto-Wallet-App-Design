import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { blackColor } from "../constants/Color";
import HomeStack from "./HomeStack";
import FavouriteStack from "./FavouriteStack";
import SignalStack from "./ SignalStack";
import WalletStack from "./WalletStack";
import ProfileStack from "./ ProfileStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const currentRoute = state.routes[state.index];
  const nestedRouteName = getFocusedRouteNameFromRoute(currentRoute) ?? currentRoute.name;

  const hideTabBarRoutes = ["AuthStack", "Login", "Register"];

  if (hideTabBarRoutes.includes(nestedRouteName)) {
    return null;
  }
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        // Define icons for each tab
        let iconName;
        if (route.name === "Home") iconName = "home-outline";
        else if (route.name === "Favorite") iconName = "bookmark-outline";
        else if (route.name === "Wallet") iconName = "wallet-outline";
        else if (route.name === "Profile") iconName = "person-outline";

        if (route.name === "Signal") {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate(route.name)}
              style={styles.signalButton}
            >
              <View style={styles.signalIcon}>
                <MaterialIcons name="grid-view" size={28} color="white" />
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={styles.tabButton}
          >
            <Icon name={iconName} size={24} color={isFocused ? "#4A5CF5" : blackColor} />
            <Text style={[styles.tabLabel, { color: isFocused ? "#4A5CF5" : blackColor }]}>
              {route.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorite" component={FavouriteStack} />
      <Tab.Screen name="Signal" component={SignalStack} />
      <Tab.Screen name="Wallet" component={WalletStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 1,
    left: 1,
    right: 1,
    height: 70,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // elevation: 5,
  },
  tabButton: {
    alignItems: "center",
  },
  signalButton: {
    position: "absolute",
    bottom: 40,
    left: "50%",
    marginLeft: -28,
    width: 58,
    height: 58,
    borderRadius: 25,
    backgroundColor: "#4A5CF5",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4A5CF5",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  signalIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#4A5CF5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    color: blackColor
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default BottomTabNavigator;
