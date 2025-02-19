import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../components/Divider";
import LabeledSearchTextInput from "../components/SearchTextInput";
import UserList from "../components/UserList";
import { searchUser } from "../redux/actions/userActions";
import { SortData, UsersState } from "../redux/types/userTypes";

const { height: fullHeight, width: fullWidth } = Dimensions.get("window");

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state: UsersState) => state.users);

  const [sortData, setSortData] = useState<SortData>({
    type: "rank",
    sortDir: "desc",
  });

  useEffect(() => {
    dispatch({
      type: "SORT_USERS",
      payload: sortData,
    });
  }, [sortData, dispatch]);

  const handleSearch = useCallback(() => {
    if (!query) {
      alert("Please enter a search query");
      return;
    }
    const action = searchUser(query);
    dispatch({
      type: action.type,
      payload: action.payload,
    });
  }, [query, dispatch]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentSortModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present(1);
  }, []);

  const snapPoints = useMemo(() => ["50%", "70%"], []);

  const flatListRef = useRef<FlatList>(null);

  const handleSortBy = useCallback((value: SortData) => {
    bottomSheetModalRef.current?.dismiss();
    setSortData(value);
    dispatch({
      type: "SORT_USERS",
      payload: value,
    });
    flatListRef.current?.scrollToIndex({ index: 0 });
  }, []);

  const onClearPress = useCallback(() => {
    dispatch({
      type: "CLEAR_SEARCH",
    });
    setQuery("");
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-end" }}>
        <Pressable onPress={handlePresentSortModalPress}>
          <Ionicons name="list-circle" size={24} color="black" />
        </Pressable>
      </View>
      <Divider style={{ marginVertical: 8 }} mode="compact" />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <LabeledSearchTextInput
            onClearPress={onClearPress}
            onChangeText={setQuery}
            value={query}
          />
        </View>
        <View>
          <Button title="Search" onPress={handleSearch} />
        </View>
      </View>
      <UserList flatListRef={flatListRef} users={users} />
      <BottomSheetModal snapPoints={snapPoints} ref={bottomSheetModalRef}>
        <BottomSheetView
          style={{
            minHeight: fullHeight * 0.5,
            padding: 16,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginVertical: 8,
                textAlign: "center",
              }}
            >
              Sort By
            </Text>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Divider
                style={{
                  marginVertical: 8,
                  width: fullWidth * 0.5,
                }}
                mode="compact"
              />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={{ fontWeight: "bold" }}>Rank</Text>
              <View style={{ marginLeft: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => handleSortBy({ type: "rank", sortDir: "asc" })}
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View style={{ width: 16, height: 16 }}>
                    {sortData.type === "rank" && sortData.sortDir === "asc" && (
                      <Ionicons name="checkmark" size={16} color="black" />
                    )}
                  </View>
                  <Text>Asc</Text>
                </Pressable>
                <Divider style={{ marginVertical: 8 }} mode="compact" />
                <Pressable
                  onPress={() =>
                    handleSortBy({ type: "rank", sortDir: "desc" })
                  }
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View style={{ width: 16, height: 16 }}>
                    {sortData.type === "rank" &&
                      sortData.sortDir === "desc" && (
                        <Ionicons name="checkmark" size={16} color="black" />
                      )}
                  </View>
                  <Text>Desc</Text>
                </Pressable>
              </View>
            </View>
            <Divider style={{ marginVertical: 8 }} mode="compact" />
            <View style={{ marginLeft: 8, marginTop: 8 }}>
              <Text style={{ fontWeight: "bold" }}>Name</Text>
              <View style={{ marginLeft: 8, marginTop: 8 }}>
                <Pressable
                  onPress={() => handleSortBy({ type: "name", sortDir: "asc" })}
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View style={{ width: 16, height: 16 }}>
                    {sortData.type === "name" && sortData.sortDir === "asc" && (
                      <Ionicons name="checkmark" size={16} color="black" />
                    )}
                  </View>
                  <Text>Asc</Text>
                </Pressable>
                <Divider style={{ marginVertical: 8 }} mode="compact" />
                <Pressable
                  onPress={() =>
                    handleSortBy({ type: "name", sortDir: "desc" })
                  }
                  style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
                >
                  <View style={{ width: 16, height: 16 }}>
                    {sortData.type === "name" &&
                      sortData.sortDir === "desc" && (
                        <Ionicons name="checkmark" size={16} color="black" />
                      )}
                  </View>
                  <Text>Desc</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
