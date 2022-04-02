import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Clientes from "../components/menus/clientesMenu";
import ClientesListar from "../components/crudclientes/clientesListar";
import ClientesModificar from "../components/crudclientes/clientesModificar";
const Stack = createNativeStackNavigator();

export default function ClientesStack(){

    return(
        <Stack.Navigator initialRouteName="ClientesMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="ClientesMenu" component={Clientes}/>
            <Stack.Screen name="ClientesListar" component={ClientesListar}/>
            <Stack.Screen name="ClientesModificar" component={ClientesModificar}/>
        </Stack.Navigator>
    )
}