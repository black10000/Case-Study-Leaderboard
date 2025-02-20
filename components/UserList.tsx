import React from "react";
import { FlatList } from "react-native";
import { User } from "../redux/types/userTypes";
import Divider from "./Divider";
import UserItem from "./UserItem";

interface UserListProps {
  users: Record<string, User>;
  flatListRef?: React.RefObject<FlatList>;
}

const UserList: React.FC<UserListProps> = ({ users, flatListRef }) => {
  const userArray = Object.values(users);

  return (
    <FlatList
      ref={flatListRef}
      showsVerticalScrollIndicator={false}
      data={userArray}
      keyExtractor={(item) => item.uid}
      renderItem={({ item }) => (
        <>
          <UserItem item={item} />
          <Divider mode="compact" />
        </>
      )}
    />
  );
};

export default UserList;
