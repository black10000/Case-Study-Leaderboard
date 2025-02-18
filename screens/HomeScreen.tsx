import React, { useCallback, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import UserList from "../components/UserList";
import { searchUser } from "../redux/actions/userActions";
import { UsersState } from "../redux/types/userTypes";

const HomeScreen: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const users = useSelector((state: UsersState) => state.users);

  const handleSearch = useCallback(() => {
    const action = searchUser(query);
    dispatch({
      type: action.type,
      payload: action.payload,
    });
  }, [query, dispatch]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search by name..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Search" onPress={handleSearch} />
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
