import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Proveedores from "../components/menus/proveedoresMenu";
import ProveedoresGuardar from "../components/crudproveedores/ProveedoresGuardar";
import ProveedoresListar from "../components/crudproveedores/ProveedoresListar";
import ProveedoresModificar from "../components/crudproveedores/ProveedoresModificar";
import ProveedoresEliminar from "../components/crudproveedores/ProveedoresEliminar";

const Stack = createNativeStackNavigator();

export default function ProveedoresStack(){

    return(
        <Stack.Navigator initialRouteName="ProveedoresMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="ProveedoresMenu" component={Proveedores}/>
            <Stack.Screen name="ProveedoresListar" component={ProveedoresListar}/>
            <Stack.Screen name="ProveedoresGuardar" component={ProveedoresGuardar}/>
            <Stack.Screen name="ProveedoresModificar" component={ProveedoresModificar}/>
            <Stack.Screen name="ProveedoresEliminar" component={ProveedoresEliminar}/>
        </Stack.Navigator>
    )
}