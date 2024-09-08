import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "./redux/state/store";
import { getQuestionsAsync } from "./redux/question/questionSlice";
import { Question } from "./redux/types";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const Questions = () => {
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.questions.status);
  const error = useSelector((state: RootState) => state.questions.error);

  useEffect(() => {
    dispatch(getQuestionsAsync());
  }, [dispatch]);

  if (status === "loading") return <Text>Loading...</Text>;
  if (status === "failed") return <Text>Failed to fetch questions.</Text>;

  const renderCarouselItem = ({ item }: { item: Question }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image_uri }} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  return (
    <Carousel
      loop
      width={width * 0.75}
      height={width * 0.5}
      data={questions}
      renderItem={renderCarouselItem}
      scrollAnimationDuration={1000}
      style={styles.carousel}
    />
  );
};

const styles = StyleSheet.create({
  carouselItem: {
    justifyContent: "space-between",
    alignItems: "center",
    width: width * 0.7,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  carousel: {
    overflow: "visible",
  },
  carouselContent: {
    paddingHorizontal: width * 3.21312312,
  },
});

export default Questions;
