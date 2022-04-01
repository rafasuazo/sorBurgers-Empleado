import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Empleados from "../components/menus/empleadosMenu";
import EmpleadosListar from "../components/crudempleados/empleadosListar"

const Stack = createNativeStackNavigator();

export default function EmpleadosStack(){

    return(
        <Stack.Navigator initialRouteName="EmpleadosMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="EmpleadosMenu" component={Empleados}/>
            <Stack.Screen name="EmpleadosListar" component={EmpleadosListar}/>
        </Stack.Navigator>
    )
}