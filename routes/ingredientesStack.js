import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ingredientes from "../components/menus/ingredientesMenu";
import IngredientesGuardar from "../components/crudingredientes/ingredientesGuardar";
import IngredientesListar from "../components/crudingredientes/ingredientesListar";
import IngredientesModificar from "../components/crudingredientes/ingredientesModificar";
import IngredientesEliminar from "../components/crudingredientes/ingredientesEliminar";

const Stack = createNativeStackNavigator();

export default function IngredientesStack(){

    return(
        <Stack.Navigator initialRouteName="IngredientesMenu" screenOptions={({navigation}) => ({
            headerShown: false
        })}>
            <Stack.Screen name="IngredientesMenu" component={Ingredientes}/>
            <Stack.Screen name="IngredientesGuardar" component={IngredientesGuardar}/>
            <Stack.Screen name="IngredientesListar" component={IngredientesListar}/>
            <Stack.Screen name="IngredientesModificar" component={IngredientesModificar}/>
            <Stack.Screen name="IngredientesEliminar" component={IngredientesEliminar}/>
        </Stack.Navigator>
    )
}