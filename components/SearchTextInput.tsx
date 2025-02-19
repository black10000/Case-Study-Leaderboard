import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useCallback, useImperativeHandle, useRef } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

export interface SearchTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
  optional?: boolean;
  iconName?: string;
  showClearButton?: boolean;
  onClearPress?: () => void;
  TextInputComponent?: React.ComponentType<TextInputProps & { ref: any }>;
  textInputContainerStyle?: StyleProp<ViewStyle>;
}

export interface SearchTextInputHandle {
  press: () => void;
}
const SearchTextInput = React.forwardRef<
  SearchTextInputHandle,
  SearchTextInputProps
>(
  (
    {
      error,
      label,
      iconName,
      style,
      placeholder,
      showClearButton,
      optional,
      onChangeText,
      onClearPress,
      value,
      textInputContainerStyle,
      TextInputComponent = TextInput,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    const setFocus = useCallback(() => {
      inputRef.current?.focus();
    }, []);

    const onClearPressX = useCallback(() => {
      onClearPress && onClearPress();
      inputRef.current?.focus();
    }, [onChangeText]);

    useImperativeHandle(
      ref,
      () => ({
        press: () => {
          const isFocused = inputRef.current?.isFocused();
          isFocused ? inputRef.current?.blur() : inputRef.current?.focus();
        },
      }),
      []
    );

    return (
      <View style={styles.input}>
        <Pressable onPress={setFocus}>
          <Ionicons name="search" size={16} color={"#000"} />
        </Pressable>
        <TextInput
          ref={inputRef}
          placeholder="Search by name..."
          value={value}
          style={{ flex: 1 }}
          onChangeText={onChangeText}
        />
        {!!value && (
          <Pressable onPress={onClearPressX}>
            <Ionicons name="close" size={16} color={"#000"} />
          </Pressable>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 4,
  },
});

export default SearchTextInput;
