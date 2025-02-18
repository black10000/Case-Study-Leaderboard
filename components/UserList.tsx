import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { User } from "../redux/types/userTypes";
import Divider from "./Divider";

interface UserListProps {
  users: Record<string, User>;
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const userArray = Object.values(users);

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={userArray}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => (
        <>
          <View style={styles.userItem}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.userName}>{item.name || "Unknown"}</Text>
              {item.isSearchedUser && <Text>⭐</Text>}
            </View>
            {!!item.rank && <Text>Rank: {item.rank}</Text>}
            <Text>Bananas: {item.bananas}</Text>
            <Text>Stars: {item.stars}</Text>
          </View>
          <Divider mode="compact" />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  userItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserList;
