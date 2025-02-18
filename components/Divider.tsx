import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
interface Props extends ViewProps {
  mode?: "compact" | "normal";
  orientation?: "horizontal" | "vertical";
}

const COMPACT_SIZE = 8;
const NORMAL_SIZE = 16;

const Divider: React.FC<Props> = ({
  mode = "normal",
  orientation = "horizontal",
  style,
  ...props
}) => {
  const isHorizontal = orientation === "horizontal";
  const spacing =
    mode === "compact"
      ? isHorizontal
        ? {
            marginHorizontal: COMPACT_SIZE,
          }
        : {
            marginVertical: COMPACT_SIZE,
          }
      : isHorizontal
      ? {
          marginHorizontal: NORMAL_SIZE,
        }
      : {
          marginVertical: NORMAL_SIZE,
        };
  return (
    <View
      style={[
        spacing,
        {
          backgroundColor: "#000000",
        },
        orientation === "horizontal" ? styles.horizontal : styles.vertical,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  horizontal: {
    height: StyleSheet.hairlineWidth,
  },
  vertical: {
    width: StyleSheet.hairlineWidth,
  },
});

export default Divider;
