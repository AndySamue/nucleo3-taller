import { createStackNavigator } from "@react-navigation/stack";
import { createNativeBottomTabNavigator } from "@react-navigation/bottom-tabs/unstable";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DestinoScreen from "../screens/DestinoScreen";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import PerfilScreen from "../screens/PerfilScreen";
import RegistroViaje from "../screens/RegistroViaje";
import { colors } from "../styles/globalStyles";

const Stack = createStackNavigator();
const Tab = createNativeBottomTabNavigator();

const tema = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.azul,
    background: colors.fondo,
    card: colors.superficie,
    text: colors.texto,
    border: colors.borde,
  },
};

function MyStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registro" component={RegisterScreen} />
      <Stack.Screen name="Tabs" component={MyTabs} />
    </Stack.Navigator>
  );
}

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Destino" component={DestinoScreen} />
      <Tab.Screen name="RegistroViaje" component={RegistroViaje} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

export function MiNavegador() {
  return (
    <NavigationContainer theme={tema}>
      <MyStack />
    </NavigationContainer>
  );
}
