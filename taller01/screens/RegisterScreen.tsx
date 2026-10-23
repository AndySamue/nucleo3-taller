import { Pressable, ScrollView, StyleSheet, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { ref, set } from "firebase/database";
import { colors, globalStyles } from "../styles/globalStyles";

export default function RegisterScreen({ navigation }: any) {
  const [name, setname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [age, setage] = useState(0);
  const [ciudad, setciudad] = useState("");
  const [errores, setErrores] = useState<any>({});

  function validar() {
    const e: any = {};
    if (!name.trim()) e.name = "Ingresa tu nombre";
    if (!lastname.trim()) e.lastname = "Ingresa tu apellido";
    if (!email.trim()) e.email = "Ingresa tu correo";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) e.email = "Correo no válido";
    if (password.length < 6) e.password = "Mínimo 6 caracteres";
    if (!age || age < 1 || age > 120) e.age = "Ingresa una edad válida";
    if (!ciudad.trim()) e.ciudad = "Ingresa tu ciudad";
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  function registrar() {
    if (!validar()) return;

    createUserWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        alert("Registro Exitoso");
        guardar(user.uid);
        navigation.navigate("Tabs");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorCode === "auth/email-already-in-use")
          setErrores({ email: "Este correo ya está registrado" });
        else setErrores({ general: "No se pudo registrar la cuenta" });
      });
  }

  function guardar(uid: string) {
    set(ref(db, "users/" + uid), {
      username: name.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      age: age,
      ciudad: ciudad.trim(),
    });
  }

  function campo(clave: string) {
    return [globalStyles.input, errores[clave] && globalStyles.inputError];
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.fondo }}
      contentContainerStyle={globalStyles.container}
    >
      <Text style={globalStyles.titulo}>Registro</Text>

      <TextInput
        placeholder="Nombre"
        placeholderTextColor={colors.suave}
        onChangeText={setname}
        style={campo("name")}
      />
      {errores.name && <Text style={globalStyles.error}>{errores.name}</Text>}

      <TextInput
        placeholder="Apellido"
        placeholderTextColor={colors.suave}
        onChangeText={setlastname}
        style={campo("lastname")}
      />
      {errores.lastname && (
        <Text style={globalStyles.error}>{errores.lastname}</Text>
      )}

      <TextInput
        placeholder="Correo"
        placeholderTextColor={colors.suave}
        onChangeText={setemail}
        style={campo("email")}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errores.email && <Text style={globalStyles.error}>{errores.email}</Text>}

      <TextInput
        placeholder="Contraseña"
        placeholderTextColor={colors.suave}
        onChangeText={setpassword}
        style={campo("password")}
        secureTextEntry
      />
      {errores.password && (
        <Text style={globalStyles.error}>{errores.password}</Text>
      )}

      <TextInput
        placeholder="Edad"
        placeholderTextColor={colors.suave}
        onChangeText={(text) => setage(+text)}
        style={campo("age")}
        keyboardType="numeric"
      />
      {errores.age && <Text style={globalStyles.error}>{errores.age}</Text>}

      <TextInput
        placeholder="Ciudad"
        placeholderTextColor={colors.suave}
        onChangeText={setciudad}
        style={campo("ciudad")}
      />
      {errores.ciudad && (
        <Text style={globalStyles.error}>{errores.ciudad}</Text>
      )}
      {errores.general && (
        <Text style={globalStyles.error}>{errores.general}</Text>
      )}

      <Pressable style={globalStyles.boton} onPress={registrar}>
        <Text style={globalStyles.botonTxt}>Registrar Cuenta</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
