import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { MiNavegador } from "./navigations/Navegador";

export default function App() {
  return <MiNavegador />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
