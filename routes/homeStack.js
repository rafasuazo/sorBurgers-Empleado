import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Inicio from "../components/paginaInicio";
import Header from "../shared/header";
import PerfilStack from "./perfilStack";

const Stack = createBottomTabNavigator();

export default function Navigation(){

    return(
        <Stack.Navigator screenOptions={({ route }) => ({
            tabBarIcon: () => {

                const icons = {
                    Inicio: 'home',
                    Cuenta: 'account'
                };

                return(
                    <MaterialCommunityIcons

                    name={icons[route.name]}
                    color={"#111B1E"}
                    size={28}
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

            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: "#E4DBD9"
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
        </Stack.Navigator>
    )
}