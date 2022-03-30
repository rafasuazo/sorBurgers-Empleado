import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Puestos from "../components/menus/puestosMenu";
import PuestosListar from "../components/crudpuestos/PuestosListar";
import PuestosGuardar from "../components/crudpuestos/PuestosGuardar";
import PuestosEliminar from "../components/crudpuestos/PuestosEliminar";
import PuestosModificar from "../components/crudpuestos/PuestosModificar";
const Stack = createNativeStackNavigator();

export default function PuestosStack(){

    return(
        <Stack.Navigator initialRouteName="PuestosMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="PuestosMenu" component={Puestos}/>
            <Stack.Screen name="PuestosListar" component={PuestosListar} />
            <Stack.Screen name="PuestosGuardar" component={PuestosGuardar} />
            <Stack.Screen name="PuestosEliminar" component={PuestosEliminar} />
            <Stack.Screen name="PuestosModificar" component={PuestosModificar} />
        </Stack.Navigator>
    )
}