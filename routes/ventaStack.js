import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductoCliente from "../components/ventas/productoCliente";
import Producto from "../components/ventas/productoDetalle";

const Stack = createNativeStackNavigator();

export default function VentasStack(){
    return(
        <Stack.Navigator initialRouteName="ProductoCliente" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="ProductoCliente" component={ProductoCliente}/>
            <Stack.Screen name="Producto" component={Producto}/>

        </Stack.Navigator>
    )
}