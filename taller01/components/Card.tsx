import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { push, ref, set } from "firebase/database";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { globalStyles } from "../styles/globalStyles";

export default function Card(props: any) {
  //console.log(props.data)
  let destino = props.data;

  const [user, setuser] = useState("");

  function guardarCiudad() {
    push(ref(db, "users/" + user + "/destinos/"), {
      destino,
    });
  }

  // Función para obtener la sesión activa
  function leer() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setuser(uid);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  useEffect(() => {
    leer();
  }, []);

  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.cardTitulo}>{destino.ciudad}</Text>
      <Text style={globalStyles.cardTxt}>{destino.pais}</Text>
      <Text style={globalStyles.cardTxt}>${destino.precio}</Text>

      <Pressable style={globalStyles.boton} onPress={() => guardarCiudad()}>
        <Text style={globalStyles.botonTxt}>Guardar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
