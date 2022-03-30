import React from "react";
import { StyleSheet, View, Button } from "react-native";

export default function MenuPrincipal({navigation}){

    return(
        <View style={styles.container}>
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
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonContainer:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    buttons:{
        margin: 10
    }
})