import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import Categories from "./Categories";
import Questions from "./Questions";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.greetingSmall}>Hi, plant lover! </Text>
      <Text style={styles.greeting}>Good Afternoon! ⛅</Text>
      <TextInput style={styles.searchBar} placeholder="Search for plants" />
      <TouchableOpacity
        style={styles.promotionBanner}
        onPress={() => {
          router.push("/paywall");
        }}
      >
        <FontAwesome
          style={styles.envelope}
          name="envelope"
          size={30}
          color="#e5c990"
        />
        <View>
          <Text style={styles.promotionTextUpper}>FREE Premium Available</Text>
          <Text style={styles.promotionTextLower}>
            Tap to upgrade your account!
          </Text>
        </View>
        <MaterialIcons
          style={styles.nextArrow}
          name="navigate-next"
          size={30}
          color="#e5c990"
        />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Get Started</Text>
      <Questions />
      <Categories />
    </ScrollView>
  );
}

function DiagnoseScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Diagnose Screen</Text>
    </View>
  );
}

function GardenScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>My Garden Screen</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.screenContainer}>
      <Text>Profile Screen</Text>
    </View>
  );
}

export default function HomePage() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") iconName = "home";
            else if (route.name === "Diagnose") iconName = "md-hospital";
            else if (route.name === "My Garden") iconName = "flower";
            else if (route.name === "Profile") iconName = "person";

            //@ts-ignore
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "green",
          tabBarInactiveTintColor: "gray",
          tabBarLabelStyle: { paddingBottom: 5, fontSize: 12 },
          tabBarStyle: { padding: 10, height: 70 },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Tab.Screen name="Diagnose" component={DiagnoseScreen} />
        <Tab.Screen name="My Garden" component={GardenScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
  greetingSmall: {
    fontSize: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  promotionBanner: {
    backgroundColor: "#24201a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: "row",
  },
  promotionTextUpper: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    color: "#e5c990",
  },
  envelope: {
    position: "relative",
    paddingRight: 10,
    paddingTop: 3,
  },
  nextArrow: {
    position: "relative",
    paddingTop: 3,
    paddingRight: 10,
    marginLeft: "auto",
  },
  promotionTextLower: {
    textAlign: "left",
    fontSize: 12,
    fontWeight: "bold",
    color: "#cda75a",
  },
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
