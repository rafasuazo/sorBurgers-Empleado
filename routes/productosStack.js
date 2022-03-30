import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Productos from "../components/menus/productosMenu";
import ProductosGuardar from "../components/crudproductos/productosGuardar";
import ProductosListar from "../components/crudproductos/productosListar";
import ProductosModificar from "../components/crudproductos/productosModificar";
import ProductosEliminar from "../components/crudproductos/productosEliminar";

const Stack = createNativeStackNavigator();

export default function ProductosStack(){

    return(
        <Stack.Navigator initialRouteName="ProductosMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="ProductosMenu" component={Productos}/>
            <Stack.Screen name="ProductosGuardar" component={ProductosGuardar}/>
            <Stack.Screen name="ProductosListar" component={ProductosListar}/>
            <Stack.Screen name="ProductosModificar" component={ProductosModificar}/>
            <Stack.Screen name="ProductosEliminar" component={ProductosEliminar}/>
        </Stack.Navigator>
    )
}