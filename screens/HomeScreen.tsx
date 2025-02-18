import React, { useCallback, useEffect, useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import LabeledSearchTextInput from "../components/SearchTextInput";
import UserList from "../components/UserList";
import { searchUser } from "../redux/actions/userActions";
import { UsersState } from "../redux/types/userTypes";

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state: UsersState) => state.users);

  useEffect(() => {
    if (!query || query.length === 0) {
      dispatch({
        type: "CLEAR_USERS",
      });
    }
  }, [query, dispatch]);

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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          alignContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <LabeledSearchTextInput onChangeText={setQuery} value={query} />
        </View>
        <View>
          <Button title="Search" onPress={handleSearch} />
        </View>
      </View>
      <UserList users={users} />
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
