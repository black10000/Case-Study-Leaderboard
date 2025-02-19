import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./redux/  store";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Provider store={store}>
          <HomeScreen />
        </Provider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
