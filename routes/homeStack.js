import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Inicio from "../components/paginaInicio";
import Carrito from "../components/ventas/carrito";
import Header from "../shared/header";
import PerfilStack from "./perfilStack";
import CrudStack from "./crudsStack";

const Stack = createBottomTabNavigator();

export default function Navigation(){

    return(
        <Stack.Navigator screenOptions={({ route }) => ({
            tabBarIcon: () => {

                const icons = {
                    Inicio: 'home',
                    Cuenta: 'account',
                    Carrito: 'cart'
                };

                return(
                    <MaterialCommunityIcons

                    name={icons[route.name]}
                    color={"#000"}
                    size={24}
                    />
                )
            },

            headerTitle: () => {
                
                const {usuario} = route.params;
                let param = JSON.stringify(usuario);
                let user = JSON.parse(param);
                const titulo = {Inicio: user};

                return(
                    <Header title={titulo[route.name]}/>
                )
            },

            tabBarLabelStyle: { fontSize: 12}
        })}>

            <Stack.Screen options={
                {headerBackVisible: false,
                headerStyle: {backgroundColor: "#6E93D6"}
            }}
                
                name="Inicio" component={Inicio} />

            <Stack.Screen
            
            options={{
                headerStyle: {backgroundColor: "#111B1E"},
                headerTitle: () => <Header title="Perfil" />
            }}

            name="Cuenta" component={PerfilStack} />

            <Stack.Screen
            
            options={{
                headerStyle: {backgroundColor: "#6E93D6"},
                headerTitle: () => <Header title="Carrito de Ventas" />
            }}

            name="Carrito" component={Carrito} />

            <Stack.Screen
            
            options={{
                headerStyle: {backgroundColor: "#6E93D6"},
                headerTitle: () => <Header title="Menu Principal" />
            }}

            name="Menu" component={CrudStack} />
        </Stack.Navigator>
    )
}