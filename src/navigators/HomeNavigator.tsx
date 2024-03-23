import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TopBar } from "../components/top-bar/top-bar-feature";
import { HomeScreen } from "../screens/HomeScreen";
import MaterialCommunityIcon from "@expo/vector-icons/MaterialCommunityIcons";
import { useTheme } from "react-native-paper";
import BlankScreen from "../screens/BlankScreen";
import ProfileScreen from "../screens/PersonalScreen";
import RewardsScreen from "../screens/RewardsScreen ";
import ChiTietScreen from "../screens/ChiTietScreen";

const Tab = createBottomTabNavigator();

/**
 * This is the main navigator with a bottom tab bar.
 * Each tab is a stack navigator with its own set of screens.
 *
 * More info: https://reactnavigation.org/docs/bottom-tab-navigator/
 */
export function HomeNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <TopBar />,
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <MaterialCommunityIcon
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            case "Task":
              return (
                <MaterialCommunityIcon
                  name={
                    focused ? "application-edit" : "application-edit-outline"
                  }
                  size={size}
                  color={color}
                />
              );

              case "Điểm thưởng":
              return (
                <MaterialCommunityIcon
                  name={
                    focused ? "star" : "star-circle-outline"
                  }
                  size={size}
                  color={color}
                />
              );

              case "Profile":
              return (
                <MaterialCommunityIcon
                  name={
                    focused ? "account" : "account-circle"
                  }
                  size={size}
                  color={color}
                />
              );
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Task" component={BlankScreen} />
      <Tab.Screen name="Điểm thưởng" component={RewardsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      
    </Tab.Navigator>
  );
}
