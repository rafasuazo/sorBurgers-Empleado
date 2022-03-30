import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Recetas from "../components/menus/recetasMenu";
import RecetasListar from "../components/crudrecetas/recetasListar";
import RecetasGuardar from "../components/crudrecetas/recetasGuardar";
import RecetasEliminar from "../components/crudrecetas/recetasEliminar";
import RecetasModificar from "../components/crudrecetas/recetasModificar";
const Stack = createNativeStackNavigator();

export default function RecetasStack(){

    return(
        <Stack.Navigator initialRouteName="RecetasMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="RecetasMenu" component={Recetas}/>
            <Stack.Screen name="RecetasListar" component={RecetasListar} />
            <Stack.Screen name="RecetasGuardar" component={RecetasGuardar} />
            <Stack.Screen name="RecetasEliminar" component={RecetasEliminar} />
            <Stack.Screen name="RecetasModificar" component={RecetasModificar} />
        </Stack.Navigator>
    )
}