import { StyleSheet } from "react-native";

export const colors = {
  fondo: "#FFFFFF",
  superficie: "#FFFFFF",
  borde: "#CCCCCC",
  azul: "#1E6FD9",
  texto: "#222222",
  suave: "#777777",
  error: "#D32F2F",
};

export const globalStyles = StyleSheet.create({
  txt: {
    fontSize: 18,
    color: colors.texto,
  },
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: 20,
    justifyContent: "center",
  },
  lista: {
    flex: 1,
    backgroundColor: colors.fondo,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.azul,
    marginBottom: 16,
  },
  input: {
    color: colors.texto,
    borderWidth: 1,
    borderColor: colors.borde,
    padding: 10,
    fontSize: 16,
    marginTop: 10,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    color: colors.error,
    fontSize: 13,
    marginTop: 4,
  },
  boton: {
    backgroundColor: colors.azul,
    padding: 12,
    alignItems: "center",
    marginTop: 16,
  },
  botonTxt: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  botonSecundario: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colors.azul,
    marginTop: 10,
  },
  botonSecundarioTxt: {
    color: colors.azul,
  },
  botonPeligro: {
    backgroundColor: colors.error,
    marginTop: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.borde,
    padding: 12,
    marginBottom: 10,
  },
  cardTitulo: {
    color: colors.texto,
    fontSize: 17,
    fontWeight: "bold",
  },
  cardTxt: {
    color: colors.suave,
    fontSize: 15,
    marginTop: 2,
  },
  etiqueta: {
    color: colors.suave,
    fontSize: 13,
    marginTop: 12,
  },
  valor: {
    color: colors.texto,
    fontSize: 17,
  },
});
