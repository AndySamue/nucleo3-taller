import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { colors, globalStyles } from "../styles/globalStyles";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<any>({});

  function validar() {
    const e: any = {};
    if (!email.trim()) e.email = "Ingresa tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Correo no válido";
    if (!password) e.password = "Ingresa tu contraseña";
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function login() {
    if (!validar()) return;

    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        navigation.navigate("Tabs");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrores({ general: "Correo o contraseña incorrectos" });
      });
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titulo}>Iniciar Sesión</Text>

      <TextInput
        placeholder="Ingresar Correo"
        placeholderTextColor={colors.suave}
        onChangeText={setEmail}
        value={email}
        style={[globalStyles.input, errores.email && globalStyles.inputError]}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errores.email && <Text style={globalStyles.error}>{errores.email}</Text>}

      <TextInput
        placeholder="Ingresar Contraseña"
        placeholderTextColor={colors.suave}
        onChangeText={setPassword}
        value={password}
        style={[globalStyles.input, errores.password && globalStyles.inputError]}
        secureTextEntry
      />
      {errores.password && (
        <Text style={globalStyles.error}>{errores.password}</Text>
      )}
      {errores.general && (
        <Text style={globalStyles.error}>{errores.general}</Text>
      )}

      <Pressable style={globalStyles.boton} onPress={login}>
        <Text style={globalStyles.botonTxt}>Iniciar Sesión</Text>
      </Pressable>

      <Pressable
        style={[globalStyles.boton, globalStyles.botonSecundario]}
        onPress={() => navigation.navigate("Registro")}
      >
        <Text style={[globalStyles.botonTxt, globalStyles.botonSecundarioTxt]}>
          Registrar Cuenta
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
