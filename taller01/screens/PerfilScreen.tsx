import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { onValue, ref } from "firebase/database";
import { globalStyles } from "../styles/globalStyles";

export default function PerfilScreen() {
  const [clima, setclima] = useState<any>({});
  const [usuario, setusuario] = useState<any>({});

  async function leerClima(ciudad: string) {
    try {
      const resp = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          encodeURIComponent(ciudad) +
          "&appid=4f14f83afeb31ab5795b65506090bd93&units=metric&lang=es",
      );
      const json = await resp.json();
      setclima(json);
    } catch (error) {
      setclima({});
    }
  }

  // Lee la uid de la sesión activa
  function leerUsuario() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        leerInformación(uid);
      } else {
      }
    });
  }

  // Leer información del usuario
  function leerInformación(uid: string) {
    const starCountRef = ref(db, "users/" + uid);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val() || {};
      setusuario(data);
      // El clima se consulta cuando ya se conoce la ciudad
      if (data.ciudad) leerClima(data.ciudad);
    });
  }

  useEffect(() => {
    leerUsuario();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>Perfil</Text>

      <View style={globalStyles.card}>
        <Text style={globalStyles.etiqueta}>Nombre</Text>
        <Text style={globalStyles.valor}>
          {usuario.username} {usuario.lastname}
        </Text>

        <Text style={globalStyles.etiqueta}>Correo</Text>
        <Text style={globalStyles.valor}>{usuario.email}</Text>

        <Text style={globalStyles.etiqueta}>Edad</Text>
        <Text style={globalStyles.valor}>{usuario.age}</Text>

        <Text style={globalStyles.etiqueta}>Ciudad</Text>
        <Text style={globalStyles.valor}>{usuario.ciudad}</Text>

        <Text style={globalStyles.etiqueta}>Temperatura</Text>
        <Text style={globalStyles.valor}>
          {clima.main?.temp !== undefined ? clima.main.temp + " °C" : "—"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
