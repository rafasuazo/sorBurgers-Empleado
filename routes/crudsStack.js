import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MenuPrincipal from "../components/menuCruds";
import ProductoStack from "./productosStack";
import RecetaStack from "./recetasStack";
import ProveedoresStack from "./proveedoresStack";
import PuestosStack from "./puestosStack";
import IngredientesStack from "./ingredientesStack";
import EmpleadosStack from "./empleadosStack";

const Stack = createNativeStackNavigator();

export default function CrudStack(){

    return(
        <Stack.Navigator initialRouteName="MenuPrincipal" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="MenuPrincipal" component={MenuPrincipal} />
            <Stack.Screen name="ProductosStack" component={ProductoStack}/>
            <Stack.Screen name="RecetasStack" component={RecetaStack}/>
            <Stack.Screen name="ProveedoresStack" component={ProveedoresStack}/>
            <Stack.Screen name="PuestosStack" component={PuestosStack}/>
            <Stack.Screen name="IngredientesStack" component={IngredientesStack}/>
            <Stack.Screen name="EmpleadosStack" component={EmpleadosStack}/>
        </Stack.Navigator>
    )
}