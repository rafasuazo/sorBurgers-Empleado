import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../components/login";
import RegistroCliente from "../components/registroCliente";
import CrearUsuario from "../components/crearUsuario";
import RecuperarContrasenia from "../components/recuperarContrasenia";
import HomeStack from "./homeStack";

const Stack = createNativeStackNavigator();

export default function Navigation(){

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login"
            screenOptions={({ route, navigation }) => ({
                headerShown: false
            })}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registro" component={RegistroCliente} />
                <Stack.Screen name="Usuario" component={CrearUsuario} />
                <Stack.Screen name="Recuperacion" component={RecuperarContrasenia} />
                <Stack.Screen name="Home" component={HomeStack} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}