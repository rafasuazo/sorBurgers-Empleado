import React from "react";
import { StyleSheet, View, Text, TextInput, Button, Alert} from "react-native";

export default function Ingredientes({navigation}){
    const terms = "Al usar SorBurgers-app acepta nuestros términos y condiciones."; 

    return(
        <View style={styles.container}>
            <View style={styles.contendoringredientes}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>CRUD de Ingredientes</Text>
                    <Text style={styles.subtitle}>De click a la opcion que desea realizar</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <View style={styles.buttons}>
                        <Button title="Listar Ingredientes" onPress={() => navigation.navigate('IngredientesListar')}/>
                    </View>
                    <View style={styles.buttons}>
                        <Button title="Guardar Ingredientes" onPress={() => navigation.navigate('IngredientesGuardar')}/>
                    </View>
                </View>
                    <View style={styles.terms}>
                            <Text style={{color: "#E4D8D9", textAlign: "center", padding: 80}}>{terms}</Text>
                    </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#111B1E",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    contendoringredientes: {
        backgroundColor: '#111B1E',
        justifyContent: 'flex-start',
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "15%"
    },
    buttonContainer:{
        padding: 95,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    buttons:{
        margin: 10
    },
    titleContainer:{
        marginTop: 1,
        padding: 25,
        alignItems: "stretch",
        justifyContent: "center",
        height:150
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
    }
})