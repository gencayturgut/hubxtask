import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/state/store";
import { completeOnboarding } from "./redux/onBoardingReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function GetStartedScreen() {
  const [isGetStarted, setIsGetStarted] = useState(true);
  const dispatch = useDispatch();
  const onboardingCompleted = useSelector(
    (state: RootState) => state.onboarding.completed
  ); 
  const [currentHeader, setCurrentHeader] = useState(0);

  const carouselItems = [
    { id: "1", uri: require("./photos/carousel1.png") },
    { id: "2", uri: require("./photos/carousel2.png") },
  ];

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("@onboarding_complete", "true");
      dispatch(completeOnboarding()); 
      router.push("/homepage"); 
    } catch (error) {
      console.error("Error saving onboarding status:", error);
    }
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {carouselItems.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentHeader ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  const getHeaderText = (id: string) => {
    switch (id) {
      case "1":
        return (
          <Text style={styles.header}>
            Take a photo to <Text style={styles.boldText}>identify</Text> the
            plant!
          </Text>
        );
      case "2":
        return (
          <Text style={styles.header}>
            Get plant <Text style={styles.boldText}>care guides</Text>
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.headerContainer}>
        {isGetStarted ? (
          <>
            <Text style={styles.header}>
              Welcome to <Text style={styles.boldText}>Plant App</Text>
            </Text>
            <Text style={styles.text}>
              Identify more than 3000+ plants with 88% accuracy.
            </Text>
          </>
        ) : (
          getHeaderText(carouselItems[currentHeader].id)
        )}
      </View>
      <View style={styles.carouselContainer}>
        {isGetStarted ? (
          <Image
            source={require("./photos/getstarted.png")}
            style={styles.carouselImage}
            resizeMode="contain"
          />
        ) : (
          <Carousel
            loop
            width={width}
            data={carouselItems}
            onSnapToItem={(index) => setCurrentHeader(index)}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image
                  source={item.uri}
                  style={styles.carouselImage}
                  resizeMode="contain"
                />
              </View>
            )}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            isGetStarted ? setIsGetStarted(false) : handleOnboardingComplete();
          }}
        >
          {isGetStarted ? (
            <Text style={styles.buttonText}>Get Started</Text>
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
      {isGetStarted ? (
        <Text style={styles.footer}>
          By tapping next, you are agreeing to PlantID Terms of Use & Privacy
          Policy.
        </Text>
      ) : (
        renderPagination()
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    fontSize: 14,
    textAlign: "center",
    color: "#808080",
    marginVertical: 16,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#30ac6c",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 16,
    width: width * 0.9,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  boldText: {
    fontWeight: "bold",
  },
  pageContainer: {
    paddingTop: 64,
    padding: 16,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  carouselContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
  },
  carouselItem: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  carouselImage: {
    padding: 16,
    width: width * 0.8,
    // height: width * 1,
    borderRadius: 8,
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: "light",
    color: "#808080",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#000000",
  },
  inactiveDot: {
    backgroundColor: "#ccc",
  },
});
