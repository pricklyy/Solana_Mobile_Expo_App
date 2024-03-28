import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Mission from "../components/mission/Mission";
export default function BlankScreen() {
  return (
    <>
      <View style={styles.screenContainer}>
        <Mission />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    padding: 16,
  },
});
