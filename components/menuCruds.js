import React from "react";
import { StyleSheet, View, Button, Text } from "react-native";

export default function MenuPrincipal({navigation}){

    return(
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>CRUD de Productos</Text>
                <Text style={styles.subtitle}>De click a la opcion que desea realizar</Text>
            </View>
            <View style={styles.buttonContainer}>
                <View style={styles.buttons}>
                    <Button title="Productos" onPress={() => navigation.navigate('ProductosStack')} />
                </View>
                <View style={styles.buttons}>
                    <Button title="Recetas" onPress={() => navigation.navigate('RecetasStack')}/>
                </View>
                <View style={styles.buttons}>
                    <Button title="Proveedores" onPress={() => navigation.navigate('ProveedoresStack')}/>
                </View>
                <View style={styles.buttons}>
                    <Button title="Puestos" onPress={() => navigation.navigate('PuestosStack')}/>
                </View>
                <View style={styles.buttons}>
                    <Button title="Ingredientes" onPress={() => navigation.navigate('IngredientesStack')}/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    titleContainer:{
        padding: 25,
        alignItems: "stretch",
        justifyContent: "flex-start"
    },
    title:{
        color: "#E4DBD9",
        fontSize: 36,
        textAlign: "center"
    },
    subtitle:{
        color: "#E4DBD9",
        fontSize: 18,
        textAlign: "center"
    },
    buttonContainer:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    buttons:{
        margin: 10
    }
})