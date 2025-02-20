import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { User } from "../redux/types/userTypes";

interface UserItemProps {
  item: User;
}

const UserItem: React.FC<UserItemProps> = ({ item }) => {
  return (
    <View style={styles.userItem}>
      <View
        style={{
          flexDirection: "row",
          gap: 4,
        }}
      >
        <Text
          style={[
            {
              color: item.isSearchedUser ? "red" : "black",
            },
            styles.userName,
          ]}
        >
          {item.name || "Unknown"}
        </Text>
        {item.isSearchedUser && (
          <Ionicons name="star" size={16} color={"#FFD700"} />
        )}
      </View>
      {!!item.rank && <Text>Rank: {item.rank}</Text>}
      <Text>Bananas: {item.bananas}</Text>
      <Text>Stars: {item.stars}</Text>
    </View>
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

export default UserItem;
