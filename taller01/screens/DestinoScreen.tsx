import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import destinos from "../assets/database/destinos.json";
import Card from "../components/Card";
import { globalStyles } from "../styles/globalStyles";

export default function DestinoScreen() {
  //console.log(destinos)

  return (
    <View style={globalStyles.lista}>
      <Text style={globalStyles.titulo}>Lista de Destinos</Text>

      <FlatList
        data={destinos.destinos}
        renderItem={({ item }) => <Card data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
