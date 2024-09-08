import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/state/store";
import { fetchCategories } from "../redux/category/categorySlice";
import { Category } from "../redux/types";

const { width } = Dimensions.get("window");

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

const Categories = () => {
  const categories_ = useSelector((state: RootState) => state.categories.categories);
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.categories.status);
  const error = useSelector((state: RootState) => state.categories.error);
  //@ts-ignore
  const categories = categories_.data as Category[];
  //@ts-ignore
  // const pagination = categories_.meta.pagination as Pagination;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories with the current page
  }, [dispatch]);

  // const loadMore = () => {
  //   if (page < pagination.pageCount && status !== "loading") {
  //     setPage((prevPage) => prevPage + 1); // Increment page for pagination
  //   }
  // };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item.image.url }} style={styles.image} />
      <Text style={styles.text}>{item.title}</Text>
    </View>
  );

  if (status === "loading" && page === 1) return <ActivityIndicator size="large" color="#0000ff" />;
  if (status === "failed") return <Text>Failed to fetch categories.</Text>;

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item: Category) => item.id.toString()}
      numColumns={width > 600 ? 3 : 2}
      contentContainerStyle={styles.gridContainer}
      // onEndReached={loadMore} 
      onEndReachedThreshold={0.5} 
      ListFooterComponent={
        status === "loading" && page > 1 ? <ActivityIndicator size="small" color="#0000ff" /> : null
      }
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  imageItem: {
    flex: 0.5,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
    height: width * 0.4, 
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Categories;
