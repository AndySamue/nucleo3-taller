import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onValue, ref, remove, set } from "firebase/database";
import { auth, db } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { globalStyles } from "../styles/globalStyles";

export default function RegistroViaje() {
  const [destinos, setdestinos] = useState([]);
  const [user, setuser] = useState("");

  // Leer la lista de viajes de cada usuario
  function leerDestinos(uid: string) {
    const starCountRef = ref(db, "users/" + uid + "/destinos/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      try {
        let arregloTemp: any = Object.keys(data).map((clave) => ({
          clave,
          ...data[clave],
        }));

        setdestinos(arregloTemp);
      } catch (error) {}
    });
  }

  // Lee la uid de la sesión activa
  function leer() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        leerDestinos(uid);
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

  // Eliminar
  function eliminarDestino(clave: string) {
    7;
    remove(ref(db, "users/" + user + "/destinos/" + clave));
  }

  return (
    <View style={globalStyles.lista}>
      <Text style={globalStyles.titulo}>Registro de Viajes</Text>
      <FlatList
        data={destinos}
        renderItem={({ item }: any) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.cardTitulo}>
              Ciudad: {item.destino.ciudad}
            </Text>
            <Text style={globalStyles.cardTxt}>País: {item.destino.pais}</Text>
            <Pressable
              style={[globalStyles.boton, globalStyles.botonPeligro]}
              onPress={() => eliminarDestino(item.clave)}
            >
              <Text style={globalStyles.botonTxt}>Eliminar</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
