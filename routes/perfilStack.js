import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuPerfil from "../components/menuPerfil";
import Perfil from "../components/perfilUsuario";
import MiCuenta from "../components/miCuenta";
import EliminarCuenta from "../components/eliminarCuenta";

const Stack = createNativeStackNavigator();

export default function PerfilStack(){

    return(
        <Stack.Navigator screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="MenuPerfil" component={MenuPerfil}/>
            <Stack.Screen name="Perfil" component={Perfil}/>
            <Stack.Screen name="MiCuenta" component={MiCuenta}/>
            <Stack.Screen name="EliminarCuenta" component={EliminarCuenta}/>
        </Stack.Navigator>
    )
}